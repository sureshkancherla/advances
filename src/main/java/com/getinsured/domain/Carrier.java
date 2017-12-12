package com.getinsured.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Carrier.
 */
@Entity
@Table(name = "carrier")
public class Carrier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "hios_id", nullable = false)
    private String hiosId;

    @OneToOne
    @JoinColumn(unique = true)
    private RulePaymentCarrier id;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Carrier name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHiosId() {
        return hiosId;
    }

    public Carrier hiosId(String hiosId) {
        this.hiosId = hiosId;
        return this;
    }

    public void setHiosId(String hiosId) {
        this.hiosId = hiosId;
    }

    public RulePaymentCarrier getId() {
        return id;
    }

    public Carrier id(RulePaymentCarrier rulePaymentCarrier) {
        this.id = rulePaymentCarrier;
        return this;
    }

    public void setId(RulePaymentCarrier rulePaymentCarrier) {
        this.id = rulePaymentCarrier;
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
        Carrier carrier = (Carrier) o;
        if (carrier.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carrier.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Carrier{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", hiosId='" + getHiosId() + "'" +
            "}";
    }
}
