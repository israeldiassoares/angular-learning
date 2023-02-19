package com.israelsoares.crudspring.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

// @Table(name="nomeTabelaCasoSejaDiferenteDaClasse")
@Data
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    // @Column(name="nome")
    @Column(length = 200, nullable=false)
    private String name;

    @Column(length = 12, nullable=false)
    private String category;
}
