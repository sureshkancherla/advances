package com.getinsured.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.getinsured.domain.Lookup;

import com.getinsured.repository.LookupRepository;
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
 * REST controller for managing Lookup.
 */
@RestController
@RequestMapping("/api")
public class LookupResource {

    private final Logger log = LoggerFactory.getLogger(LookupResource.class);

    private static final String ENTITY_NAME = "lookup";

    private final LookupRepository lookupRepository;

    public LookupResource(LookupRepository lookupRepository) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * POST  /lookups : Create a new lookup.
     *
     * @param lookup the lookup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lookup, or with status 400 (Bad Request) if the lookup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lookups")
    @Timed
    public ResponseEntity<Lookup> createLookup(@Valid @RequestBody Lookup lookup) throws URISyntaxException {
        log.debug("REST request to save Lookup : {}", lookup);
        if (lookup.getId() != null) {
            throw new BadRequestAlertException("A new lookup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lookup result = lookupRepository.save(lookup);
        return ResponseEntity.created(new URI("/api/lookups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lookups : Updates an existing lookup.
     *
     * @param lookup the lookup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lookup,
     * or with status 400 (Bad Request) if the lookup is not valid,
     * or with status 500 (Internal Server Error) if the lookup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lookups")
    @Timed
    public ResponseEntity<Lookup> updateLookup(@Valid @RequestBody Lookup lookup) throws URISyntaxException {
        log.debug("REST request to update Lookup : {}", lookup);
        if (lookup.getId() == null) {
            return createLookup(lookup);
        }
        Lookup result = lookupRepository.save(lookup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lookup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lookups : get all the lookups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of lookups in body
     */
    @GetMapping("/lookups")
    @Timed
    public List<Lookup> getAllLookups() {
        log.debug("REST request to get all Lookups");
        return lookupRepository.findAll();
        }

    /**
     * GET  /lookups/:id : get the "id" lookup.
     *
     * @param id the id of the lookup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lookup, or with status 404 (Not Found)
     */
    @GetMapping("/lookups/{id}")
    @Timed
    public ResponseEntity<Lookup> getLookup(@PathVariable Long id) {
        log.debug("REST request to get Lookup : {}", id);
        Lookup lookup = lookupRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lookup));
    }

    /**
     * DELETE  /lookups/:id : delete the "id" lookup.
     *
     * @param id the id of the lookup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lookups/{id}")
    @Timed
    public ResponseEntity<Void> deleteLookup(@PathVariable Long id) {
        log.debug("REST request to delete Lookup : {}", id);
        lookupRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
