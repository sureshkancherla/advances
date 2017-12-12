package com.getinsured.web.rest;

import com.getinsured.AdvancesApp;

import com.getinsured.domain.Enrollment_Payment_MetaData;
import com.getinsured.repository.Enrollment_Payment_MetaDataRepository;
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

import javax.persistence.EntityManager;
import java.util.List;

import static com.getinsured.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Enrollment_Payment_MetaDataResource REST controller.
 *
 * @see Enrollment_Payment_MetaDataResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvancesApp.class)
public class Enrollment_Payment_MetaDataResourceIntTest {

    private static final String DEFAULT_ENROLLMENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_ENROLLMENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_AGENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_AGENT_ID = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ADVANCABLE = false;
    private static final Boolean UPDATED_IS_ADVANCABLE = true;

    private static final String DEFAULT_CARRIER_COMMISSION_RULE_ID = "AAAAAAAAAA";
    private static final String UPDATED_CARRIER_COMMISSION_RULE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_AGENT_COMMISION_RULE_ID = "AAAAAAAAAA";
    private static final String UPDATED_AGENT_COMMISION_RULE_ID = "BBBBBBBBBB";

    @Autowired
    private Enrollment_Payment_MetaDataRepository enrollment_Payment_MetaDataRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEnrollment_Payment_MetaDataMockMvc;

    private Enrollment_Payment_MetaData enrollment_Payment_MetaData;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Enrollment_Payment_MetaDataResource enrollment_Payment_MetaDataResource = new Enrollment_Payment_MetaDataResource(enrollment_Payment_MetaDataRepository);
        this.restEnrollment_Payment_MetaDataMockMvc = MockMvcBuilders.standaloneSetup(enrollment_Payment_MetaDataResource)
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
    public static Enrollment_Payment_MetaData createEntity(EntityManager em) {
        Enrollment_Payment_MetaData enrollment_Payment_MetaData = new Enrollment_Payment_MetaData()
            .enrollmentId(DEFAULT_ENROLLMENT_ID)
            .agentId(DEFAULT_AGENT_ID)
            .isAdvancable(DEFAULT_IS_ADVANCABLE)
            .carrierCommissionRuleId(DEFAULT_CARRIER_COMMISSION_RULE_ID)
            .agentCommisionRuleId(DEFAULT_AGENT_COMMISION_RULE_ID);
        return enrollment_Payment_MetaData;
    }

