package com.getinsured.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Agent.
 */
@Entity
@Table(name = "agent")
public class Agent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "agent_id", nullable = false)
    private String agentId;

    @NotNull
    @Column(name = "agent_npn", nullable = false)
    private String agentNPN;

    @NotNull
    @Column(name = "eligible_for_advances", nullable = false)
    private Boolean eligibleForAdvances;

    @NotNull
    @Column(name = "tenant_id", nullable = false)
    private String tenantId;

    @OneToOne
    @JoinColumn(unique = true)
    private RulePaymentAgent id;

    @OneToMany(mappedBy = "agent")
    @JsonIgnore
    private Set<Enrollment> ids = new HashSet<>();

    @OneToMany(mappedBy = "agent")
    @JsonIgnore
    private Set<AgentPayout> ids = new HashSet<>();

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

    public Agent agentId(String agentId) {
        this.agentId = agentId;
        return this;
    }

    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    public String getAgentNPN() {
        return agentNPN;
    }

    public Agent agentNPN(String agentNPN) {
        this.agentNPN = agentNPN;
        return this;
    }

    public void setAgentNPN(String agentNPN) {
        this.agentNPN = agentNPN;
    }

    public Boolean isEligibleForAdvances() {
        return eligibleForAdvances;
    }

    public Agent eligibleForAdvances(Boolean eligibleForAdvances) {
        this.eligibleForAdvances = eligibleForAdvances;
        return this;
    }

    public void setEligibleForAdvances(Boolean eligibleForAdvances) {
        this.eligibleForAdvances = eligibleForAdvances;
    }

    public String getTenantId() {
        return tenantId;
    }

    public Agent tenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public RulePaymentAgent getId() {
        return id;
    }

    public Agent id(RulePaymentAgent rulePaymentAgent) {
        this.id = rulePaymentAgent;
        return this;
    }

    public void setId(RulePaymentAgent rulePaymentAgent) {
        this.id = rulePaymentAgent;
    }

    public Set<Enrollment> getIds() {
        return ids;
    }

    public Agent ids(Set<Enrollment> enrollments) {
        this.ids = enrollments;
        return this;
    }

    public Agent addId(Enrollment enrollment) {
        this.ids.add(enrollment);
        enrollment.setAgent(this);
        return this;
    }

    public Agent removeId(Enrollment enrollment) {
        this.ids.remove(enrollment);
        enrollment.setAgent(null);
        return this;
    }

    public void setIds(Set<Enrollment> enrollments) {
        this.ids = enrollments;
    }

    public Set<AgentPayout> getIds() {
        return ids;
    }

    public Agent ids(Set<AgentPayout> agentPayouts) {
        this.ids = agentPayouts;
        return this;
    }

    public Agent addId(AgentPayout agentPayout) {
        this.ids.add(agentPayout);
        agentPayout.setAgent(this);
        return this;
    }

    public Agent removeId(AgentPayout agentPayout) {
        this.ids.remove(agentPayout);
        agentPayout.setAgent(null);
        return this;
    }

    public void setIds(Set<AgentPayout> agentPayouts) {
        this.ids = agentPayouts;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public Agent tenant(Tenant tenant) {
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
        Agent agent = (Agent) o;
        if (agent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Agent{" +
            "id=" + getId() +
            ", agentId='" + getAgentId() + "'" +
            ", agentNPN='" + getAgentNPN() + "'" +
            ", eligibleForAdvances='" + isEligibleForAdvances() + "'" +
            ", tenantId='" + getTenantId() + "'" +
            "}";
    }
}
