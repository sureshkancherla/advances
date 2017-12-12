package com.getinsured.web.rest;

import com.getinsured.AdvancesApp;

import com.getinsured.domain.Rule_Payment_Carrier;
import com.getinsured.repository.Rule_Payment_CarrierRepository;
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
import java.util.List;

import static com.getinsured.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Rule_Payment_CarrierResource REST controller.
 *
 * @see Rule_Payment_CarrierResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvancesApp.class)
public class Rule_Payment_CarrierResourceIntTest {

    private static final String DEFAULT_CARRIER_ID = "AAAAAAAAAA";
    private static final String UPDATED_CARRIER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_CARRIER_COMMISION_RULE = "AAAAAAAAAA";
    private static final String UPDATED_CARRIER_COMMISION_RULE = "BBBBBBBBBB";

    private static final String DEFAULT_ADVANCE_RULE = "AAAAAAAAAA";
    private static final String UPDATED_ADVANCE_RULE = "BBBBBBBBBB";

    @Autowired
    private Rule_Payment_CarrierRepository rule_Payment_CarrierRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRule_Payment_CarrierMockMvc;

    private Rule_Payment_Carrier rule_Payment_Carrier;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Rule_Payment_CarrierResource rule_Payment_CarrierResource = new Rule_Payment_CarrierResource(rule_Payment_CarrierRepository);
        this.restRule_Payment_CarrierMockMvc = MockMvcBuilders.standaloneSetup(rule_Payment_CarrierResource)
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
    public static Rule_Payment_Carrier createEntity(EntityManager em) {
        Rule_Payment_Carrier rule_Payment_Carrier = new Rule_Payment_Carrier()
            .carrierId(DEFAULT_CARRIER_ID)
            .carrierCommisionRule(DEFAULT_CARRIER_COMMISION_RULE)
            .advanceRule(DEFAULT_ADVANCE_RULE);
        return rule_Payment_Carrier;
    }

    @Before
    public void initTest() {
        rule_Payment_Carrier = createEntity(em);
    }

