package com.getinsured.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.getinsured.domain.Agent_Payout;

import com.getinsured.repository.Agent_PayoutRepository;
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
 * REST controller for managing Agent_Payout.
 */
@RestController
@RequestMapping("/api")
public class Agent_PayoutResource {

    private final Logger log = LoggerFactory.getLogger(Agent_PayoutResource.class);

    private static final String ENTITY_NAME = "agent_Payout";

    private final Agent_PayoutRepository agent_PayoutRepository;

    public Agent_PayoutResource(Agent_PayoutRepository agent_PayoutRepository) {
        this.agent_PayoutRepository = agent_PayoutRepository;
    }

    /**
     * POST  /agent-payouts : Create a new agent_Payout.
     *
     * @param agent_Payout the agent_Payout to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agent_Payout, or with status 400 (Bad Request) if the agent_Payout has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agent-payouts")
    @Timed
    public ResponseEntity<Agent_Payout> createAgent_Payout(@Valid @RequestBody Agent_Payout agent_Payout) throws URISyntaxException {
        log.debug("REST request to save Agent_Payout : {}", agent_Payout);
        if (agent_Payout.getId() != null) {
            throw new BadRequestAlertException("A new agent_Payout cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Agent_Payout result = agent_PayoutRepository.save(agent_Payout);
        return ResponseEntity.created(new URI("/api/agent-payouts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agent-payouts : Updates an existing agent_Payout.
     *
     * @param agent_Payout the agent_Payout to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agent_Payout,
     * or with status 400 (Bad Request) if the agent_Payout is not valid,
     * or with status 500 (Internal Server Error) if the agent_Payout couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agent-payouts")
    @Timed
    public ResponseEntity<Agent_Payout> updateAgent_Payout(@Valid @RequestBody Agent_Payout agent_Payout) throws URISyntaxException {
        log.debug("REST request to update Agent_Payout : {}", agent_Payout);
        if (agent_Payout.getId() == null) {
            return createAgent_Payout(agent_Payout);
        }
        Agent_Payout result = agent_PayoutRepository.save(agent_Payout);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agent_Payout.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agent-payouts : get all the agent_Payouts.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of agent_Payouts in body
     */
    @GetMapping("/agent-payouts")
    @Timed
    public List<Agent_Payout> getAllAgent_Payouts(@RequestParam(required = false) String filter) {
        if ("paymenttype-is-null".equals(filter)) {
            log.debug("REST request to get all Agent_Payouts where paymentType is null");
            return StreamSupport
                .stream(agent_PayoutRepository.findAll().spliterator(), false)
                .filter(agent_Payout -> agent_Payout.getPaymentType() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Agent_Payouts");
        return agent_PayoutRepository.findAll();
        }

    /**
     * GET  /agent-payouts/:id : get the "id" agent_Payout.
     *
     * @param id the id of the agent_Payout to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agent_Payout, or with status 404 (Not Found)
     */
    @GetMapping("/agent-payouts/{id}")
    @Timed
    public ResponseEntity<Agent_Payout> getAgent_Payout(@PathVariable Long id) {
        log.debug("REST request to get Agent_Payout : {}", id);
        Agent_Payout agent_Payout = agent_PayoutRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(agent_Payout));
    }

    /**
     * DELETE  /agent-payouts/:id : delete the "id" agent_Payout.
     *
     * @param id the id of the agent_Payout to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agent-payouts/{id}")
    @Timed
    public ResponseEntity<Void> deleteAgent_Payout(@PathVariable Long id) {
        log.debug("REST request to delete Agent_Payout : {}", id);
        agent_PayoutRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
