package com.getinsured.repository;

import com.getinsured.domain.Enrollment_Commission;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Enrollment_Commission entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Enrollment_CommissionRepository extends JpaRepository<Enrollment_Commission, Long> {

}
