package com.getinsured.repository;

import com.getinsured.domain.Rule_Payment_Carrier;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Rule_Payment_Carrier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Rule_Payment_CarrierRepository extends JpaRepository<Rule_Payment_Carrier, Long> {

}
