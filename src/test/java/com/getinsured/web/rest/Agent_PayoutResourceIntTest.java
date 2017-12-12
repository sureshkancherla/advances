package com.getinsured.web.rest;

import com.getinsured.AdvancesApp;

import com.getinsured.domain.Agent_Payout;
import com.getinsured.repository.Agent_PayoutRepository;
import com.getinsured.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static com.getinsured.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Agent_PayoutResource REST controller.
 *
 * @see Agent_PayoutResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvancesApp.class)
public class Agent_PayoutResourceIntTest {

    private static final String DEFAULT_AGENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_AGENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_PAYMENT_TYPE_ID = "AAAAAAAAAA";
    private static final String UPDATED_PAYMENT_TYPE_ID = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PAYMENT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_PAYMENT_AMOUNT = new BigDecimal(2);

    private static final String DEFAULT_ENROLLMENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_ENROLLMENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_PAYOUT_RULE = "AAAAAAAAAA";
    private static final String UPDATED_PAYOUT_RULE = "BBBBBBBBBB";

    @Autowired
    private Agent_PayoutRepository agent_PayoutRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAgent_PayoutMockMvc;

    private Agent_Payout agent_Payout;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Agent_PayoutResource agent_PayoutResource = new Agent_PayoutResource(agent_PayoutRepository);
        this.restAgent_PayoutMockMvc = MockMvcBuilders.standaloneSetup(agent_PayoutResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Agent_Payout createEntity(EntityManager em) {
        Agent_Payout agent_Payout = new Agent_Payout()
            .agentId(DEFAULT_AGENT_ID)
            .paymentTypeId(DEFAULT_PAYMENT_TYPE_ID)
            .paymentAmount(DEFAULT_PAYMENT_AMOUNT)
            .enrollmentId(DEFAULT_ENROLLMENT_ID)
            .payoutRule(DEFAULT_PAYOUT_RULE);
        return agent_Payout;
    }

    @Before
    public void initTest() {
        agent_Payout = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgent_Payout() throws Exception {
        int databaseSizeBeforeCreate = agent_PayoutRepository.findAll().size();

        // Create the Agent_Payout
        restAgent_PayoutMockMvc.perform(post("/api/agent-payouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent_Payout)))
            .andExpect(status().isCreated());

        // Validate the Agent_Payout in the database
        List<Agent_Payout> agent_PayoutList = agent_PayoutRepository.findAll();
        assertThat(agent_PayoutList).hasSize(databaseSizeBeforeCreate + 1);
        Agent_Payout testAgent_Payout = agent_PayoutList.get(agent_PayoutList.size() - 1);
        assertThat(testAgent_Payout.getAgentId()).isEqualTo(DEFAULT_AGENT_ID);
        assertThat(testAgent_Payout.getPaymentTypeId()).isEqualTo(DEFAULT_PAYMENT_TYPE_ID);
        assertThat(testAgent_Payout.getPaymentAmount()).isEqualTo(DEFAULT_PAYMENT_AMOUNT);
        assertThat(testAgent_Payout.getEnrollmentId()).isEqualTo(DEFAULT_ENROLLMENT_ID);
        assertThat(testAgent_Payout.getPayoutRule()).isEqualTo(DEFAULT_PAYOUT_RULE);
    }

    @Test
    @Transactional
    public void createAgent_PayoutWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agent_PayoutRepository.findAll().size();

        // Create the Agent_Payout with an existing ID
        agent_Payout.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgent_PayoutMockMvc.perform(post("/api/agent-payouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent_Payout)))
            .andExpect(status().isBadRequest());

        // Validate the Agent_Payout in the database
        List<Agent_Payout> agent_PayoutList = agent_PayoutRepository.findAll();
        assertThat(agent_PayoutList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAgentIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = agent_PayoutRepository.findAll().size();
        // set the field null
        agent_Payout.setAgentId(null);

        // Create the Agent_Payout, which fails.

        restAgent_PayoutMockMvc.perform(post("/api/agent-payouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent_Payout)))
            .andExpect(status().isBadRequest());

        List<Agent_Payout> agent_PayoutList = agent_PayoutRepository.findAll();
        assertThat(agent_PayoutList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPaymentTypeIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = agent_PayoutRepository.findAll().size();
        // set the field null
        agent_Payout.setPaymentTypeId(null);

        // Create the Agent_Payout, which fails.

        restAgent_PayoutMockMvc.perform(post("/api/agent-payouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent_Payout)))
            .andExpect(status().isBadRequest());

        List<Agent_Payout> agent_PayoutList = agent_PayoutRepository.findAll();
        assertThat(agent_PayoutList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPaymentAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = agent_PayoutRepository.findAll().size();
        // set the field null
        agent_Payout.setPaymentAmount(null);

        // Create the Agent_Payout, which fails.

        restAgent_PayoutMockMvc.perform(post("/api/agent-payouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent_Payout)))
            .andExpect(status().isBadRequest());

        List<Agent_Payout> agent_PayoutList = agent_PayoutRepository.findAll();
        assertThat(agent_PayoutList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEnrollmentIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = agent_PayoutRepository.findAll().size();
        // set the field null
        agent_Payout.setEnrollmentId(null);

        // Create the Agent_Payout, which fails.

        restAgent_PayoutMockMvc.perform(post("/api/agent-payouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent_Payout)))
            .andExpect(status().isBadRequest());

        List<Agent_Payout> agent_PayoutList = agent_PayoutRepository.findAll();
        assertThat(agent_PayoutList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPayoutRuleIsRequired() throws Exception {
        int databaseSizeBeforeTest = agent_PayoutRepository.findAll().size();
        // set the field null
        agent_Payout.setPayoutRule(null);

        // Create the Agent_Payout, which fails.

        restAgent_PayoutMockMvc.perform(post("/api/agent-payouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent_Payout)))
            .andExpect(status().isBadRequest());

        List<Agent_Payout> agent_PayoutList = agent_PayoutRepository.findAll();
        assertThat(agent_PayoutList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAgent_Payouts() throws Exception {
        // Initialize the database
        agent_PayoutRepository.saveAndFlush(agent_Payout);

        // Get all the agent_PayoutList
        restAgent_PayoutMockMvc.perform(get("/api/agent-payouts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agent_Payout.getId().intValue())))
            .andExpect(jsonPath("$.[*].agentId").value(hasItem(DEFAULT_AGENT_ID.toString())))
            .andExpect(jsonPath("$.[*].paymentTypeId").value(hasItem(DEFAULT_PAYMENT_TYPE_ID.toString())))
            .andExpect(jsonPath("$.[*].paymentAmount").value(hasItem(DEFAULT_PAYMENT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].enrollmentId").value(hasItem(DEFAULT_ENROLLMENT_ID.toString())))
            .andExpect(jsonPath("$.[*].payoutRule").value(hasItem(DEFAULT_PAYOUT_RULE.toString())));
    }

    @Test
    @Transactional
    public void getAgent_Payout() throws Exception {
        // Initialize the database
        agent_PayoutRepository.saveAndFlush(agent_Payout);

        // Get the agent_Payout
        restAgent_PayoutMockMvc.perform(get("/api/agent-payouts/{id}", agent_Payout.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agent_Payout.getId().intValue()))
            .andExpect(jsonPath("$.agentId").value(DEFAULT_AGENT_ID.toString()))
            .andExpect(jsonPath("$.paymentTypeId").value(DEFAULT_PAYMENT_TYPE_ID.toString()))
            .andExpect(jsonPath("$.paymentAmount").value(DEFAULT_PAYMENT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.enrollmentId").value(DEFAULT_ENROLLMENT_ID.toString()))
            .andExpect(jsonPath("$.payoutRule").value(DEFAULT_PAYOUT_RULE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAgent_Payout() throws Exception {
        // Get the agent_Payout
        restAgent_PayoutMockMvc.perform(get("/api/agent-payouts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgent_Payout() throws Exception {
        // Initialize the database
        agent_PayoutRepository.saveAndFlush(agent_Payout);
        int databaseSizeBeforeUpdate = agent_PayoutRepository.findAll().size();

        // Update the agent_Payout
        Agent_Payout updatedAgent_Payout = agent_PayoutRepository.findOne(agent_Payout.getId());
        // Disconnect from session so that the updates on updatedAgent_Payout are not directly saved in db
        em.detach(updatedAgent_Payout);
        updatedAgent_Payout
            .agentId(UPDATED_AGENT_ID)
            .paymentTypeId(UPDATED_PAYMENT_TYPE_ID)
            .paymentAmount(UPDATED_PAYMENT_AMOUNT)
            .enrollmentId(UPDATED_ENROLLMENT_ID)
            .payoutRule(UPDATED_PAYOUT_RULE);

        restAgent_PayoutMockMvc.perform(put("/api/agent-payouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgent_Payout)))
            .andExpect(status().isOk());

        // Validate the Agent_Payout in the database
        List<Agent_Payout> agent_PayoutList = agent_PayoutRepository.findAll();
        assertThat(agent_PayoutList).hasSize(databaseSizeBeforeUpdate);
        Agent_Payout testAgent_Payout = agent_PayoutList.get(agent_PayoutList.size() - 1);
        assertThat(testAgent_Payout.getAgentId()).isEqualTo(UPDATED_AGENT_ID);
        assertThat(testAgent_Payout.getPaymentTypeId()).isEqualTo(UPDATED_PAYMENT_TYPE_ID);
        assertThat(testAgent_Payout.getPaymentAmount()).isEqualTo(UPDATED_PAYMENT_AMOUNT);
        assertThat(testAgent_Payout.getEnrollmentId()).isEqualTo(UPDATED_ENROLLMENT_ID);
        assertThat(testAgent_Payout.getPayoutRule()).isEqualTo(UPDATED_PAYOUT_RULE);
    }

    @Test
    @Transactional
    public void updateNonExistingAgent_Payout() throws Exception {
        int databaseSizeBeforeUpdate = agent_PayoutRepository.findAll().size();

        // Create the Agent_Payout

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAgent_PayoutMockMvc.perform(put("/api/agent-payouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent_Payout)))
            .andExpect(status().isCreated());

        // Validate the Agent_Payout in the database
        List<Agent_Payout> agent_PayoutList = agent_PayoutRepository.findAll();
        assertThat(agent_PayoutList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAgent_Payout() throws Exception {
        // Initialize the database
        agent_PayoutRepository.saveAndFlush(agent_Payout);
        int databaseSizeBeforeDelete = agent_PayoutRepository.findAll().size();

        // Get the agent_Payout
        restAgent_PayoutMockMvc.perform(delete("/api/agent-payouts/{id}", agent_Payout.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Agent_Payout> agent_PayoutList = agent_PayoutRepository.findAll();
        assertThat(agent_PayoutList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Agent_Payout.class);
        Agent_Payout agent_Payout1 = new Agent_Payout();
        agent_Payout1.setId(1L);
        Agent_Payout agent_Payout2 = new Agent_Payout();
        agent_Payout2.setId(agent_Payout1.getId());
        assertThat(agent_Payout1).isEqualTo(agent_Payout2);
        agent_Payout2.setId(2L);
        assertThat(agent_Payout1).isNotEqualTo(agent_Payout2);
        agent_Payout1.setId(null);
        assertThat(agent_Payout1).isNotEqualTo(agent_Payout2);
    }
}
