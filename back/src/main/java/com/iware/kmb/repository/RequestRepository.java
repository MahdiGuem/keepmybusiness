package com.iware.kmb.repository;

import com.iware.kmb.entity.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends MongoRepository<Request, String> {
    public Page<Request> findAll(Pageable pageable);
    public Request findClientById(String requestId);

}
