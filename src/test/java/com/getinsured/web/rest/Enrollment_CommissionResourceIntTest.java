package com.getinsured.web.rest;

import com.getinsured.AdvancesApp;

import com.getinsured.domain.Enrollment_Commission;
import com.getinsured.repository.Enrollment_CommissionRepository;
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
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.getinsured.web.rest.TestUtil.sameInstant;
import static com.getinsured.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Enrollment_CommissionResource REST controller.
 *
 * @see Enrollment_CommissionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AdvancesApp.class)
public class Enrollment_CommissionResourceIntTest {

    private static final BigDecimal DEFAULT_COMMISSION_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_COMMISSION_AMOUNT = new BigDecimal(2);

    private static final String DEFAULT_ENROLLMET_ID = "AAAAAAAAAA";
    private static final String UPDATED_ENROLLMET_ID = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_STATEMENT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_STATEMENT_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private Enrollment_CommissionRepository enrollment_CommissionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEnrollment_CommissionMockMvc;

    private Enrollment_Commission enrollment_Commission;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Enrollment_CommissionResource enrollment_CommissionResource = new Enrollment_CommissionResource(enrollment_CommissionRepository);
        this.restEnrollment_CommissionMockMvc = MockMvcBuilders.standaloneSetup(enrollment_CommissionResource)
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
    public static Enrollment_Commission createEntity(EntityManager em) {
        Enrollment_Commission enrollment_Commission = new Enrollment_Commission()
            .commissionAmount(DEFAULT_COMMISSION_AMOUNT)
            .enrollmetId(DEFAULT_ENROLLMET_ID)
            .statementDate(DEFAULT_STATEMENT_DATE);
        return enrollment_Commission;
    }

