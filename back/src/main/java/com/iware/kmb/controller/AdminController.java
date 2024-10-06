package com.iware.kmb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iware.kmb.entity.Admin;
import com.iware.kmb.service.AdminService;

@CrossOrigin()
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Admin admin) {
        return adminService.login(admin);
    }
    
    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody Admin admin) {
        return adminService.register(admin);
    }
    
    
    
}