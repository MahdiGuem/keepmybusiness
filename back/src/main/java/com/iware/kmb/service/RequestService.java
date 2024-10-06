package com.iware.kmb.service;

import com.iware.kmb.entity.Client;
import com.iware.kmb.entity.ContentCard;
import com.iware.kmb.entity.Request;
import com.iware.kmb.repository.ClientRepository;
import com.iware.kmb.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RequestService {
    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

public ResponseEntity<Request> updateRequest(String requestId, String newStatus) {
    Query query = new Query(Criteria.where("id").is(requestId));
    Update update = new Update().set("requestStatus", newStatus);
    Request updatedRequest = mongoTemplate.findAndModify(query, update, 
        new FindAndModifyOptions().returnNew(true), Request.class);

    if (updatedRequest == null) {
        return ResponseEntity.notFound().build();
    }
    if (newStatus.equals("approved")) {
        Client client = new Client();
        client.setFullName(updatedRequest.getFullName());
        client.setBirthDate(updatedRequest.getBirthDate());
        client.setPersonalEmail(updatedRequest.getPersonalEmail());
        client.setBusinessEmail(updatedRequest.getBusinessEmail());
        client.setAbout(updatedRequest.getAbout());
        client.setPassword(UUID.randomUUID().toString().substring(0, 8));
        clientRepository.save(client);
        requestRepository.deleteById(requestId);
        return ResponseEntity.ok(updatedRequest);
    }
    requestRepository.deleteById(requestId);
    return ResponseEntity.ok(updatedRequest);
}


    public ResponseEntity<String> deleteRequest(String requestId) {
        requestRepository.deleteById(requestId);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<List<Request>> getAllRequest() {
        return ResponseEntity.ok(requestRepository.findAll());
    }

    public ResponseEntity<Request>  createRequest(Request request) {
        return ResponseEntity.ok(requestRepository.save(request));
    }

}
