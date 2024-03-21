package com.example.school.model;

public class Student {
    int studentId;
    String studentName;
    String gender;
    String standard;

    public Student(int studentId, String studentName, String gender, String standard) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.gender = gender;
        this.standard = standard;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getStudentId() {
        return this.studentId;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentName() {
        return this.studentName;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getGender() {
        return this.gender;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public String getStandard() {
        return this.standard;
    }

}