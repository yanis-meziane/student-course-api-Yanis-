const request = require('supertest');
const app = require('../../src/app');
const storage = require('../../src/services/storage');

beforeEach(() => {
    storage.reset();
    storage.seed();
});

// Essaie de créer un étudiant sans nom 

describe('POST /students - Validation errors', () => {
    test('should return 400 if name is missing', async () => {
        const res = await request(app)
            .post('/students')
            .send({ email: 'test@test.com' });
    
        expect(res.status).toBe(400);
        expect(res.body.error).toContain('name');
    });

    //Test pour pour créer un étudiant sans mail

    test('should return 400 if email is missing', async () => {
        const res = await request(app)
            .post('/students')
            .send({ name: 'John Doe' });
    
        expect(res.status).toBe(400);
        expect(res.body.error).toContain('email');
    });
});

describe('DELETE /students/:id - Error cases', () => {
    test('should return 404 if student does not exist', async () => {
        const res = await request(app).delete('/students/9999');
    
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Student not found');
    });

    test('should return 400 if student is enrolled in a course', async () => {

        // 1. Créer étudiant et cours

        const studentRes = await request(app)
            .post('/students')
            .send({ name: 'Alice', email: 'alice@test.com' });
        const studentId = studentRes.body.id;

        const courseRes = await request(app)
            .post('/courses')
            .send({ title: 'Biology', teacher: 'Dr. Smith' });
        const courseId = courseRes.body.id;

        // 2. Inscrire l'étudiant

        await request(app).post(`/courses/${courseId}/students/${studentId}`);

        // 3. Essayer de supprimer l'étudiant

        const res = await request(app).delete(`/students/${studentId}`);
    
        expect(res.status).toBe(400);
        expect(res.body.error).toContain('enrolled in a course');
    });
});

//Test de créer un étudiant avec un mail déjà utilisé par un autre étudiant. 

describe('PUT /students/:id - Update validation', () => {
    test('should return 400 if new email already exists', async () => {

        // 1. Créer deux étudiants
        const student1 = await request(app)
            .post('/students')
            .send({ name: 'Bob', email: 'bob@test.com' });
    
        const student2 = await request(app)
            .post('/students')
            .send({ name: 'Carol', email: 'carol@test.com' });

        // 2. Essayer de changer l'email de student2 pour celui de student1

        const res = await request(app)
            .put(`/students/${student2.body.id}`)
            .send({ email: 'bob@test.com' }); // Email déjà pris
    
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Email must be unique');
    });
});