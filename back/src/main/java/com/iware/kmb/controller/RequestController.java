package com.iware.kmb.controller;

import com.iware.kmb.dto.RequestUpdate;
import com.iware.kmb.entity.Client;
import com.iware.kmb.entity.Request;
import com.iware.kmb.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin()
@RestController
@RequestMapping("/request")
public class RequestController {

    @Autowired
    RequestService requestService;

    @GetMapping("")
    public ResponseEntity<List<Request>> getAllRequest() {
        return requestService.getAllRequest();
    }

    @PostMapping("")
    public ResponseEntity<Request> updateRequest(@RequestBody RequestUpdate requestUpdate) {
        return requestService.updateRequest(requestUpdate.getRequestId(), requestUpdate.getNewStatus());
}

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRequest(@PathVariable String id){
        return requestService.deleteRequest(id);
    }

    @PostMapping("/new")
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        return requestService.createRequest(request);
    }
}
