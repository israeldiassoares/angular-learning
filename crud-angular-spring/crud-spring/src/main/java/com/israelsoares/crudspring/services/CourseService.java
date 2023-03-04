package com.israelsoares.crudspring.services;

import com.israelsoares.crudspring.exception.RecordNotFoundException;
import com.israelsoares.crudspring.model.Course;
import com.israelsoares.crudspring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Validated
@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // @RequestMapping(method = RequestMethod.GET) msm coisa que o GetMapping
    public List<Course> list() {
        //public @ResponseBody List<Course> list() a lista é um response body e essa éa marcação no spring FasterXML responsável pelo Marshalling and Unmarshalling
        return courseRepository.findAll();
    }
    //  “Unmarshalling” is the process of converting some kind of a lower-level representation, often a “wire format”, into a higher-level (object) structure. Other popular names for it are “Deserialization” or “Unpickling”.

    public Course findById(@PathVariable @NotNull @Positive Long id) {
        return courseRepository.findById(id).orElseThrow(()-> new RecordNotFoundException(id));
    }

    public Course create(@Valid Course course) {
        // public ResponseEntity<Course> create(@RequestBody Course course)
        //System.out.println(course.getName());
        //return ResponseEntity.status(HttpStatus.CREATED).body(courseRepository.save(course));
        return courseRepository.save(course);
    }

    @ResponseStatus(HttpStatus.OK)
    public Course update(@NotNull @Positive Long id, @Valid Course course) {
        return courseRepository.findById(id).orElseThrow( () -> new RecordNotFoundException(id));
    }

    public boolean delete(@PathVariable @NotNull @Positive Long id) {
        return courseRepository.findById(id).map(recordFound -> {
            courseRepository.deleteById(id);
            return true;
        }).orElse(false);
    }

}
