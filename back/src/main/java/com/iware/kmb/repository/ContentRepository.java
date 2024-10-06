package com.iware.kmb.repository;

import com.iware.kmb.entity.ContentCard;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepository extends MongoRepository<ContentCard, String> {
    public List<ContentCard> findAll();

}
