package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Mission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {

    Page<Mission> findMissionsBy(Pageable pageable);

    List<Mission> findAllByApprovedAndDeletedNot(boolean approved, boolean deleted);

    Optional<Mission> findByIdAndApprovedAndDeletedNot(Long id, boolean approved, boolean deleted);

}
