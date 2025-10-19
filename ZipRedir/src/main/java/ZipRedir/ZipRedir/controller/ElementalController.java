package ZipRedir.ZipRedir.controller;

import ZipRedir.ZipRedir.model.Elemental;
import ZipRedir.ZipRedir.service.ElementalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.Map;

@RestController
public class ElementalController {

    private final String BASE_URL = "http://localhost:8080/";

    @Autowired
    private ElementalService elementalService;

    @PostMapping("/api/shorten")
    public Map<String, String> shorten(@RequestBody Map<String, String> body){
        String origin = body.get("origin");
        Elemental elemental = elementalService.createShortLink(origin);
        return Map.of("shortUrl", BASE_URL + elemental.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Void> redirect(@PathVariable String id){
        String origin = elementalService.resolve(id);
        return ResponseEntity.status(HttpStatus.FOUND)
            .location(URI.create(origin))
            .build();
    }
}