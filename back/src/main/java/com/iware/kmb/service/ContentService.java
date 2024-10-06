package com.iware.kmb.service;

import com.iware.kmb.entity.Client;
import com.iware.kmb.entity.ContentCard;
import com.iware.kmb.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {
    @Autowired
    ContentRepository contentRepository;

    public ResponseEntity<List<ContentCard>> getAllContent() {
        return ResponseEntity.ok(contentRepository.findAll());
    }
    public ResponseEntity<List<ContentCard>> updateContent(List<ContentCard> contentCards) {
        contentRepository.deleteAll();
        contentRepository.insert(contentCards);
        return ResponseEntity.ok(contentCards);
    }

    public ResponseEntity<ContentCard>  createContentCard(ContentCard contentCard) {
        return ResponseEntity.ok(contentRepository.save(contentCard));
    }
}
