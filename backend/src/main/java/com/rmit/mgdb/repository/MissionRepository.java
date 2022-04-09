package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface MissionRepository extends JpaRepository<Mission, String> {

    List<Mission> findAllByPlatform_Name(String name);

    List<Mission> findAllByPlatform_NameAndLaunchDateAfter(String name, Date startDate);

    List<Mission> findAllByPlatform_NameAndLaunchDateBefore(String name, Date endDate);

    List<Mission> findAllByPlatform_NameAndLaunchDateAfterAndLaunchDateBefore(String name, Date startDate, Date endDate);

}
