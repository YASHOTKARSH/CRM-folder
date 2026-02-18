package com.yash.minicrm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private LocalDate dueDate;

    private String status; // Pending / Completed

    @ManyToOne
    @JoinColumn(name = "deal_id", nullable = false)
    private Deal deal;

    @ManyToOne
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

}
