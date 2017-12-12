package com.getinsured.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Tenant.
 */
@Entity
@Table(name = "tenant")
public class Tenant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_type", nullable = false)
    private String type;

    @NotNull
    @Column(name = "parent_code", nullable = false)
    private String parentCode;

    @NotNull
    @Column(name = "tenant_id", nullable = false)
    private String tenantId;

    @OneToMany(mappedBy = "tenant")
    @JsonIgnore
    private Set<Agent> ids = new HashSet<>();

    @OneToMany(mappedBy = "parentTenant")
    @JsonIgnore
    private Set<Tenant> ids = new HashSet<>();

    @OneToMany(mappedBy = "tenant")
    @JsonIgnore
    private Set<Enrollment> ids = new HashSet<>();

    @ManyToOne
    private Tenant parentTenant;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Tenant type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getParentCode() {
        return parentCode;
    }

    public Tenant parentCode(String parentCode) {
        this.parentCode = parentCode;
        return this;
    }

    public void setParentCode(String parentCode) {
        this.parentCode = parentCode;
    }

    public String getTenantId() {
        return tenantId;
    }

    public Tenant tenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public Set<Agent> getIds() {
        return ids;
    }

    public Tenant ids(Set<Agent> agents) {
        this.ids = agents;
        return this;
    }

    public Tenant addId(Agent agent) {
        this.ids.add(agent);
        agent.setTenant(this);
        return this;
    }

    public Tenant removeId(Agent agent) {
        this.ids.remove(agent);
        agent.setTenant(null);
        return this;
    }

    public void setIds(Set<Agent> agents) {
        this.ids = agents;
    }

    public Set<Tenant> getIds() {
        return ids;
    }

    public Tenant ids(Set<Tenant> tenants) {
        this.ids = tenants;
        return this;
    }

    public Tenant addId(Tenant tenant) {
        this.ids.add(tenant);
        tenant.setParentTenant(this);
        return this;
    }

    public Tenant removeId(Tenant tenant) {
        this.ids.remove(tenant);
        tenant.setParentTenant(null);
        return this;
    }

    public void setIds(Set<Tenant> tenants) {
        this.ids = tenants;
    }

    public Set<Enrollment> getIds() {
        return ids;
    }

    public Tenant ids(Set<Enrollment> enrollments) {
        this.ids = enrollments;
        return this;
    }

    public Tenant addId(Enrollment enrollment) {
        this.ids.add(enrollment);
        enrollment.setTenant(this);
        return this;
    }

    public Tenant removeId(Enrollment enrollment) {
        this.ids.remove(enrollment);
        enrollment.setTenant(null);
        return this;
    }

    public void setIds(Set<Enrollment> enrollments) {
        this.ids = enrollments;
    }

    public Tenant getParentTenant() {
        return parentTenant;
    }

    public Tenant parentTenant(Tenant tenant) {
        this.parentTenant = tenant;
        return this;
    }

    public void setParentTenant(Tenant tenant) {
        this.parentTenant = tenant;
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
        Tenant tenant = (Tenant) o;
        if (tenant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tenant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tenant{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", parentCode='" + getParentCode() + "'" +
            ", tenantId='" + getTenantId() + "'" +
            "}";
    }
}
