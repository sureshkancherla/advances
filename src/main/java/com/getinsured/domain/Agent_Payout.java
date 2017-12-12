package com.getinsured.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A Agent_Payout.
 */
@Entity
@Table(name = "agent_payout")
public class Agent_Payout implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "agent_id", nullable = false)
    private String agentId;

    @NotNull
    @Column(name = "payment_type_id", nullable = false)
    private String paymentTypeId;

    @NotNull
    @Column(name = "payment_amount", precision=10, scale=2, nullable = false)
    private BigDecimal paymentAmount;

    @NotNull
    @Column(name = "enrollment_id", nullable = false)
    private String enrollmentId;

    @NotNull
    @Lob
    @Column(name = "payout_rule", nullable = false)
    private String payoutRule;

    @OneToOne(mappedBy = "id")
    @JsonIgnore
    private Lookup paymentType;

    @ManyToOne
    private Agent agent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAgentId() {
        return agentId;
    }

    public Agent_Payout agentId(String agentId) {
        this.agentId = agentId;
        return this;
    }

    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    public String getPaymentTypeId() {
        return paymentTypeId;
    }

    public Agent_Payout paymentTypeId(String paymentTypeId) {
        this.paymentTypeId = paymentTypeId;
        return this;
    }

    public void setPaymentTypeId(String paymentTypeId) {
        this.paymentTypeId = paymentTypeId;
    }

    public BigDecimal getPaymentAmount() {
        return paymentAmount;
    }

    public Agent_Payout paymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
        return this;
    }

    public void setPaymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getEnrollmentId() {
        return enrollmentId;
    }

    public Agent_Payout enrollmentId(String enrollmentId) {
        this.enrollmentId = enrollmentId;
        return this;
    }

    public void setEnrollmentId(String enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public String getPayoutRule() {
        return payoutRule;
    }

    public Agent_Payout payoutRule(String payoutRule) {
        this.payoutRule = payoutRule;
        return this;
    }

    public void setPayoutRule(String payoutRule) {
        this.payoutRule = payoutRule;
    }

    public Lookup getPaymentType() {
        return paymentType;
    }

    public Agent_Payout paymentType(Lookup lookup) {
        this.paymentType = lookup;
        return this;
    }

    public void setPaymentType(Lookup lookup) {
        this.paymentType = lookup;
    }

    public Agent getAgent() {
        return agent;
    }

    public Agent_Payout agent(Agent agent) {
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
        Agent_Payout agent_Payout = (Agent_Payout) o;
        if (agent_Payout.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agent_Payout.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Agent_Payout{" +
            "id=" + getId() +
            ", agentId='" + getAgentId() + "'" +
            ", paymentTypeId='" + getPaymentTypeId() + "'" +
            ", paymentAmount=" + getPaymentAmount() +
            ", enrollmentId='" + getEnrollmentId() + "'" +
            ", payoutRule='" + getPayoutRule() + "'" +
            "}";
    }
}
