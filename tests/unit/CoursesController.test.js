const request = require('supertest');
const app = require('../../src/app');
const storage = require('../../src/services/storage');

beforeEach(() => {
    storage.reset();
    storage.seed();
});

// Test de création d'un cours sans avoir mis un titre 

describe('POST /courses - Validation errors', () => {
    test('should return 400 if title is missing', async () => {
        const res = await request(app)
            .post('/courses')
            .send({ teacher: 'Mister X' }); 
    
        expect(res.status).toBe(400);
        expect(res.body.error).toContain('title');
    });

    // Test de création d'un cours sans avoir mis le nom d'un professeur 

    test('should return 400 if teacher is missing', async () => {
        const res = await request(app)
            .post('/courses')
            .send({ title: 'Test Course' }); 
    
        expect(res.status).toBe(400);
        expect(res.body.error).toContain('teacher');
    });
});

//Suppression d'un cours qui n'existe pas 
describe('DELETE /courses/:id - Error cases', () => {
    test('should return 404 if course does not exist', async () => {
        const res = await request(app).delete('/courses/6');
    
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Course not found');
    });

    test('should return 400 if course has enrolled students', async () => {

        // 1. Créer un cours et un étudiant

        const courseRes = await request(app)
            .post('/courses')
            .send({ title: 'Math 101', teacher: 'Prof. X' });
        const courseId = courseRes.body.id;

        const studentRes = await request(app)
            .post('/students')
            .send({ name: 'John', email: 'john@test.com' });
        const studentId = studentRes.body.id;

        // 2. Inscrire l'étudiant au cours
        await request(app).post(`/courses/${courseId}/students/${studentId}`);

        // 3. Essayer de supprimer le cours
        const res = await request(app).delete(`/courses/${courseId}`);
    
        expect(res.status).toBe(400);
        expect(res.body.error).toContain('students are enrolled');
    });
});

describe('PUT /courses/:id - Update validation', () => {
    test('should return 400 if new title already exists', async () => {

        // 1. Créer deux cours

        const course1 = await request(app)
            .post('/courses')
            .send({ title: 'Math', teacher: 'Prof. A' });
    
        const course2 = await request(app)
            .post('/courses')
            .send({ title: 'Physics', teacher: 'Prof. B' });

        // 2. Essayer de renommer un cours avec un cours qui existe déjà 

        const res = await request(app)
            .put(`/courses/${course2.body.id}`)
            .send({ title: 'Math' }); 
    
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Course title must be unique');
    });
});