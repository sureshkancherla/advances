package com.getinsured.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Enrollment.
 */
@Entity
@Table(name = "enrollment")
public class Enrollment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "agent_id", nullable = false)
    private String agentId;

    @OneToOne
    @JoinColumn(unique = true)
    private EnrollmentPaymentMetaData id;

    @OneToMany(mappedBy = "enrollmet")
    @JsonIgnore
    private Set<EnrollmentCommission> ids = new HashSet<>();

    @ManyToOne
    private Agent agent;

    @ManyToOne
    private Tenant tenant;

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

    public Enrollment agentId(String agentId) {
        this.agentId = agentId;
        return this;
    }

    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    public EnrollmentPaymentMetaData getId() {
        return id;
    }

    public Enrollment id(EnrollmentPaymentMetaData enrollmentPaymentMetaData) {
        this.id = enrollmentPaymentMetaData;
        return this;
    }

    public void setId(EnrollmentPaymentMetaData enrollmentPaymentMetaData) {
        this.id = enrollmentPaymentMetaData;
    }

    public Set<EnrollmentCommission> getIds() {
        return ids;
    }

    public Enrollment ids(Set<EnrollmentCommission> enrollmentCommissions) {
        this.ids = enrollmentCommissions;
        return this;
    }

    public Enrollment addId(EnrollmentCommission enrollmentCommission) {
        this.ids.add(enrollmentCommission);
        enrollmentCommission.setEnrollmet(this);
        return this;
    }

    public Enrollment removeId(EnrollmentCommission enrollmentCommission) {
        this.ids.remove(enrollmentCommission);
        enrollmentCommission.setEnrollmet(null);
        return this;
    }

    public void setIds(Set<EnrollmentCommission> enrollmentCommissions) {
        this.ids = enrollmentCommissions;
    }

    public Agent getAgent() {
        return agent;
    }

    public Enrollment agent(Agent agent) {
        this.agent = agent;
        return this;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public Enrollment tenant(Tenant tenant) {
        this.tenant = tenant;
        return this;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
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
        Enrollment enrollment = (Enrollment) o;
        if (enrollment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enrollment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Enrollment{" +
            "id=" + getId() +
            ", agentId='" + getAgentId() + "'" +
            "}";
    }
}
