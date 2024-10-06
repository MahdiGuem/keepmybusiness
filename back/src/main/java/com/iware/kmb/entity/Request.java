package com.iware.kmb.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Request {
    @Id
    private String id;
    private String fullName;
    private Date birthDate;
    private String personalEmail;
    private String businessEmail;
    private String about;
    private String requestStatus;


}
