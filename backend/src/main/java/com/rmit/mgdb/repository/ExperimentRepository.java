package com.rmit.mgdb.repository;

import com.rmit.mgdb.model.Experiment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperimentRepository extends JpaRepository<Experiment, Long> {

    String SEARCH_QUERY_PART = "WHERE " +
                               "( " +
                               "    lead_institution LIKE CONCAT('%',:s,'%') OR " +
                               "    platform LIKE CONCAT('%',:s,'%') OR " +
                               "    principal_investigator LIKE CONCAT('%',:s,'%') OR " +
                               "    title LIKE CONCAT('%',:s,'%') OR " +
                               "    toa LIKE CONCAT('%',:s,'%') OR " +
                               "    mission_id LIKE CONCAT('%',:s,'%') " +
                               ") " +
                               "ORDER BY " +
                               "    INSTR(lead_institution, :s)," +
                               "    INSTR(platform, :s)," +
                               "    INSTR(principal_investigator, :s)," +
                               "    INSTR(title, :s)," +
                               "    INSTR(toa, :s), " +
                               "    INSTR(mission_id, :s) " +
                               "COLLATE utf8mb4_unicode_ci";

    @Query(value = "SELECT * FROM experiment " + SEARCH_QUERY_PART,
           countQuery = "SELECT COUNT(*) FROM experiment " + SEARCH_QUERY_PART,
           nativeQuery = true
    )
    Page<Experiment> searchByString(@Param("s") String string, Pageable page);

}
