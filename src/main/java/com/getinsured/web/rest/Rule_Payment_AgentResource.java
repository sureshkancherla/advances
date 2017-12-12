package com.getinsured.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.getinsured.domain.Rule_Payment_Agent;

import com.getinsured.repository.Rule_Payment_AgentRepository;
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
 * REST controller for managing Rule_Payment_Agent.
 */
@RestController
@RequestMapping("/api")
public class Rule_Payment_AgentResource {

    private final Logger log = LoggerFactory.getLogger(Rule_Payment_AgentResource.class);

    private static final String ENTITY_NAME = "rule_Payment_Agent";

    private final Rule_Payment_AgentRepository rule_Payment_AgentRepository;

    public Rule_Payment_AgentResource(Rule_Payment_AgentRepository rule_Payment_AgentRepository) {
        this.rule_Payment_AgentRepository = rule_Payment_AgentRepository;
    }

    /**
     * POST  /rule-payment-agents : Create a new rule_Payment_Agent.
     *
     * @param rule_Payment_Agent the rule_Payment_Agent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rule_Payment_Agent, or with status 400 (Bad Request) if the rule_Payment_Agent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rule-payment-agents")
    @Timed
    public ResponseEntity<Rule_Payment_Agent> createRule_Payment_Agent(@Valid @RequestBody Rule_Payment_Agent rule_Payment_Agent) throws URISyntaxException {
        log.debug("REST request to save Rule_Payment_Agent : {}", rule_Payment_Agent);
        if (rule_Payment_Agent.getId() != null) {
            throw new BadRequestAlertException("A new rule_Payment_Agent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rule_Payment_Agent result = rule_Payment_AgentRepository.save(rule_Payment_Agent);
        return ResponseEntity.created(new URI("/api/rule-payment-agents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rule-payment-agents : Updates an existing rule_Payment_Agent.
     *
     * @param rule_Payment_Agent the rule_Payment_Agent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rule_Payment_Agent,
     * or with status 400 (Bad Request) if the rule_Payment_Agent is not valid,
     * or with status 500 (Internal Server Error) if the rule_Payment_Agent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rule-payment-agents")
    @Timed
    public ResponseEntity<Rule_Payment_Agent> updateRule_Payment_Agent(@Valid @RequestBody Rule_Payment_Agent rule_Payment_Agent) throws URISyntaxException {
        log.debug("REST request to update Rule_Payment_Agent : {}", rule_Payment_Agent);
        if (rule_Payment_Agent.getId() == null) {
            return createRule_Payment_Agent(rule_Payment_Agent);
        }
        Rule_Payment_Agent result = rule_Payment_AgentRepository.save(rule_Payment_Agent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rule_Payment_Agent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rule-payment-agents : get all the rule_Payment_Agents.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of rule_Payment_Agents in body
     */
    @GetMapping("/rule-payment-agents")
    @Timed
    public List<Rule_Payment_Agent> getAllRule_Payment_Agents(@RequestParam(required = false) String filter) {
        if ("agent-is-null".equals(filter)) {
            log.debug("REST request to get all Rule_Payment_Agents where agent is null");
            return StreamSupport
                .stream(rule_Payment_AgentRepository.findAll().spliterator(), false)
                .filter(rule_Payment_Agent -> rule_Payment_Agent.getAgent() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Rule_Payment_Agents");
        return rule_Payment_AgentRepository.findAll();
        }

    /**
     * GET  /rule-payment-agents/:id : get the "id" rule_Payment_Agent.
     *
     * @param id the id of the rule_Payment_Agent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rule_Payment_Agent, or with status 404 (Not Found)
     */
    @GetMapping("/rule-payment-agents/{id}")
    @Timed
    public ResponseEntity<Rule_Payment_Agent> getRule_Payment_Agent(@PathVariable Long id) {
        log.debug("REST request to get Rule_Payment_Agent : {}", id);
        Rule_Payment_Agent rule_Payment_Agent = rule_Payment_AgentRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rule_Payment_Agent));
    }

    /**
     * DELETE  /rule-payment-agents/:id : delete the "id" rule_Payment_Agent.
     *
     * @param id the id of the rule_Payment_Agent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rule-payment-agents/{id}")
    @Timed
    public ResponseEntity<Void> deleteRule_Payment_Agent(@PathVariable Long id) {
        log.debug("REST request to delete Rule_Payment_Agent : {}", id);
        rule_Payment_AgentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
