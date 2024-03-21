package com.example.school.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.school.model.Student;
import com.example.school.service.*;
import java.util.*;

@RestController
public class StudentController {
    @Autowired
    public StudentH2Service studentH2Service;

    @GetMapping("/students")
    public ArrayList<Student> getAllStudents() {
        return studentH2Service.getAllStudents();
    }

    @GetMapping("/students/{studentId}")
    public Student getStudentById(@PathVariable("/studentId") int studentId) {
        return studentH2Service.getStudentById(studentId);
    }

    @PostMapping("/students")
    public String postStudents(@RequestBody ArrayList<Student> students) {
        int count = studentH2Service.postStudents(students);
        return "Successfully added " + count + " students";
    }

    @PutMapping("/students/{studentId}")
    public Student putStudent(@PathVariable("studentId") int studentId, @RequestBody Student student) {
        return studentH2Service.putStudent(studentId, student);
    }

    @DeleteMapping("/students/{studentId}")
    public void deleteStudent(@PathVariable("studentId") int studentId) {
        studentH2Service.deleteStudent(studentId);
    }
}