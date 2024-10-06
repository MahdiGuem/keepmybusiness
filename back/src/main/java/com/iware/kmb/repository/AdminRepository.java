package com.iware.kmb.repository;

import com.iware.kmb.entity.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    public Admin findByEmail(String email);
}
