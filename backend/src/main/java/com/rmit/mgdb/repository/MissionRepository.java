package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Mission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {

    Page<Mission> findMissionsBy(Pageable pageable);

}
