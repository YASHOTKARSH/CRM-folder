package com.yash.minicrm.repository;

import com.yash.minicrm.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DealRepository extends JpaRepository<Deal, Long> {

    List<Deal> findByCustomerId(Long customerId);
    List<Deal> findByOrganizationId(Long orgId);
    List<Deal> findByCustomerIdAndOrganizationId(Long customerId, Long orgId);
    Optional<Deal> findByIdAndOrganizationId(Long id, Long orgId);

}
