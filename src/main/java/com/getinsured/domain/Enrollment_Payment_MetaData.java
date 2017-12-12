package com.getinsured.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Enrollment_Payment_MetaData.
 */
@Entity
@Table(name = "enrollment_payment_meta_data")
public class Enrollment_Payment_MetaData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "enrollment_id", nullable = false)
    private String enrollmentId;

    @Column(name = "agent_id")
    private String agentId;

    @Column(name = "is_advancable")
    private Boolean isAdvancable;

    @Column(name = "carrier_commission_rule_id")
    private String carrierCommissionRuleId;

    @Column(name = "agent_commision_rule_id")
    private String agentCommisionRuleId;

    @OneToOne(mappedBy = "id")
    @JsonIgnore
    private Enrollment enrollment;

    @OneToOne(mappedBy = "id")
    @JsonIgnore
    private RulePaymentAgent agentCommissionRule;

    @OneToOne(mappedBy = "id")
    @JsonIgnore
    private RulePaymentCarrier carrierCommissionRule;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnrollmentId() {
        return enrollmentId;
    }

    public Enrollment_Payment_MetaData enrollmentId(String enrollmentId) {
        this.enrollmentId = enrollmentId;
        return this;
    }

    public void setEnrollmentId(String enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public String getAgentId() {
        return agentId;
    }

    public Enrollment_Payment_MetaData agentId(String agentId) {
        this.agentId = agentId;
        return this;
    }

    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    public Boolean isIsAdvancable() {
        return isAdvancable;
    }

    public Enrollment_Payment_MetaData isAdvancable(Boolean isAdvancable) {
        this.isAdvancable = isAdvancable;
        return this;
    }

    public void setIsAdvancable(Boolean isAdvancable) {
        this.isAdvancable = isAdvancable;
    }

    public String getCarrierCommissionRuleId() {
        return carrierCommissionRuleId;
    }

    public Enrollment_Payment_MetaData carrierCommissionRuleId(String carrierCommissionRuleId) {
        this.carrierCommissionRuleId = carrierCommissionRuleId;
        return this;
    }

    public void setCarrierCommissionRuleId(String carrierCommissionRuleId) {
        this.carrierCommissionRuleId = carrierCommissionRuleId;
    }

    public String getAgentCommisionRuleId() {
        return agentCommisionRuleId;
    }

    public Enrollment_Payment_MetaData agentCommisionRuleId(String agentCommisionRuleId) {
        this.agentCommisionRuleId = agentCommisionRuleId;
        return this;
    }

    public void setAgentCommisionRuleId(String agentCommisionRuleId) {
        this.agentCommisionRuleId = agentCommisionRuleId;
    }

    public Enrollment getEnrollment() {
        return enrollment;
    }

    public Enrollment_Payment_MetaData enrollment(Enrollment enrollment) {
        this.enrollment = enrollment;
        return this;
    }

    public void setEnrollment(Enrollment enrollment) {
        this.enrollment = enrollment;
    }

    public RulePaymentAgent getAgentCommissionRule() {
        return agentCommissionRule;
    }

    public Enrollment_Payment_MetaData agentCommissionRule(RulePaymentAgent rulePaymentAgent) {
        this.agentCommissionRule = rulePaymentAgent;
        return this;
    }

    public void setAgentCommissionRule(RulePaymentAgent rulePaymentAgent) {
        this.agentCommissionRule = rulePaymentAgent;
    }

    public RulePaymentCarrier getCarrierCommissionRule() {
        return carrierCommissionRule;
    }

    public Enrollment_Payment_MetaData carrierCommissionRule(RulePaymentCarrier rulePaymentCarrier) {
        this.carrierCommissionRule = rulePaymentCarrier;
        return this;
    }

    public void setCarrierCommissionRule(RulePaymentCarrier rulePaymentCarrier) {
        this.carrierCommissionRule = rulePaymentCarrier;
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
        Enrollment_Payment_MetaData enrollment_Payment_MetaData = (Enrollment_Payment_MetaData) o;
        if (enrollment_Payment_MetaData.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enrollment_Payment_MetaData.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Enrollment_Payment_MetaData{" +
            "id=" + getId() +
            ", enrollmentId='" + getEnrollmentId() + "'" +
            ", agentId='" + getAgentId() + "'" +
            ", isAdvancable='" + isIsAdvancable() + "'" +
            ", carrierCommissionRuleId='" + getCarrierCommissionRuleId() + "'" +
            ", agentCommisionRuleId='" + getAgentCommisionRuleId() + "'" +
            "}";
    }
}
