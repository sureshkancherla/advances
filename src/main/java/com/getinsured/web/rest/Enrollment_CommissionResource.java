package com.getinsured.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.getinsured.domain.Enrollment_Commission;

import com.getinsured.repository.Enrollment_CommissionRepository;
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

/**
 * REST controller for managing Enrollment_Commission.
 */
@RestController
@RequestMapping("/api")
public class Enrollment_CommissionResource {

    private final Logger log = LoggerFactory.getLogger(Enrollment_CommissionResource.class);

    private static final String ENTITY_NAME = "enrollment_Commission";

    private final Enrollment_CommissionRepository enrollment_CommissionRepository;

    public Enrollment_CommissionResource(Enrollment_CommissionRepository enrollment_CommissionRepository) {
        this.enrollment_CommissionRepository = enrollment_CommissionRepository;
    }

    /**
     * POST  /enrollment-commissions : Create a new enrollment_Commission.
     *
     * @param enrollment_Commission the enrollment_Commission to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enrollment_Commission, or with status 400 (Bad Request) if the enrollment_Commission has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/enrollment-commissions")
    @Timed
    public ResponseEntity<Enrollment_Commission> createEnrollment_Commission(@Valid @RequestBody Enrollment_Commission enrollment_Commission) throws URISyntaxException {
        log.debug("REST request to save Enrollment_Commission : {}", enrollment_Commission);
        if (enrollment_Commission.getId() != null) {
            throw new BadRequestAlertException("A new enrollment_Commission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Enrollment_Commission result = enrollment_CommissionRepository.save(enrollment_Commission);
        return ResponseEntity.created(new URI("/api/enrollment-commissions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /enrollment-commissions : Updates an existing enrollment_Commission.
     *
     * @param enrollment_Commission the enrollment_Commission to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enrollment_Commission,
     * or with status 400 (Bad Request) if the enrollment_Commission is not valid,
     * or with status 500 (Internal Server Error) if the enrollment_Commission couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/enrollment-commissions")
    @Timed
    public ResponseEntity<Enrollment_Commission> updateEnrollment_Commission(@Valid @RequestBody Enrollment_Commission enrollment_Commission) throws URISyntaxException {
        log.debug("REST request to update Enrollment_Commission : {}", enrollment_Commission);
        if (enrollment_Commission.getId() == null) {
            return createEnrollment_Commission(enrollment_Commission);
        }
        Enrollment_Commission result = enrollment_CommissionRepository.save(enrollment_Commission);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enrollment_Commission.getId().toString()))
            .body(result);
    }

    /**
     * GET  /enrollment-commissions : get all the enrollment_Commissions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of enrollment_Commissions in body
     */
    @GetMapping("/enrollment-commissions")
    @Timed
    public List<Enrollment_Commission> getAllEnrollment_Commissions() {
        log.debug("REST request to get all Enrollment_Commissions");
        return enrollment_CommissionRepository.findAll();
        }

    /**
     * GET  /enrollment-commissions/:id : get the "id" enrollment_Commission.
     *
     * @param id the id of the enrollment_Commission to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enrollment_Commission, or with status 404 (Not Found)
     */
    @GetMapping("/enrollment-commissions/{id}")
    @Timed
    public ResponseEntity<Enrollment_Commission> getEnrollment_Commission(@PathVariable Long id) {
        log.debug("REST request to get Enrollment_Commission : {}", id);
        Enrollment_Commission enrollment_Commission = enrollment_CommissionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(enrollment_Commission));
    }

    /**
     * DELETE  /enrollment-commissions/:id : delete the "id" enrollment_Commission.
     *
     * @param id the id of the enrollment_Commission to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/enrollment-commissions/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnrollment_Commission(@PathVariable Long id) {
        log.debug("REST request to delete Enrollment_Commission : {}", id);
        enrollment_CommissionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
