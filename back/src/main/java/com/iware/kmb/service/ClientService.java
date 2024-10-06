package com.iware.kmb.service;

import com.iware.kmb.entity.Client;
import com.iware.kmb.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public ResponseEntity<List<Client>> getAllClient(){
        return ResponseEntity.ok(clientRepository.findAll());
    }

    public ResponseEntity<Client>  createClient(Client client) {
        return ResponseEntity.ok(clientRepository.save(client));
    }

    public ResponseEntity<Client> updateClient(Client clientDetails) throws Exception {
        try {
            Client client = clientRepository.findClientById(clientDetails.getId());
            System.out.println(clientDetails);
            client.setFullName(clientDetails.getFullName());
            client.setBirthDate(clientDetails.getBirthDate());
            client.setPersonalEmail(clientDetails.getPersonalEmail());
            client.setBusinessEmail(clientDetails.getBusinessEmail());
            client.setAbout(clientDetails.getAbout());
            client.setPassword(clientDetails.getPassword());
            return ResponseEntity.ok(clientRepository.save(client));
        }
        catch (Exception e) {
            throw new Exception("Client not found", e);
        }
    }

    public ResponseEntity<String> deleteClient(String clientId) {
        clientRepository.deleteById(clientId);
        return ResponseEntity.ok().build();
    }

}
