package com.israelsoares.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

// @Table(name="nomeTabelaCasoSejaDiferenteDaClasse")
@Data
@Entity
@SQLDelete(sql = "UPDATE Course SET status = 'Inativo' WHERE id = ?")
@Where(clause = "status = 'Ativo'")
public class Course {

    // @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")//Transforma de id> _id(enviando) e de _id to id(recebendo)
    private long id;

    // @Column(name="nome")
    @NotNull
    @NotBlank
    @Length(min = 3, max = 50)
    @Column(length = 50, nullable = false)
    private String name;

    @NotNull
    @Length(max = 10)
    @Pattern(regexp = "Back-end|Front-end")
    @Column(length = 12, nullable = false)
    private String category;

    @Column(length = 10, nullable = false)
    @Length(max = 10)
    @NotNull
    @NotBlank
    @Pattern(regexp = "Ativo|Inativo")
    private String status = "Ativo";
}
