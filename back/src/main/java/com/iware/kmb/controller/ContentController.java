package com.iware.kmb.controller;

import com.iware.kmb.entity.ContentCard;
import com.iware.kmb.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/content")
public class ContentController {

    @Autowired
    ContentService contentService;

    @GetMapping("/all")
    public ResponseEntity<List<ContentCard>> getAllContent() {
        return contentService.getAllContent();
    }

    @PostMapping("")
    public ResponseEntity<List<ContentCard>> updateContent(@RequestBody List<ContentCard> contentCards) {
        return contentService.updateContent(contentCards);
    }

    @PostMapping("/new")
    public ResponseEntity<ContentCard> createContentCard(@RequestBody ContentCard contentCard) {
        return contentService.createContentCard(contentCard);
    }
}
