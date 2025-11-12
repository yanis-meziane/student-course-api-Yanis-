const storage = require('../../src/services/storage');

beforeEach(() => {
    storage.reset();
    storage.seed();
});

test('should allow duplicate course title', () => {
    const result = storage.create('courses', {
        title: 'Math',
        teacher: 'Someone',
    });
    expect(result.title).not.toBe('Math');
});

test('should list seeded students', () => {
    const students = storage.list('students');
    expect(students.length).toBe(3);
    expect(students[0].name).toBe('Alice');
});

test('should create a new student', () => {
    const result = storage.create('students', {
        name: 'David',
        email: 'david@example.com',
    });
    expect(result.name).toBe('David');
    expect(storage.list('students').length).toBe(4);
});

test('should not allow duplicate student email', () => {
    const result = storage.create('students', {
        name: 'Eve',
        email: 'alice@example.com',
    });
    expect(result.error).toBe('Email must be unique');
});

test('should delete a student', () => {
    const students = storage.list('students');
    const result = storage.remove('students', students[0].id);
    expect(result).toBe(true);
});

// Remove d'un student

test('should delete unknown student', () => {
    const result = storage.remove('students', 7);
    expect(result).toBe(false);
});

test('should NOT allow more than 3 students in a course', () => {
    const course = storage.list('courses')[0];

    // Créer 4 étudiants
    const student1 = storage.create('students', { name: 'Student1', email: 'student1@example.com' });
    const student2 = storage.create('students', { name: 'Student2', email: 'student2@example.com' });
    const student3 = storage.create('students', { name: 'Student3', email: 'student3@example.com' });
    const student4 = storage.create('students', { name: 'Student4', email: 'student4@example.com' });
    
    // Inscrire les 3 premiers
    storage.enroll(student1.id, course.id);
    storage.enroll(student2.id, course.id);
    storage.enroll(student3.id, course.id);
    
    // Le 4ème ne devrait pas pouvoir s'inscrire
    const result = storage.enroll(student4.id, course.id);
    expect(result.error).toBe('Course is full');
});

// Test pour tenter de supprimer un étudiant dans un cours 

test('Cannot delete student: enrolled in a course', () => {
    const student1 = storage.create('students', { name: 'Student1', email: 'student1@example.com' });
    const course = storage.list('courses')[0]; 
   
    // Inscription des étudiants 
    storage.enroll(student1.id, course.id);
    
    const result = storage.remove('students', student1.id);
    expect(result.error).toBe('Cannot delete student: enrolled in a course');
});

// Test pour tenter de supprimer un étudiant dans un cours 

test('Cannot delete student: enrolled in a course', () => {
    const student1 = storage.create('students', { name: 'Student1', email: 'student1@example.com' });
    const course = storage.list('courses')[0]; 
   
    // Inscription des étudiants 
    storage.enroll(student1.id, course.id);
    
    const result = storage.remove('students', student1.id);
    expect(result.error).toBe('Cannot delete student: enrolled in a course');
});


// Test pour supprimer un cours 

test('Cannot delete course: students are enrolled', () => {
    const course1 = storage.create('courses', {
        title: 'SVT',
        teacher: 'Else',
    });
    
    const student1 = storage.create('students', { 
        name: 'Student1', 
        email: 'student1@example.com' 
    });
    
    // Inscrire l'ÉTUDIANT dans le COURS
    storage.enroll(student1.id, course1.id);
    
    const result = storage.remove('courses', course1.id);
    expect(result.error).toBe('Cannot delete course: students are enrolled');
});