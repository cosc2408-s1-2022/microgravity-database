package com.rmit.mgdb.repository;

import com.rmit.mgdb.payload.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.rmit.mgdb.util.Constants.DEFAULT_PAGE_SIZE;

@Service
public class CustomSearchQueryExecutor {

    private final EntityManager entityManager;

    @Autowired
    public CustomSearchQueryExecutor(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    /**
     * Generic method to search all string properties of an entity using custom JPQL queries.
     */
    public <T> SearchResponse<T> search(Class<T> c, String string, Optional<Integer> page, Optional<Integer> size) {
        List<String> fields = new ArrayList<>();
        for (Field field : c.getDeclaredFields()) {
            field.setAccessible(true);
            if (field.getType().isAssignableFrom(String.class)) {
                fields.add(field.getName());
            }
        }

        String className = c.getSimpleName();
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < fields.size(); i++) {
            builder.append(String.format("lower(c.%s) like :regex %s ", fields.get(i),
                                         i == fields.size() - 1 ? "" : "or"));
        }
        TypedQuery<Long> countQuery =
                entityManager.createQuery(String.format("select count(c) from %s c where %s", className, builder),
                                          Long.class);
        countQuery.setParameter("regex", String.format("%%%s%%", string));
        long count = countQuery.getSingleResult();

        builder.append("order by ");
        for (int i = 0; i < fields.size(); i++) {
            builder.append(String.format("locate(:string, lower(c.%s))%s", fields.get(i),
                                         i == fields.size() - 1 ? "" : ", "));
        }

        TypedQuery<T> resultQuery =
                entityManager.createQuery(String.format("select c from %s c where %s", className, builder), c);
        resultQuery.setParameter("regex", String.format("%%%s%%", string));
        resultQuery.setParameter("string", string);
        resultQuery.setFirstResult(page.orElse(0));
        resultQuery.setMaxResults(size.orElse(DEFAULT_PAGE_SIZE));


        List<T> results = resultQuery.getResultList();

        return new SearchResponse<>(count, (long) Math.ceil((double) count / size.orElse(DEFAULT_PAGE_SIZE)),
                                    page.orElse(0), results);
    }

}
