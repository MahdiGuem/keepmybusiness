package com.iware.kmb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.iware.kmb.entity.Admin;
import com.iware.kmb.repository.AdminRepository;
import com.iware.kmb.utils.JwtService;


@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public ResponseEntity<Object> login(Admin admin) {
        Admin user = adminRepository.findByEmail(admin.getEmail());
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        else {
            if (passwordEncoder.matches(admin.getPassword(), user.getPassword())) {
                String token = jwtService.generateToken(admin.getEmail());
                return ResponseEntity.ok(token);
            }
            else {
                return ResponseEntity.status(401).build();
            }
        }
    }

    public ResponseEntity<Object> register(Admin admin) {
        Admin user = adminRepository.findByEmail(admin.getEmail());
        if (user != null) {
            return ResponseEntity.status(409).build();
        }
        else {
            admin.setPassword(passwordEncoder.encode(admin.getPassword()));
            return ResponseEntity.ok(adminRepository.save(admin));
        }
    }

}
