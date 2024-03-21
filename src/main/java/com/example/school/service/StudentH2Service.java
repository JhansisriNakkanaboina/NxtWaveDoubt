package com.example.school.service;

import com.example.school.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.example.school.model.*;
import com.example.school.repository.*;
import java.util.ArrayList;

@Service
public class StudentH2Service implements StudentRepository {

    @Autowired
    private JdbcTemplate db;

    @Override
    public ArrayList<Student> getAllStudents() {
        return new ArrayList<>(db.query("select * from student", new StudentRowMapper()));
    }

    @Override
    public Student getStudentById(int studentId) {
        // try {
        return db.queryForObject("select * from student where studentid = ?", new StudentRowMapper(), studentId);
        // } catch (Exception e) {
        // throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        // }
    }

    @Override
    public int postStudents(ArrayList<Student> students) {
        int count = 0;
        for (Student student : students) {
            db.update("insert into student(studentname, gender, standard) values(?, ?, ?)", 
                    student.getStudentName(), student.getGender(), student.getStandard());
            count++;
        }
        return count;
    }


    @Override
    public Student putStudent(int studentId, Student student) {
        if (student.getGender() != null) {
            db.update("update student set gender = ? where studentid = ?", student.getGender(), studentId);
        }

        if (student.getStandard() != null) {
            db.update("update student set standard = ? where studentid = ?", student.getStandard(), studentId);
        }

        if (student.getStudentName() != null) {
            db.update("update student set studentname = ? where studentid = ?", student.getStudentName(), studentId);
        }

        return getStudentById(studentId);
    }

    @Override
    public void deleteStudent(int studentId) {
        db.update("delete from student where studentid = ?", studentId);
    }
}