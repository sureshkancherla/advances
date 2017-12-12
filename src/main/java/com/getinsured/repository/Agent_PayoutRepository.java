package com.getinsured.repository;

import com.getinsured.domain.Agent_Payout;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Agent_Payout entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Agent_PayoutRepository extends JpaRepository<Agent_Payout, Long> {

}