    @Before
    public void initTest() {
        enrollment_Commission = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnrollment_Commission() throws Exception {
        int databaseSizeBeforeCreate = enrollment_CommissionRepository.findAll().size();

        // Create the Enrollment_Commission
        restEnrollment_CommissionMockMvc.perform(post("/api/enrollment-commissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment_Commission)))
            .andExpect(status().isCreated());

        // Validate the Enrollment_Commission in the database
        List<Enrollment_Commission> enrollment_CommissionList = enrollment_CommissionRepository.findAll();
        assertThat(enrollment_CommissionList).hasSize(databaseSizeBeforeCreate + 1);
        Enrollment_Commission testEnrollment_Commission = enrollment_CommissionList.get(enrollment_CommissionList.size() - 1);
        assertThat(testEnrollment_Commission.getCommissionAmount()).isEqualTo(DEFAULT_COMMISSION_AMOUNT);
        assertThat(testEnrollment_Commission.getEnrollmetId()).isEqualTo(DEFAULT_ENROLLMET_ID);
        assertThat(testEnrollment_Commission.getStatementDate()).isEqualTo(DEFAULT_STATEMENT_DATE);
    }

    @Test
    @Transactional
    public void createEnrollment_CommissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enrollment_CommissionRepository.findAll().size();

        // Create the Enrollment_Commission with an existing ID
        enrollment_Commission.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnrollment_CommissionMockMvc.perform(post("/api/enrollment-commissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment_Commission)))
            .andExpect(status().isBadRequest());

        // Validate the Enrollment_Commission in the database
        List<Enrollment_Commission> enrollment_CommissionList = enrollment_CommissionRepository.findAll();
        assertThat(enrollment_CommissionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEnrollmetIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = enrollment_CommissionRepository.findAll().size();
        // set the field null
        enrollment_Commission.setEnrollmetId(null);

        // Create the Enrollment_Commission, which fails.

        restEnrollment_CommissionMockMvc.perform(post("/api/enrollment-commissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment_Commission)))
            .andExpect(status().isBadRequest());

        List<Enrollment_Commission> enrollment_CommissionList = enrollment_CommissionRepository.findAll();
        assertThat(enrollment_CommissionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatementDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = enrollment_CommissionRepository.findAll().size();
        // set the field null
        enrollment_Commission.setStatementDate(null);

        // Create the Enrollment_Commission, which fails.

        restEnrollment_CommissionMockMvc.perform(post("/api/enrollment-commissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment_Commission)))
            .andExpect(status().isBadRequest());

        List<Enrollment_Commission> enrollment_CommissionList = enrollment_CommissionRepository.findAll();
        assertThat(enrollment_CommissionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEnrollment_Commissions() throws Exception {
        // Initialize the database
        enrollment_CommissionRepository.saveAndFlush(enrollment_Commission);

        // Get all the enrollment_CommissionList
        restEnrollment_CommissionMockMvc.perform(get("/api/enrollment-commissions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enrollment_Commission.getId().intValue())))
            .andExpect(jsonPath("$.[*].commissionAmount").value(hasItem(DEFAULT_COMMISSION_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].enrollmetId").value(hasItem(DEFAULT_ENROLLMET_ID.toString())))
            .andExpect(jsonPath("$.[*].statementDate").value(hasItem(sameInstant(DEFAULT_STATEMENT_DATE))));
    }

    @Test
    @Transactional
    public void getEnrollment_Commission() throws Exception {
        // Initialize the database
        enrollment_CommissionRepository.saveAndFlush(enrollment_Commission);

        // Get the enrollment_Commission
        restEnrollment_CommissionMockMvc.perform(get("/api/enrollment-commissions/{id}", enrollment_Commission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enrollment_Commission.getId().intValue()))
            .andExpect(jsonPath("$.commissionAmount").value(DEFAULT_COMMISSION_AMOUNT.intValue()))
            .andExpect(jsonPath("$.enrollmetId").value(DEFAULT_ENROLLMET_ID.toString()))
            .andExpect(jsonPath("$.statementDate").value(sameInstant(DEFAULT_STATEMENT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingEnrollment_Commission() throws Exception {
        // Get the enrollment_Commission
        restEnrollment_CommissionMockMvc.perform(get("/api/enrollment-commissions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnrollment_Commission() throws Exception {
        // Initialize the database
        enrollment_CommissionRepository.saveAndFlush(enrollment_Commission);
        int databaseSizeBeforeUpdate = enrollment_CommissionRepository.findAll().size();

        // Update the enrollment_Commission
        Enrollment_Commission updatedEnrollment_Commission = enrollment_CommissionRepository.findOne(enrollment_Commission.getId());
        // Disconnect from session so that the updates on updatedEnrollment_Commission are not directly saved in db
        em.detach(updatedEnrollment_Commission);
        updatedEnrollment_Commission
            .commissionAmount(UPDATED_COMMISSION_AMOUNT)
            .enrollmetId(UPDATED_ENROLLMET_ID)
            .statementDate(UPDATED_STATEMENT_DATE);

        restEnrollment_CommissionMockMvc.perform(put("/api/enrollment-commissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnrollment_Commission)))
            .andExpect(status().isOk());

        // Validate the Enrollment_Commission in the database
        List<Enrollment_Commission> enrollment_CommissionList = enrollment_CommissionRepository.findAll();
        assertThat(enrollment_CommissionList).hasSize(databaseSizeBeforeUpdate);
        Enrollment_Commission testEnrollment_Commission = enrollment_CommissionList.get(enrollment_CommissionList.size() - 1);
        assertThat(testEnrollment_Commission.getCommissionAmount()).isEqualTo(UPDATED_COMMISSION_AMOUNT);
        assertThat(testEnrollment_Commission.getEnrollmetId()).isEqualTo(UPDATED_ENROLLMET_ID);
        assertThat(testEnrollment_Commission.getStatementDate()).isEqualTo(UPDATED_STATEMENT_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingEnrollment_Commission() throws Exception {
        int databaseSizeBeforeUpdate = enrollment_CommissionRepository.findAll().size();

        // Create the Enrollment_Commission

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEnrollment_CommissionMockMvc.perform(put("/api/enrollment-commissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment_Commission)))
            .andExpect(status().isCreated());

        // Validate the Enrollment_Commission in the database
        List<Enrollment_Commission> enrollment_CommissionList = enrollment_CommissionRepository.findAll();
        assertThat(enrollment_CommissionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEnrollment_Commission() throws Exception {
        // Initialize the database
        enrollment_CommissionRepository.saveAndFlush(enrollment_Commission);
        int databaseSizeBeforeDelete = enrollment_CommissionRepository.findAll().size();

        // Get the enrollment_Commission
        restEnrollment_CommissionMockMvc.perform(delete("/api/enrollment-commissions/{id}", enrollment_Commission.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Enrollment_Commission> enrollment_CommissionList = enrollment_CommissionRepository.findAll();
        assertThat(enrollment_CommissionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enrollment_Commission.class);
        Enrollment_Commission enrollment_Commission1 = new Enrollment_Commission();
        enrollment_Commission1.setId(1L);
        Enrollment_Commission enrollment_Commission2 = new Enrollment_Commission();
        enrollment_Commission2.setId(enrollment_Commission1.getId());
        assertThat(enrollment_Commission1).isEqualTo(enrollment_Commission2);
        enrollment_Commission2.setId(2L);
        assertThat(enrollment_Commission1).isNotEqualTo(enrollment_Commission2);
        enrollment_Commission1.setId(null);
        assertThat(enrollment_Commission1).isNotEqualTo(enrollment_Commission2);
    }
}
