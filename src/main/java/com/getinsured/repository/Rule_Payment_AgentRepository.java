package com.getinsured.repository;

import com.getinsured.domain.Rule_Payment_Agent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Rule_Payment_Agent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Rule_Payment_AgentRepository extends JpaRepository<Rule_Payment_Agent, Long> {

}
