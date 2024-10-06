package com.iware.kmb.controller;

import com.iware.kmb.entity.Client;
import com.iware.kmb.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/client")
public class ClientController {

    @Autowired
    ClientService clientService;

    @PostMapping("/new")
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        return clientService.createClient(client);
    }
    @GetMapping("")
    public ResponseEntity<List<Client>> getAllClient() {
        return clientService.getAllClient();
    }

    @PostMapping("")
    public ResponseEntity<Client> updateClient(@RequestBody Client client) throws Exception {
        return clientService.updateClient(client);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable String id){
        return clientService.deleteClient(id);
    }


}
