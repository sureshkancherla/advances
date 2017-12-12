package com.getinsured.web.rest;

import com.getinsured.AdvancesApp;

import com.getinsured.domain.Rule_Payment_Agent;
import com.getinsured.repository.Rule_Payment_AgentRepository;
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
 * Test class for the Rule_Payment_AgentResource REST controller.
 *
 * @see Rule_Payment_AgentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvancesApp.class)
public class Rule_Payment_AgentResourceIntTest {

    private static final String DEFAULT_AGENT_COMMISION_RULE = "AAAAAAAAAA";
    private static final String UPDATED_AGENT_COMMISION_RULE = "BBBBBBBBBB";

    private static final String DEFAULT_AGENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_AGENT_ID = "BBBBBBBBBB";

    @Autowired
    private Rule_Payment_AgentRepository rule_Payment_AgentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRule_Payment_AgentMockMvc;

    private Rule_Payment_Agent rule_Payment_Agent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Rule_Payment_AgentResource rule_Payment_AgentResource = new Rule_Payment_AgentResource(rule_Payment_AgentRepository);
        this.restRule_Payment_AgentMockMvc = MockMvcBuilders.standaloneSetup(rule_Payment_AgentResource)
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
    public static Rule_Payment_Agent createEntity(EntityManager em) {
        Rule_Payment_Agent rule_Payment_Agent = new Rule_Payment_Agent()
            .agentCommisionRule(DEFAULT_AGENT_COMMISION_RULE)
            .agentId(DEFAULT_AGENT_ID);
        return rule_Payment_Agent;
    }

    @Before
    public void initTest() {
        rule_Payment_Agent = createEntity(em);
    }

