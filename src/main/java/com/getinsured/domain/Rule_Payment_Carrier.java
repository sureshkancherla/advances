package com.getinsured.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Rule_Payment_Carrier.
 */
@Entity
@Table(name = "rule_payment_carrier")
public class Rule_Payment_Carrier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "carrier_id", nullable = false)
    private String carrierId;

    @NotNull
    @Lob
    @Column(name = "carrier_commision_rule", nullable = false)
    private String carrierCommisionRule;

    @NotNull
    @Lob
    @Column(name = "advance_rule", nullable = false)
    private String advanceRule;

    @OneToOne
    @JoinColumn(unique = true)
    private EnrollmentPaymentMetaData id;

    @OneToOne(mappedBy = "id")
    @JsonIgnore
    private Carrier carrier;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCarrierId() {
        return carrierId;
    }

    public Rule_Payment_Carrier carrierId(String carrierId) {
        this.carrierId = carrierId;
        return this;
    }

    public void setCarrierId(String carrierId) {
        this.carrierId = carrierId;
    }

    public String getCarrierCommisionRule() {
        return carrierCommisionRule;
    }

    public Rule_Payment_Carrier carrierCommisionRule(String carrierCommisionRule) {
        this.carrierCommisionRule = carrierCommisionRule;
        return this;
    }

    public void setCarrierCommisionRule(String carrierCommisionRule) {
        this.carrierCommisionRule = carrierCommisionRule;
    }

    public String getAdvanceRule() {
        return advanceRule;
    }

    public Rule_Payment_Carrier advanceRule(String advanceRule) {
        this.advanceRule = advanceRule;
        return this;
    }

    public void setAdvanceRule(String advanceRule) {
        this.advanceRule = advanceRule;
    }

    public EnrollmentPaymentMetaData getId() {
        return id;
    }

    public Rule_Payment_Carrier id(EnrollmentPaymentMetaData enrollmentPaymentMetaData) {
        this.id = enrollmentPaymentMetaData;
        return this;
    }

    public void setId(EnrollmentPaymentMetaData enrollmentPaymentMetaData) {
        this.id = enrollmentPaymentMetaData;
    }

    public Carrier getCarrier() {
        return carrier;
    }

    public Rule_Payment_Carrier carrier(Carrier carrier) {
        this.carrier = carrier;
        return this;
    }

    public void setCarrier(Carrier carrier) {
        this.carrier = carrier;
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
        Rule_Payment_Carrier rule_Payment_Carrier = (Rule_Payment_Carrier) o;
        if (rule_Payment_Carrier.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rule_Payment_Carrier.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rule_Payment_Carrier{" +
            "id=" + getId() +
            ", carrierId='" + getCarrierId() + "'" +
            ", carrierCommisionRule='" + getCarrierCommisionRule() + "'" +
            ", advanceRule='" + getAdvanceRule() + "'" +
            "}";
    }
}
