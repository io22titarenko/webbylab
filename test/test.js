const supertest = require('supertest');
const { expect } = require('chai');
const URL = 'http://127.0.0.1:8082/api';

describe('CREATE, UPDATE, GET and DELETE a film', () => {
    it('CREATE a film without body', async () => {
        await supertest(URL)
            .post(`/film`)
            .set('Content-Type', 'application/json')
            .expect(422);
    });
    it('CREATE a film with body', async () => {
        let {body} = await supertest(URL)
            .post(`/film`)
            .send({title: `Green Mile ${Math.random()*1000}`, year: 1999, format: 'DVD', stars: ['Tom Hanks']})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);
        expect(body).to.be.an('object').and.not.empty;
        expect(body.id).to.be.a('number');
        id = body.id;
        title = body.title;
        year = body.year;
        format = body.format;
        stars = body.stars;
    });
    it(`GET all films`, async () => {
        let {body} = await supertest(URL)
            .get(`/film`)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(body).to.be.an('array').and.not.empty;
    });
    it(`GET film for just created item`, async () => {
        let {body} = await supertest(URL)
            .get(`/film/${id}`)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(body).to.be.an('object').and.not.empty;
        expect(body.title).to.be.a('string').to.be.eq(title);
        expect(body.year).to.be.a('number').to.be.eq(year);
        expect(body.format).to.be.a('string').to.be.eq(format)
        expect(body.stars).to.be.an('array');
        expect(body.id).to.be.a('number').and.to.be.eq(id);
    });
    it(`GET film with unknown Id /filml/0`, async () => {
        await supertest(URL)
            .get(`/film/0`)
            .set('Content-Type', 'application/json')
            .expect(404);
    });
    it('DELETE created item', async () => {
        await supertest(URL)
            .delete(`/film/${id}`)
            .expect(200);
    });
    it('CHECK if still exists deleted item', async () => {
        await supertest(URL)
            .get(`/film/${id}`)
            .set('Content-Type', 'application/json')
            .expect(404);
    });
});
