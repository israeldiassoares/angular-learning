package com.israelsoares.crudspring.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    // @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")//Transforma de id> _id(enviando) e de _id to id(recebendo)
    private long id;

    // @Column(name="nome")
    @Column(length = 200, nullable=false)
    private String name;

    @Column(length = 12, nullable=false)
    private String category;
}
