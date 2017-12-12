package com.getinsured.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.getinsured.domain.Rule_Payment_Carrier;

import com.getinsured.repository.Rule_Payment_CarrierRepository;
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
 * REST controller for managing Rule_Payment_Carrier.
 */
@RestController
@RequestMapping("/api")
public class Rule_Payment_CarrierResource {

    private final Logger log = LoggerFactory.getLogger(Rule_Payment_CarrierResource.class);

    private static final String ENTITY_NAME = "rule_Payment_Carrier";

    private final Rule_Payment_CarrierRepository rule_Payment_CarrierRepository;

    public Rule_Payment_CarrierResource(Rule_Payment_CarrierRepository rule_Payment_CarrierRepository) {
        this.rule_Payment_CarrierRepository = rule_Payment_CarrierRepository;
    }

    /**
     * POST  /rule-payment-carriers : Create a new rule_Payment_Carrier.
     *
     * @param rule_Payment_Carrier the rule_Payment_Carrier to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rule_Payment_Carrier, or with status 400 (Bad Request) if the rule_Payment_Carrier has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rule-payment-carriers")
    @Timed
    public ResponseEntity<Rule_Payment_Carrier> createRule_Payment_Carrier(@Valid @RequestBody Rule_Payment_Carrier rule_Payment_Carrier) throws URISyntaxException {
        log.debug("REST request to save Rule_Payment_Carrier : {}", rule_Payment_Carrier);
        if (rule_Payment_Carrier.getId() != null) {
            throw new BadRequestAlertException("A new rule_Payment_Carrier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rule_Payment_Carrier result = rule_Payment_CarrierRepository.save(rule_Payment_Carrier);
        return ResponseEntity.created(new URI("/api/rule-payment-carriers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rule-payment-carriers : Updates an existing rule_Payment_Carrier.
     *
     * @param rule_Payment_Carrier the rule_Payment_Carrier to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rule_Payment_Carrier,
     * or with status 400 (Bad Request) if the rule_Payment_Carrier is not valid,
     * or with status 500 (Internal Server Error) if the rule_Payment_Carrier couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rule-payment-carriers")
    @Timed
    public ResponseEntity<Rule_Payment_Carrier> updateRule_Payment_Carrier(@Valid @RequestBody Rule_Payment_Carrier rule_Payment_Carrier) throws URISyntaxException {
        log.debug("REST request to update Rule_Payment_Carrier : {}", rule_Payment_Carrier);
        if (rule_Payment_Carrier.getId() == null) {
            return createRule_Payment_Carrier(rule_Payment_Carrier);
        }
        Rule_Payment_Carrier result = rule_Payment_CarrierRepository.save(rule_Payment_Carrier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rule_Payment_Carrier.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rule-payment-carriers : get all the rule_Payment_Carriers.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of rule_Payment_Carriers in body
     */
    @GetMapping("/rule-payment-carriers")
    @Timed
    public List<Rule_Payment_Carrier> getAllRule_Payment_Carriers(@RequestParam(required = false) String filter) {
        if ("carrier-is-null".equals(filter)) {
            log.debug("REST request to get all Rule_Payment_Carriers where carrier is null");
            return StreamSupport
                .stream(rule_Payment_CarrierRepository.findAll().spliterator(), false)
                .filter(rule_Payment_Carrier -> rule_Payment_Carrier.getCarrier() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Rule_Payment_Carriers");
        return rule_Payment_CarrierRepository.findAll();
        }

    /**
     * GET  /rule-payment-carriers/:id : get the "id" rule_Payment_Carrier.
     *
     * @param id the id of the rule_Payment_Carrier to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rule_Payment_Carrier, or with status 404 (Not Found)
     */
    @GetMapping("/rule-payment-carriers/{id}")
    @Timed
    public ResponseEntity<Rule_Payment_Carrier> getRule_Payment_Carrier(@PathVariable Long id) {
        log.debug("REST request to get Rule_Payment_Carrier : {}", id);
        Rule_Payment_Carrier rule_Payment_Carrier = rule_Payment_CarrierRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rule_Payment_Carrier));
    }

    /**
     * DELETE  /rule-payment-carriers/:id : delete the "id" rule_Payment_Carrier.
     *
     * @param id the id of the rule_Payment_Carrier to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rule-payment-carriers/{id}")
    @Timed
    public ResponseEntity<Void> deleteRule_Payment_Carrier(@PathVariable Long id) {
        log.debug("REST request to delete Rule_Payment_Carrier : {}", id);
        rule_Payment_CarrierRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
