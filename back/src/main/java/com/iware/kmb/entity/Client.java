package com.iware.kmb.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Client {
    @Id
    private String id;
    private String fullName;
    private Date birthDate;
    private String personalEmail;
    private String businessEmail;
    private String password;
    private String about;
}
