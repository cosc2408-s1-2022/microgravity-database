package com.rmit.mgdb.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Date;

/**
 * User JPA entity to represent the user data model.
 */
@Entity
@Getter
@Setter
// Table name enclosed with quotes as some database flavours have "user" as a reserved keyword.
@Indexed
@Table(name = "\"user\"")
public class User {

    @Id
    // Automatically generate ids.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Do not serialise if value is null.
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long id;

    @Column(unique = true)
    @NotBlank(message = "Username cannot be blank.")
    @FullTextField(analyzer = "non_edge_index_analyzer", searchAnalyzer = "search_analyzer")
    private String username;

    @NotBlank(message = "Password cannot be blank.")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String password;

    @NotBlank(message = "User needs to have a role defined.")
    @Pattern(regexp = "(^ROLE_USER|ROLE_ADMIN)", message = "Not a valid role.")
    @FullTextField(analyzer = "non_edge_index_analyzer", searchAnalyzer = "search_analyzer")
    private String role;

    private Date createdAt;
    private Date updatedAt;

    /**
     * Saves the timestamp of creation.
     */
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    /**
     * Updates the timestamp of modification.
     */
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    /**
     * Enum to identify the different user roles.
     */
    public enum UserRole {
        USER("ROLE_USER"),
        ADMIN("ROLE_ADMIN");

        public final String string;

        UserRole(String string) {
            this.string = string;
        }
    }

}
