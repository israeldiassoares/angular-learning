package com.israelsoares.crudspring.controller;

import com.israelsoares.crudspring.model.Course;
import com.israelsoares.crudspring.services.CourseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/courses")
// @AllArgsConstructor Fazer injecao de dependencai vai lombok
// @Component para gerencie o ciclo de vida como um componente
public class CourseController {

    // @Autowired fazer injeção de dependencia (usar o objeto sem se preocupar com a
    // implementacao) ou DI via setters
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public @ResponseBody List<Course> list() {
        //public @ResponseBody List<Course> list() a lista é um response body e essa éa marcação no spring FasterXML responsável pelo Marshalling and Unmarshalling
        return courseService.list();
    }

    @GetMapping("/{id}")
    public Course findById(@PathVariable @NotNull @Positive Long id) {
        return courseService.findById(id);
    }

    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping //@RequestMapping(method = RequestMethod.POST)
    public Course create(@RequestBody @Valid Course course) {
        // public ResponseEntity<Course> create(@RequestBody Course course)
        //System.out.println(course.getName());
        //return ResponseEntity.status(HttpStatus.CREATED).body(courseRepository.save(course));
        return courseService.create(course);
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable @NotNull @Positive Long id, @RequestBody @Valid Course course) {
        return courseService.update(id, course);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable @NotNull @Positive Long id) {
        if (courseService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
