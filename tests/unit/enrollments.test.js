const request = require('supertest');
const app = require('../../src/app');
const storage = require('../../src/services/storage');

beforeEach(() => {
    storage.reset();
    storage.seed();
});

//Test pour trouver un étudiant dans un cours 

describe('POST /courses/:courseId/students/:studentId - Enrollment', () => {
    test('should return 400 if student does not exist', async () => {
        const res = await request(app).post('/courses/1/students/4');
    
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Student not found');
    });

    // Test pour trouver un cours 
    
    test('should return 400 if course does not exist', async () => {
        const res = await request(app).post('/courses/7/students/1');
    
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Course not found');
    });

    test('should return 400 if student already enrolled', async () => {
    // 1. Première inscription
        await request(app).post('/courses/1/students/1');
    
        // 2. Deuxième inscription (devrait échouer)
        const res = await request(app).post('/courses/1/students/1');
    
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Student already enrolled in this course');
    });

    test('should return 400 if course is full (>3 students)', async () => {
    // Remplir le cours avec 3 étudiants
        await request(app).post('/courses/1/students/1');
        await request(app).post('/courses/1/students/2');
        await request(app).post('/courses/1/students/3');
    
        // Créer un 4ème étudiant
        const student4 = await request(app)
            .post('/students')
            .send({ name: 'David', email: 'david@test.com' });
    
        // Essayer de l'inscrire (devrait échouer)
        const res = await request(app)
            .post(`/courses/1/students/${student4.body.id}`);
    
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Course is full');
    });
});

describe('DELETE /courses/:courseId/students/:studentId - Unenrollment', () => {
    test('should return 404 if enrollment does not exist', async () => {
        const res = await request(app).delete('/courses/1/students/1');
    
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Enrollment not found');
    });

    test('should successfully unenroll student', async () => {
    // 1. Inscrire l'étudiant
        await request(app).post('/courses/1/students/1');
    
        // 2. Désinscrire l'étudiant
        const res = await request(app).delete('/courses/1/students/1');
    
        expect(res.status).toBe(204);
    });
});