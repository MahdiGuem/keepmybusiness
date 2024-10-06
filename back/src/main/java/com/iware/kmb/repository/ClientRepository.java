package com.iware.kmb.repository;

import com.iware.kmb.entity.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository  extends MongoRepository<Client, String> {
    public Page<Client> findAll(Pageable pageable);
    public Client findClientById(String clientId);
}