    @Test
    @Transactional
    public void createRule_Payment_Carrier() throws Exception {
        int databaseSizeBeforeCreate = rule_Payment_CarrierRepository.findAll().size();

        // Create the Rule_Payment_Carrier
        restRule_Payment_CarrierMockMvc.perform(post("/api/rule-payment-carriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule_Payment_Carrier)))
            .andExpect(status().isCreated());

        // Validate the Rule_Payment_Carrier in the database
        List<Rule_Payment_Carrier> rule_Payment_CarrierList = rule_Payment_CarrierRepository.findAll();
        assertThat(rule_Payment_CarrierList).hasSize(databaseSizeBeforeCreate + 1);
        Rule_Payment_Carrier testRule_Payment_Carrier = rule_Payment_CarrierList.get(rule_Payment_CarrierList.size() - 1);
        assertThat(testRule_Payment_Carrier.getCarrierId()).isEqualTo(DEFAULT_CARRIER_ID);
        assertThat(testRule_Payment_Carrier.getCarrierCommisionRule()).isEqualTo(DEFAULT_CARRIER_COMMISION_RULE);
        assertThat(testRule_Payment_Carrier.getAdvanceRule()).isEqualTo(DEFAULT_ADVANCE_RULE);
    }

    @Test
    @Transactional
    public void createRule_Payment_CarrierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rule_Payment_CarrierRepository.findAll().size();

        // Create the Rule_Payment_Carrier with an existing ID
        rule_Payment_Carrier.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRule_Payment_CarrierMockMvc.perform(post("/api/rule-payment-carriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule_Payment_Carrier)))
            .andExpect(status().isBadRequest());

        // Validate the Rule_Payment_Carrier in the database
        List<Rule_Payment_Carrier> rule_Payment_CarrierList = rule_Payment_CarrierRepository.findAll();
        assertThat(rule_Payment_CarrierList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCarrierIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = rule_Payment_CarrierRepository.findAll().size();
        // set the field null
        rule_Payment_Carrier.setCarrierId(null);

        // Create the Rule_Payment_Carrier, which fails.

        restRule_Payment_CarrierMockMvc.perform(post("/api/rule-payment-carriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule_Payment_Carrier)))
            .andExpect(status().isBadRequest());

        List<Rule_Payment_Carrier> rule_Payment_CarrierList = rule_Payment_CarrierRepository.findAll();
        assertThat(rule_Payment_CarrierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCarrierCommisionRuleIsRequired() throws Exception {
        int databaseSizeBeforeTest = rule_Payment_CarrierRepository.findAll().size();
        // set the field null
        rule_Payment_Carrier.setCarrierCommisionRule(null);

        // Create the Rule_Payment_Carrier, which fails.

        restRule_Payment_CarrierMockMvc.perform(post("/api/rule-payment-carriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule_Payment_Carrier)))
            .andExpect(status().isBadRequest());

        List<Rule_Payment_Carrier> rule_Payment_CarrierList = rule_Payment_CarrierRepository.findAll();
        assertThat(rule_Payment_CarrierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdvanceRuleIsRequired() throws Exception {
        int databaseSizeBeforeTest = rule_Payment_CarrierRepository.findAll().size();
        // set the field null
        rule_Payment_Carrier.setAdvanceRule(null);

        // Create the Rule_Payment_Carrier, which fails.

        restRule_Payment_CarrierMockMvc.perform(post("/api/rule-payment-carriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule_Payment_Carrier)))
            .andExpect(status().isBadRequest());

        List<Rule_Payment_Carrier> rule_Payment_CarrierList = rule_Payment_CarrierRepository.findAll();
        assertThat(rule_Payment_CarrierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRule_Payment_Carriers() throws Exception {
        // Initialize the database
        rule_Payment_CarrierRepository.saveAndFlush(rule_Payment_Carrier);

        // Get all the rule_Payment_CarrierList
        restRule_Payment_CarrierMockMvc.perform(get("/api/rule-payment-carriers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rule_Payment_Carrier.getId().intValue())))
            .andExpect(jsonPath("$.[*].carrierId").value(hasItem(DEFAULT_CARRIER_ID.toString())))
            .andExpect(jsonPath("$.[*].carrierCommisionRule").value(hasItem(DEFAULT_CARRIER_COMMISION_RULE.toString())))
            .andExpect(jsonPath("$.[*].advanceRule").value(hasItem(DEFAULT_ADVANCE_RULE.toString())));
    }

    @Test
    @Transactional
    public void getRule_Payment_Carrier() throws Exception {
        // Initialize the database
        rule_Payment_CarrierRepository.saveAndFlush(rule_Payment_Carrier);

        // Get the rule_Payment_Carrier
        restRule_Payment_CarrierMockMvc.perform(get("/api/rule-payment-carriers/{id}", rule_Payment_Carrier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rule_Payment_Carrier.getId().intValue()))
            .andExpect(jsonPath("$.carrierId").value(DEFAULT_CARRIER_ID.toString()))
            .andExpect(jsonPath("$.carrierCommisionRule").value(DEFAULT_CARRIER_COMMISION_RULE.toString()))
            .andExpect(jsonPath("$.advanceRule").value(DEFAULT_ADVANCE_RULE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRule_Payment_Carrier() throws Exception {
        // Get the rule_Payment_Carrier
        restRule_Payment_CarrierMockMvc.perform(get("/api/rule-payment-carriers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRule_Payment_Carrier() throws Exception {
        // Initialize the database
        rule_Payment_CarrierRepository.saveAndFlush(rule_Payment_Carrier);
        int databaseSizeBeforeUpdate = rule_Payment_CarrierRepository.findAll().size();

        // Update the rule_Payment_Carrier
        Rule_Payment_Carrier updatedRule_Payment_Carrier = rule_Payment_CarrierRepository.findOne(rule_Payment_Carrier.getId());
        // Disconnect from session so that the updates on updatedRule_Payment_Carrier are not directly saved in db
        em.detach(updatedRule_Payment_Carrier);
        updatedRule_Payment_Carrier
            .carrierId(UPDATED_CARRIER_ID)
            .carrierCommisionRule(UPDATED_CARRIER_COMMISION_RULE)
            .advanceRule(UPDATED_ADVANCE_RULE);

        restRule_Payment_CarrierMockMvc.perform(put("/api/rule-payment-carriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRule_Payment_Carrier)))
            .andExpect(status().isOk());

        // Validate the Rule_Payment_Carrier in the database
        List<Rule_Payment_Carrier> rule_Payment_CarrierList = rule_Payment_CarrierRepository.findAll();
        assertThat(rule_Payment_CarrierList).hasSize(databaseSizeBeforeUpdate);
        Rule_Payment_Carrier testRule_Payment_Carrier = rule_Payment_CarrierList.get(rule_Payment_CarrierList.size() - 1);
        assertThat(testRule_Payment_Carrier.getCarrierId()).isEqualTo(UPDATED_CARRIER_ID);
        assertThat(testRule_Payment_Carrier.getCarrierCommisionRule()).isEqualTo(UPDATED_CARRIER_COMMISION_RULE);
        assertThat(testRule_Payment_Carrier.getAdvanceRule()).isEqualTo(UPDATED_ADVANCE_RULE);
    }

    @Test
    @Transactional
    public void updateNonExistingRule_Payment_Carrier() throws Exception {
        int databaseSizeBeforeUpdate = rule_Payment_CarrierRepository.findAll().size();

        // Create the Rule_Payment_Carrier

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRule_Payment_CarrierMockMvc.perform(put("/api/rule-payment-carriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule_Payment_Carrier)))
            .andExpect(status().isCreated());

        // Validate the Rule_Payment_Carrier in the database
        List<Rule_Payment_Carrier> rule_Payment_CarrierList = rule_Payment_CarrierRepository.findAll();
        assertThat(rule_Payment_CarrierList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRule_Payment_Carrier() throws Exception {
        // Initialize the database
        rule_Payment_CarrierRepository.saveAndFlush(rule_Payment_Carrier);
        int databaseSizeBeforeDelete = rule_Payment_CarrierRepository.findAll().size();

        // Get the rule_Payment_Carrier
        restRule_Payment_CarrierMockMvc.perform(delete("/api/rule-payment-carriers/{id}", rule_Payment_Carrier.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Rule_Payment_Carrier> rule_Payment_CarrierList = rule_Payment_CarrierRepository.findAll();
        assertThat(rule_Payment_CarrierList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rule_Payment_Carrier.class);
        Rule_Payment_Carrier rule_Payment_Carrier1 = new Rule_Payment_Carrier();
        rule_Payment_Carrier1.setId(1L);
        Rule_Payment_Carrier rule_Payment_Carrier2 = new Rule_Payment_Carrier();
        rule_Payment_Carrier2.setId(rule_Payment_Carrier1.getId());
        assertThat(rule_Payment_Carrier1).isEqualTo(rule_Payment_Carrier2);
        rule_Payment_Carrier2.setId(2L);
        assertThat(rule_Payment_Carrier1).isNotEqualTo(rule_Payment_Carrier2);
        rule_Payment_Carrier1.setId(null);
        assertThat(rule_Payment_Carrier1).isNotEqualTo(rule_Payment_Carrier2);
    }
}
