package ZipRedir.ZipRedir.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Elemental {
    @Id
    private String id; //url acortada
    @Column(nullable = false) 
    private String origin; //url original

    public Elemental(){}

    public Elemental(String id, String origin){
        this.id = id;
        this.origin = origin;
    }

    public String getId(){
        return id;
    }

    public String getOrigin(){
        return origin;
    }

    public void setId(String id){
        this.id = id;
    }
    
    public void setOrigin(String origin){
        this.origin = origin;
    }

}