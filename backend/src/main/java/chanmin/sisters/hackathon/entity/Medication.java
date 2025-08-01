package chanmin.sisters.hackathon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "medication")
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medi_id;

    private String name;

    @Column(columnDefinition = "TEXT") // 긴 본문 내용
    private String explaination;
}
