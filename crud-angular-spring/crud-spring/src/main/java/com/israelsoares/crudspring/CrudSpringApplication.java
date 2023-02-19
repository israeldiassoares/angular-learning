package com.israelsoares.crudspring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.israelsoares.crudspring.model.Course;
import com.israelsoares.crudspring.repository.CourseRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	// Spring inicializou, vai executar a lógica que tem dentro desse @bean
	// (avisando q spring gerencie todo o ciclo de vida)
	@Bean
	CommandLineRunner initDataBase(CourseRepository courseRepository){
		return args -> {
			courseRepository.deleteAll();

			Course newCourse = new Course();

			newCourse.setName("Angular Spring");

			newCourse.setCategory("Front-End");

			courseRepository.save(newCourse);
		};
	}
}
