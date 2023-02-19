package com.israelsoares.crudspring.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.israelsoares.crudspring.repository.CourseRepository;

@RestController
@RequestMapping("/api/courses")

// @Component para gerencie o ciclo de vida como um componente
public class CourseController {

    private CourseRepository courseRepository;

    // @RequestMapping(method = RequestMethod.GET) msm coisa que o GetMapping
    @GetMapping
    public List<Course> list() {
        return null;
    };
}
