package com.getinsured.repository;

import com.getinsured.domain.Enrollment_Payment_MetaData;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Enrollment_Payment_MetaData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Enrollment_Payment_MetaDataRepository extends JpaRepository<Enrollment_Payment_MetaData, Long> {

}
