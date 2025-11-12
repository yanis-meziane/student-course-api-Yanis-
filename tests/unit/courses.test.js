// Test pour retourner si un étudiant a été assigné dans un cours 

const storage = require('../../src/services/storage');

test('Should be in a course', () => {
    const course1 = storage.create('courses', {
        title: 'SVT',
        teacher: 'Else',
    });
    
    const student1 = storage.create('students', { 
        name: 'Student1', 
        email: 'student1@example.com' 
    });
    
    storage.enroll(student1.id, course1.id);
    
    const result = storage.remove('courses', course1.id);
    expect(result.error).toBe('Cannot delete course: students are enrolled');
});