package com.getinsured.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Enrollment_Commission.
 */
@Entity
@Table(name = "enrollment_commission")
public class Enrollment_Commission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "commission_amount", precision=10, scale=2)
    private BigDecimal commissionAmount;

    @NotNull
    @Column(name = "enrollmet_id", nullable = false)
    private String enrollmetId;

    @NotNull
    @Column(name = "statement_date", nullable = false)
    private ZonedDateTime statementDate;

    @ManyToOne
    private Enrollment enrollmet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getCommissionAmount() {
        return commissionAmount;
    }

    public Enrollment_Commission commissionAmount(BigDecimal commissionAmount) {
        this.commissionAmount = commissionAmount;
        return this;
    }

    public void setCommissionAmount(BigDecimal commissionAmount) {
        this.commissionAmount = commissionAmount;
    }

    public String getEnrollmetId() {
        return enrollmetId;
    }

    public Enrollment_Commission enrollmetId(String enrollmetId) {
        this.enrollmetId = enrollmetId;
        return this;
    }

    public void setEnrollmetId(String enrollmetId) {
        this.enrollmetId = enrollmetId;
    }

    public ZonedDateTime getStatementDate() {
        return statementDate;
    }

    public Enrollment_Commission statementDate(ZonedDateTime statementDate) {
        this.statementDate = statementDate;
        return this;
    }

    public void setStatementDate(ZonedDateTime statementDate) {
        this.statementDate = statementDate;
    }

    public Enrollment getEnrollmet() {
        return enrollmet;
    }

    public Enrollment_Commission enrollmet(Enrollment enrollment) {
        this.enrollmet = enrollment;
        return this;
    }

    public void setEnrollmet(Enrollment enrollment) {
        this.enrollmet = enrollment;
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
        Enrollment_Commission enrollment_Commission = (Enrollment_Commission) o;
        if (enrollment_Commission.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enrollment_Commission.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Enrollment_Commission{" +
            "id=" + getId() +
            ", commissionAmount=" + getCommissionAmount() +
            ", enrollmetId='" + getEnrollmetId() + "'" +
            ", statementDate='" + getStatementDate() + "'" +
            "}";
    }
}
