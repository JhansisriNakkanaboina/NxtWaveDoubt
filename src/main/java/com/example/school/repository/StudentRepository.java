package com.example.school.repository;

import com.example.school.model.*;
import java.util.*;

public interface StudentRepository {
    ArrayList<Student> getAllStudents();

    Student getStudentById(int studentId);

    int postStudents(ArrayList<Student> students);

    Student putStudent(int studentId, Student student);

    void deleteStudent(int studentId);
}