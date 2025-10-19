package ZipRedir.ZipRedir.service;

import ZipRedir.ZipRedir.model.Elemental;
import ZipRedir.ZipRedir.repository.ElementalRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ElementalService {
    @Autowired
    private ElementalRepository elementalRepository;

    public Elemental createShortLink(String origin){
        String shortcode = generateShortCode();
        Elemental elemental = new Elemental(shortcode, origin);
        return elementalRepository.save(elemental);
    }

    public String resolve(String shortcode){
        return elementalRepository.findById(shortcode)
            .map(Elemental::getOrigin)
            .orElseThrow(() -> new RuntimeException("Shortcode not found"));
    }

    private String generateShortCode(){
        String code;
        do{
            code = RandomStringUtils.randomAlphanumeric(6);
        }while(elementalRepository.existsById(code));
        return code;
    }

}