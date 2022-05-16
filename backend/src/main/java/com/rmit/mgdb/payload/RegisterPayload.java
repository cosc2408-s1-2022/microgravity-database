package com.rmit.mgdb.payload;

import com.rmit.mgdb.model.Person;
import com.rmit.mgdb.model.User;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class RegisterPayload {

    @NotNull
    @Valid
    private User user;
    private Person person;

}
