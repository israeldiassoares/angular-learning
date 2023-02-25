package com.israelsoares.crudspring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.israelsoares.crudspring.model.Course;
import com.israelsoares.crudspring.repository.CourseRepository;

@RestController
@RequestMapping("/api/courses")
// @AllArgsConstructor Fazer injecao de dependencai vai lombok
// @Component para gerencie o ciclo de vida como um componente
public class CourseController {

    // @Autowired fazer injeção de dependencia (usar o objeto sem se preocupar com a
    // implementacao) ou DI via setters
    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // @RequestMapping(method = RequestMethod.GET) msm coisa que o GetMapping
    @GetMapping
    public @ResponseBody List<Course> list() {
        //public @ResponseBody List<Course> list() a lista é um response body e essa éa marcação no spring FasterXML responsável pelo Marshalling and Unmarshalling
        return courseRepository.findAll();
    };
  //  “Unmarshalling” is the process of converting some kind of a lower-level representation, often a “wire format”, into a higher-level (object) structure. Other popular names for it are “Deserialization” or “Unpickling”.

    @GetMapping("/{id}")
    public ResponseEntity<Course> findById(@PathVariable Long id){
      return courseRepository.findById(id)
              .map(recordFound -> ResponseEntity.ok().body(recordFound))
              .orElse(ResponseEntity.notFound().build());
    };

    @PutMapping("/{id}")
    public ResponseEntity<Course> update(@PathVariable Long id, @RequestBody Course course) {
    return courseRepository.findById(id).map( recordFound -> {
        recordFound.setName(course.getName());
        recordFound.setCategory(course.getCategory());
        Course updateCourse = courseRepository.save(recordFound);
        return ResponseEntity.ok().body(updateCourse);
    }).orElse(ResponseEntity.notFound().build());
    };
    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping //@RequestMapping(method = RequestMethod.POST)
    public Course create(@RequestBody Course course) {
        // public ResponseEntity<Course> create(@RequestBody Course course)
        //System.out.println(course.getName());
       //return ResponseEntity.status(HttpStatus.CREATED).body(courseRepository.save(course));
        return courseRepository.save(course);
    };
}