    @Before
    public void initTest() {
        enrollment_Payment_MetaData = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnrollment_Payment_MetaData() throws Exception {
        int databaseSizeBeforeCreate = enrollment_Payment_MetaDataRepository.findAll().size();

        // Create the Enrollment_Payment_MetaData
        restEnrollment_Payment_MetaDataMockMvc.perform(post("/api/enrollment-payment-meta-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment_Payment_MetaData)))
            .andExpect(status().isCreated());

        // Validate the Enrollment_Payment_MetaData in the database
        List<Enrollment_Payment_MetaData> enrollment_Payment_MetaDataList = enrollment_Payment_MetaDataRepository.findAll();
        assertThat(enrollment_Payment_MetaDataList).hasSize(databaseSizeBeforeCreate + 1);
        Enrollment_Payment_MetaData testEnrollment_Payment_MetaData = enrollment_Payment_MetaDataList.get(enrollment_Payment_MetaDataList.size() - 1);
        assertThat(testEnrollment_Payment_MetaData.getEnrollmentId()).isEqualTo(DEFAULT_ENROLLMENT_ID);
        assertThat(testEnrollment_Payment_MetaData.getAgentId()).isEqualTo(DEFAULT_AGENT_ID);
        assertThat(testEnrollment_Payment_MetaData.isIsAdvancable()).isEqualTo(DEFAULT_IS_ADVANCABLE);
        assertThat(testEnrollment_Payment_MetaData.getCarrierCommissionRuleId()).isEqualTo(DEFAULT_CARRIER_COMMISSION_RULE_ID);
        assertThat(testEnrollment_Payment_MetaData.getAgentCommisionRuleId()).isEqualTo(DEFAULT_AGENT_COMMISION_RULE_ID);
    }

    @Test
    @Transactional
    public void createEnrollment_Payment_MetaDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enrollment_Payment_MetaDataRepository.findAll().size();

        // Create the Enrollment_Payment_MetaData with an existing ID
        enrollment_Payment_MetaData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnrollment_Payment_MetaDataMockMvc.perform(post("/api/enrollment-payment-meta-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment_Payment_MetaData)))
            .andExpect(status().isBadRequest());

        // Validate the Enrollment_Payment_MetaData in the database
        List<Enrollment_Payment_MetaData> enrollment_Payment_MetaDataList = enrollment_Payment_MetaDataRepository.findAll();
        assertThat(enrollment_Payment_MetaDataList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEnrollmentIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = enrollment_Payment_MetaDataRepository.findAll().size();
        // set the field null
        enrollment_Payment_MetaData.setEnrollmentId(null);

        // Create the Enrollment_Payment_MetaData, which fails.

        restEnrollment_Payment_MetaDataMockMvc.perform(post("/api/enrollment-payment-meta-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment_Payment_MetaData)))
            .andExpect(status().isBadRequest());

        List<Enrollment_Payment_MetaData> enrollment_Payment_MetaDataList = enrollment_Payment_MetaDataRepository.findAll();
        assertThat(enrollment_Payment_MetaDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEnrollment_Payment_MetaData() throws Exception {
        // Initialize the database
        enrollment_Payment_MetaDataRepository.saveAndFlush(enrollment_Payment_MetaData);

        // Get all the enrollment_Payment_MetaDataList
        restEnrollment_Payment_MetaDataMockMvc.perform(get("/api/enrollment-payment-meta-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enrollment_Payment_MetaData.getId().intValue())))
            .andExpect(jsonPath("$.[*].enrollmentId").value(hasItem(DEFAULT_ENROLLMENT_ID.toString())))
            .andExpect(jsonPath("$.[*].agentId").value(hasItem(DEFAULT_AGENT_ID.toString())))
            .andExpect(jsonPath("$.[*].isAdvancable").value(hasItem(DEFAULT_IS_ADVANCABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].carrierCommissionRuleId").value(hasItem(DEFAULT_CARRIER_COMMISSION_RULE_ID.toString())))
            .andExpect(jsonPath("$.[*].agentCommisionRuleId").value(hasItem(DEFAULT_AGENT_COMMISION_RULE_ID.toString())));
    }

    @Test
    @Transactional
    public void getEnrollment_Payment_MetaData() throws Exception {
        // Initialize the database
        enrollment_Payment_MetaDataRepository.saveAndFlush(enrollment_Payment_MetaData);

        // Get the enrollment_Payment_MetaData
        restEnrollment_Payment_MetaDataMockMvc.perform(get("/api/enrollment-payment-meta-data/{id}", enrollment_Payment_MetaData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enrollment_Payment_MetaData.getId().intValue()))
            .andExpect(jsonPath("$.enrollmentId").value(DEFAULT_ENROLLMENT_ID.toString()))
            .andExpect(jsonPath("$.agentId").value(DEFAULT_AGENT_ID.toString()))
            .andExpect(jsonPath("$.isAdvancable").value(DEFAULT_IS_ADVANCABLE.booleanValue()))
            .andExpect(jsonPath("$.carrierCommissionRuleId").value(DEFAULT_CARRIER_COMMISSION_RULE_ID.toString()))
            .andExpect(jsonPath("$.agentCommisionRuleId").value(DEFAULT_AGENT_COMMISION_RULE_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEnrollment_Payment_MetaData() throws Exception {
        // Get the enrollment_Payment_MetaData
        restEnrollment_Payment_MetaDataMockMvc.perform(get("/api/enrollment-payment-meta-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnrollment_Payment_MetaData() throws Exception {
        // Initialize the database
        enrollment_Payment_MetaDataRepository.saveAndFlush(enrollment_Payment_MetaData);
        int databaseSizeBeforeUpdate = enrollment_Payment_MetaDataRepository.findAll().size();

        // Update the enrollment_Payment_MetaData
        Enrollment_Payment_MetaData updatedEnrollment_Payment_MetaData = enrollment_Payment_MetaDataRepository.findOne(enrollment_Payment_MetaData.getId());
        // Disconnect from session so that the updates on updatedEnrollment_Payment_MetaData are not directly saved in db
        em.detach(updatedEnrollment_Payment_MetaData);
        updatedEnrollment_Payment_MetaData
            .enrollmentId(UPDATED_ENROLLMENT_ID)
            .agentId(UPDATED_AGENT_ID)
            .isAdvancable(UPDATED_IS_ADVANCABLE)
            .carrierCommissionRuleId(UPDATED_CARRIER_COMMISSION_RULE_ID)
            .agentCommisionRuleId(UPDATED_AGENT_COMMISION_RULE_ID);

        restEnrollment_Payment_MetaDataMockMvc.perform(put("/api/enrollment-payment-meta-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnrollment_Payment_MetaData)))
            .andExpect(status().isOk());

        // Validate the Enrollment_Payment_MetaData in the database
        List<Enrollment_Payment_MetaData> enrollment_Payment_MetaDataList = enrollment_Payment_MetaDataRepository.findAll();
        assertThat(enrollment_Payment_MetaDataList).hasSize(databaseSizeBeforeUpdate);
        Enrollment_Payment_MetaData testEnrollment_Payment_MetaData = enrollment_Payment_MetaDataList.get(enrollment_Payment_MetaDataList.size() - 1);
        assertThat(testEnrollment_Payment_MetaData.getEnrollmentId()).isEqualTo(UPDATED_ENROLLMENT_ID);
        assertThat(testEnrollment_Payment_MetaData.getAgentId()).isEqualTo(UPDATED_AGENT_ID);
        assertThat(testEnrollment_Payment_MetaData.isIsAdvancable()).isEqualTo(UPDATED_IS_ADVANCABLE);
        assertThat(testEnrollment_Payment_MetaData.getCarrierCommissionRuleId()).isEqualTo(UPDATED_CARRIER_COMMISSION_RULE_ID);
        assertThat(testEnrollment_Payment_MetaData.getAgentCommisionRuleId()).isEqualTo(UPDATED_AGENT_COMMISION_RULE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingEnrollment_Payment_MetaData() throws Exception {
        int databaseSizeBeforeUpdate = enrollment_Payment_MetaDataRepository.findAll().size();

        // Create the Enrollment_Payment_MetaData

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEnrollment_Payment_MetaDataMockMvc.perform(put("/api/enrollment-payment-meta-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment_Payment_MetaData)))
            .andExpect(status().isCreated());

        // Validate the Enrollment_Payment_MetaData in the database
        List<Enrollment_Payment_MetaData> enrollment_Payment_MetaDataList = enrollment_Payment_MetaDataRepository.findAll();
        assertThat(enrollment_Payment_MetaDataList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEnrollment_Payment_MetaData() throws Exception {
        // Initialize the database
        enrollment_Payment_MetaDataRepository.saveAndFlush(enrollment_Payment_MetaData);
        int databaseSizeBeforeDelete = enrollment_Payment_MetaDataRepository.findAll().size();

        // Get the enrollment_Payment_MetaData
        restEnrollment_Payment_MetaDataMockMvc.perform(delete("/api/enrollment-payment-meta-data/{id}", enrollment_Payment_MetaData.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Enrollment_Payment_MetaData> enrollment_Payment_MetaDataList = enrollment_Payment_MetaDataRepository.findAll();
        assertThat(enrollment_Payment_MetaDataList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enrollment_Payment_MetaData.class);
        Enrollment_Payment_MetaData enrollment_Payment_MetaData1 = new Enrollment_Payment_MetaData();
        enrollment_Payment_MetaData1.setId(1L);
        Enrollment_Payment_MetaData enrollment_Payment_MetaData2 = new Enrollment_Payment_MetaData();
        enrollment_Payment_MetaData2.setId(enrollment_Payment_MetaData1.getId());
        assertThat(enrollment_Payment_MetaData1).isEqualTo(enrollment_Payment_MetaData2);
        enrollment_Payment_MetaData2.setId(2L);
        assertThat(enrollment_Payment_MetaData1).isNotEqualTo(enrollment_Payment_MetaData2);
        enrollment_Payment_MetaData1.setId(null);
        assertThat(enrollment_Payment_MetaData1).isNotEqualTo(enrollment_Payment_MetaData2);
    }
}
