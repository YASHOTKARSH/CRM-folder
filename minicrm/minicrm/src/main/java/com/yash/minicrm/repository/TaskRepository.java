package com.yash.minicrm.repository;

import com.yash.minicrm.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByDealId(Long dealId);
    List<Task> findByDealIdAndOrganizationId(Long dealId, Long orgId);
    Optional<Task> findByIdAndOrganizationId(Long id, Long orgId);

}