    @Test
    @Transactional
    public void createRule_Payment_Agent() throws Exception {
        int databaseSizeBeforeCreate = rule_Payment_AgentRepository.findAll().size();

        // Create the Rule_Payment_Agent
        restRule_Payment_AgentMockMvc.perform(post("/api/rule-payment-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule_Payment_Agent)))
            .andExpect(status().isCreated());

        // Validate the Rule_Payment_Agent in the database
        List<Rule_Payment_Agent> rule_Payment_AgentList = rule_Payment_AgentRepository.findAll();
        assertThat(rule_Payment_AgentList).hasSize(databaseSizeBeforeCreate + 1);
        Rule_Payment_Agent testRule_Payment_Agent = rule_Payment_AgentList.get(rule_Payment_AgentList.size() - 1);
        assertThat(testRule_Payment_Agent.getAgentCommisionRule()).isEqualTo(DEFAULT_AGENT_COMMISION_RULE);
        assertThat(testRule_Payment_Agent.getAgentId()).isEqualTo(DEFAULT_AGENT_ID);
    }

    @Test
    @Transactional
    public void createRule_Payment_AgentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rule_Payment_AgentRepository.findAll().size();

        // Create the Rule_Payment_Agent with an existing ID
        rule_Payment_Agent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRule_Payment_AgentMockMvc.perform(post("/api/rule-payment-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule_Payment_Agent)))
            .andExpect(status().isBadRequest());

        // Validate the Rule_Payment_Agent in the database
        List<Rule_Payment_Agent> rule_Payment_AgentList = rule_Payment_AgentRepository.findAll();
        assertThat(rule_Payment_AgentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAgentCommisionRuleIsRequired() throws Exception {
        int databaseSizeBeforeTest = rule_Payment_AgentRepository.findAll().size();
        // set the field null
        rule_Payment_Agent.setAgentCommisionRule(null);

        // Create the Rule_Payment_Agent, which fails.

        restRule_Payment_AgentMockMvc.perform(post("/api/rule-payment-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule_Payment_Agent)))
            .andExpect(status().isBadRequest());

        List<Rule_Payment_Agent> rule_Payment_AgentList = rule_Payment_AgentRepository.findAll();
        assertThat(rule_Payment_AgentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAgentIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = rule_Payment_AgentRepository.findAll().size();
        // set the field null
        rule_Payment_Agent.setAgentId(null);

        // Create the Rule_Payment_Agent, which fails.

        restRule_Payment_AgentMockMvc.perform(post("/api/rule-payment-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule_Payment_Agent)))
            .andExpect(status().isBadRequest());

        List<Rule_Payment_Agent> rule_Payment_AgentList = rule_Payment_AgentRepository.findAll();
        assertThat(rule_Payment_AgentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRule_Payment_Agents() throws Exception {
        // Initialize the database
        rule_Payment_AgentRepository.saveAndFlush(rule_Payment_Agent);

        // Get all the rule_Payment_AgentList
        restRule_Payment_AgentMockMvc.perform(get("/api/rule-payment-agents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rule_Payment_Agent.getId().intValue())))
            .andExpect(jsonPath("$.[*].agentCommisionRule").value(hasItem(DEFAULT_AGENT_COMMISION_RULE.toString())))
            .andExpect(jsonPath("$.[*].agentId").value(hasItem(DEFAULT_AGENT_ID.toString())));
    }

    @Test
    @Transactional
    public void getRule_Payment_Agent() throws Exception {
        // Initialize the database
        rule_Payment_AgentRepository.saveAndFlush(rule_Payment_Agent);

        // Get the rule_Payment_Agent
        restRule_Payment_AgentMockMvc.perform(get("/api/rule-payment-agents/{id}", rule_Payment_Agent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rule_Payment_Agent.getId().intValue()))
            .andExpect(jsonPath("$.agentCommisionRule").value(DEFAULT_AGENT_COMMISION_RULE.toString()))
            .andExpect(jsonPath("$.agentId").value(DEFAULT_AGENT_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRule_Payment_Agent() throws Exception {
        // Get the rule_Payment_Agent
        restRule_Payment_AgentMockMvc.perform(get("/api/rule-payment-agents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRule_Payment_Agent() throws Exception {
        // Initialize the database
        rule_Payment_AgentRepository.saveAndFlush(rule_Payment_Agent);
        int databaseSizeBeforeUpdate = rule_Payment_AgentRepository.findAll().size();

        // Update the rule_Payment_Agent
        Rule_Payment_Agent updatedRule_Payment_Agent = rule_Payment_AgentRepository.findOne(rule_Payment_Agent.getId());
        // Disconnect from session so that the updates on updatedRule_Payment_Agent are not directly saved in db
        em.detach(updatedRule_Payment_Agent);
        updatedRule_Payment_Agent
            .agentCommisionRule(UPDATED_AGENT_COMMISION_RULE)
            .agentId(UPDATED_AGENT_ID);

        restRule_Payment_AgentMockMvc.perform(put("/api/rule-payment-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRule_Payment_Agent)))
            .andExpect(status().isOk());

        // Validate the Rule_Payment_Agent in the database
        List<Rule_Payment_Agent> rule_Payment_AgentList = rule_Payment_AgentRepository.findAll();
        assertThat(rule_Payment_AgentList).hasSize(databaseSizeBeforeUpdate);
        Rule_Payment_Agent testRule_Payment_Agent = rule_Payment_AgentList.get(rule_Payment_AgentList.size() - 1);
        assertThat(testRule_Payment_Agent.getAgentCommisionRule()).isEqualTo(UPDATED_AGENT_COMMISION_RULE);
        assertThat(testRule_Payment_Agent.getAgentId()).isEqualTo(UPDATED_AGENT_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingRule_Payment_Agent() throws Exception {
        int databaseSizeBeforeUpdate = rule_Payment_AgentRepository.findAll().size();

        // Create the Rule_Payment_Agent

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRule_Payment_AgentMockMvc.perform(put("/api/rule-payment-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule_Payment_Agent)))
            .andExpect(status().isCreated());

        // Validate the Rule_Payment_Agent in the database
        List<Rule_Payment_Agent> rule_Payment_AgentList = rule_Payment_AgentRepository.findAll();
        assertThat(rule_Payment_AgentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRule_Payment_Agent() throws Exception {
        // Initialize the database
        rule_Payment_AgentRepository.saveAndFlush(rule_Payment_Agent);
        int databaseSizeBeforeDelete = rule_Payment_AgentRepository.findAll().size();

        // Get the rule_Payment_Agent
        restRule_Payment_AgentMockMvc.perform(delete("/api/rule-payment-agents/{id}", rule_Payment_Agent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Rule_Payment_Agent> rule_Payment_AgentList = rule_Payment_AgentRepository.findAll();
        assertThat(rule_Payment_AgentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rule_Payment_Agent.class);
        Rule_Payment_Agent rule_Payment_Agent1 = new Rule_Payment_Agent();
        rule_Payment_Agent1.setId(1L);
        Rule_Payment_Agent rule_Payment_Agent2 = new Rule_Payment_Agent();
        rule_Payment_Agent2.setId(rule_Payment_Agent1.getId());
        assertThat(rule_Payment_Agent1).isEqualTo(rule_Payment_Agent2);
        rule_Payment_Agent2.setId(2L);
        assertThat(rule_Payment_Agent1).isNotEqualTo(rule_Payment_Agent2);
        rule_Payment_Agent1.setId(null);
        assertThat(rule_Payment_Agent1).isNotEqualTo(rule_Payment_Agent2);
    }
}
