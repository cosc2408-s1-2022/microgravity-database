package com.rmit.mgdb.model;

import lombok.Getter;
import lombok.Setter;

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
@Table(name = "\"user\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    @NotBlank(message = "Username cannot be blank.")
    private String username;
    @NotBlank(message = "Password cannot be blank.")
    private String password;
    @NotBlank(message = "User needs to have a role defined.")
    @Pattern(regexp = "(^ROLE_USER|ROLE_ADMIN)", message = "Not a valid role.")
    private String role;
    // The following fields are for debugging purposes only.
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
