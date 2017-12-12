package com.getinsured.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.getinsured.domain.Enrollment;

import com.getinsured.repository.EnrollmentRepository;
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
 * REST controller for managing Enrollment.
 */
@RestController
@RequestMapping("/api")
public class EnrollmentResource {

    private final Logger log = LoggerFactory.getLogger(EnrollmentResource.class);

    private static final String ENTITY_NAME = "enrollment";

    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentResource(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    /**
     * POST  /enrollments : Create a new enrollment.
     *
     * @param enrollment the enrollment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enrollment, or with status 400 (Bad Request) if the enrollment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/enrollments")
    @Timed
    public ResponseEntity<Enrollment> createEnrollment(@Valid @RequestBody Enrollment enrollment) throws URISyntaxException {
        log.debug("REST request to save Enrollment : {}", enrollment);
        if (enrollment.getId() != null) {
            throw new BadRequestAlertException("A new enrollment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Enrollment result = enrollmentRepository.save(enrollment);
        return ResponseEntity.created(new URI("/api/enrollments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /enrollments : Updates an existing enrollment.
     *
     * @param enrollment the enrollment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enrollment,
     * or with status 400 (Bad Request) if the enrollment is not valid,
     * or with status 500 (Internal Server Error) if the enrollment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/enrollments")
    @Timed
    public ResponseEntity<Enrollment> updateEnrollment(@Valid @RequestBody Enrollment enrollment) throws URISyntaxException {
        log.debug("REST request to update Enrollment : {}", enrollment);
        if (enrollment.getId() == null) {
            return createEnrollment(enrollment);
        }
        Enrollment result = enrollmentRepository.save(enrollment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enrollment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /enrollments : get all the enrollments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of enrollments in body
     */
    @GetMapping("/enrollments")
    @Timed
    public List<Enrollment> getAllEnrollments() {
        log.debug("REST request to get all Enrollments");
        return enrollmentRepository.findAll();
        }

    /**
     * GET  /enrollments/:id : get the "id" enrollment.
     *
     * @param id the id of the enrollment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enrollment, or with status 404 (Not Found)
     */
    @GetMapping("/enrollments/{id}")
    @Timed
    public ResponseEntity<Enrollment> getEnrollment(@PathVariable Long id) {
        log.debug("REST request to get Enrollment : {}", id);
        Enrollment enrollment = enrollmentRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(enrollment));
    }

    /**
     * DELETE  /enrollments/:id : delete the "id" enrollment.
     *
     * @param id the id of the enrollment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/enrollments/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id) {
        log.debug("REST request to delete Enrollment : {}", id);
        enrollmentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
