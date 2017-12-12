package com.getinsured.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.getinsured.domain.Enrollment_Payment_MetaData;

import com.getinsured.repository.Enrollment_Payment_MetaDataRepository;
import com.getinsured.web.rest.errors.BadRequestAlertException;
import com.getinsured.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Enrollment_Payment_MetaData.
 */
@RestController
@RequestMapping("/api")
public class Enrollment_Payment_MetaDataResource {

    private final Logger log = LoggerFactory.getLogger(Enrollment_Payment_MetaDataResource.class);

    private static final String ENTITY_NAME = "enrollment_Payment_MetaData";

    private final Enrollment_Payment_MetaDataRepository enrollment_Payment_MetaDataRepository;

    public Enrollment_Payment_MetaDataResource(Enrollment_Payment_MetaDataRepository enrollment_Payment_MetaDataRepository) {
        this.enrollment_Payment_MetaDataRepository = enrollment_Payment_MetaDataRepository;
    }

    /**
     * POST  /enrollment-payment-meta-data : Create a new enrollment_Payment_MetaData.
     *
     * @param enrollment_Payment_MetaData the enrollment_Payment_MetaData to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enrollment_Payment_MetaData, or with status 400 (Bad Request) if the enrollment_Payment_MetaData has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/enrollment-payment-meta-data")
    @Timed
    public ResponseEntity<Enrollment_Payment_MetaData> createEnrollment_Payment_MetaData(@Valid @RequestBody Enrollment_Payment_MetaData enrollment_Payment_MetaData) throws URISyntaxException {
        log.debug("REST request to save Enrollment_Payment_MetaData : {}", enrollment_Payment_MetaData);
        if (enrollment_Payment_MetaData.getId() != null) {
            throw new BadRequestAlertException("A new enrollment_Payment_MetaData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Enrollment_Payment_MetaData result = enrollment_Payment_MetaDataRepository.save(enrollment_Payment_MetaData);
        return ResponseEntity.created(new URI("/api/enrollment-payment-meta-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /enrollment-payment-meta-data : Updates an existing enrollment_Payment_MetaData.
     *
     * @param enrollment_Payment_MetaData the enrollment_Payment_MetaData to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enrollment_Payment_MetaData,
     * or with status 400 (Bad Request) if the enrollment_Payment_MetaData is not valid,
     * or with status 500 (Internal Server Error) if the enrollment_Payment_MetaData couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/enrollment-payment-meta-data")
    @Timed
    public ResponseEntity<Enrollment_Payment_MetaData> updateEnrollment_Payment_MetaData(@Valid @RequestBody Enrollment_Payment_MetaData enrollment_Payment_MetaData) throws URISyntaxException {
        log.debug("REST request to update Enrollment_Payment_MetaData : {}", enrollment_Payment_MetaData);
        if (enrollment_Payment_MetaData.getId() == null) {
            return createEnrollment_Payment_MetaData(enrollment_Payment_MetaData);
        }
        Enrollment_Payment_MetaData result = enrollment_Payment_MetaDataRepository.save(enrollment_Payment_MetaData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enrollment_Payment_MetaData.getId().toString()))
            .body(result);
    }

    /**
     * GET  /enrollment-payment-meta-data : get all the enrollment_Payment_MetaData.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of enrollment_Payment_MetaData in body
     */
    @GetMapping("/enrollment-payment-meta-data")
    @Timed
    public List<Enrollment_Payment_MetaData> getAllEnrollment_Payment_MetaData(@RequestParam(required = false) String filter) {
        if ("enrollment-is-null".equals(filter)) {
            log.debug("REST request to get all Enrollment_Payment_MetaDatas where enrollment is null");
            return StreamSupport
                .stream(enrollment_Payment_MetaDataRepository.findAll().spliterator(), false)
                .filter(enrollment_Payment_MetaData -> enrollment_Payment_MetaData.getEnrollment() == null)
                .collect(Collectors.toList());
        }
        if ("agentcommissionrule-is-null".equals(filter)) {
            log.debug("REST request to get all Enrollment_Payment_MetaDatas where agentCommissionRule is null");
            return StreamSupport
                .stream(enrollment_Payment_MetaDataRepository.findAll().spliterator(), false)
                .filter(enrollment_Payment_MetaData -> enrollment_Payment_MetaData.getAgentCommissionRule() == null)
                .collect(Collectors.toList());
        }
        if ("carriercommissionrule-is-null".equals(filter)) {
            log.debug("REST request to get all Enrollment_Payment_MetaDatas where carrierCommissionRule is null");
            return StreamSupport
                .stream(enrollment_Payment_MetaDataRepository.findAll().spliterator(), false)
                .filter(enrollment_Payment_MetaData -> enrollment_Payment_MetaData.getCarrierCommissionRule() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Enrollment_Payment_MetaData");
        return enrollment_Payment_MetaDataRepository.findAll();
        }

    /**
     * GET  /enrollment-payment-meta-data/:id : get the "id" enrollment_Payment_MetaData.
     *
     * @param id the id of the enrollment_Payment_MetaData to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enrollment_Payment_MetaData, or with status 404 (Not Found)
     */
    @GetMapping("/enrollment-payment-meta-data/{id}")
    @Timed
    public ResponseEntity<Enrollment_Payment_MetaData> getEnrollment_Payment_MetaData(@PathVariable Long id) {
        log.debug("REST request to get Enrollment_Payment_MetaData : {}", id);
        Enrollment_Payment_MetaData enrollment_Payment_MetaData = enrollment_Payment_MetaDataRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(enrollment_Payment_MetaData));
    }

    /**
     * DELETE  /enrollment-payment-meta-data/:id : delete the "id" enrollment_Payment_MetaData.
     *
     * @param id the id of the enrollment_Payment_MetaData to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/enrollment-payment-meta-data/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnrollment_Payment_MetaData(@PathVariable Long id) {
        log.debug("REST request to delete Enrollment_Payment_MetaData : {}", id);
        enrollment_Payment_MetaDataRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
