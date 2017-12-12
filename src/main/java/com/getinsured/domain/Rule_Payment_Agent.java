package com.getinsured.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Rule_Payment_Agent.
 */
@Entity
@Table(name = "rule_payment_agent")
public class Rule_Payment_Agent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Lob
    @Column(name = "agent_commision_rule", nullable = false)
    private String agentCommisionRule;

    @NotNull
    @Column(name = "agent_id", nullable = false)
    private String agentId;

    @OneToOne
    @JoinColumn(unique = true)
    private EnrollmentPaymentMetaData id;

    @OneToOne(mappedBy = "id")
    @JsonIgnore
    private Agent agent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAgentCommisionRule() {
        return agentCommisionRule;
    }

    public Rule_Payment_Agent agentCommisionRule(String agentCommisionRule) {
        this.agentCommisionRule = agentCommisionRule;
        return this;
    }

    public void setAgentCommisionRule(String agentCommisionRule) {
        this.agentCommisionRule = agentCommisionRule;
    }

    public String getAgentId() {
        return agentId;
    }

    public Rule_Payment_Agent agentId(String agentId) {
        this.agentId = agentId;
        return this;
    }

    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    public EnrollmentPaymentMetaData getId() {
        return id;
    }

    public Rule_Payment_Agent id(EnrollmentPaymentMetaData enrollmentPaymentMetaData) {
        this.id = enrollmentPaymentMetaData;
        return this;
    }

    public void setId(EnrollmentPaymentMetaData enrollmentPaymentMetaData) {
        this.id = enrollmentPaymentMetaData;
    }

    public Agent getAgent() {
        return agent;
    }

    public Rule_Payment_Agent agent(Agent agent) {
        this.agent = agent;
        return this;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Rule_Payment_Agent rule_Payment_Agent = (Rule_Payment_Agent) o;
        if (rule_Payment_Agent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rule_Payment_Agent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rule_Payment_Agent{" +
            "id=" + getId() +
            ", agentCommisionRule='" + getAgentCommisionRule() + "'" +
            ", agentId='" + getAgentId() + "'" +
            "}";
    }
}
