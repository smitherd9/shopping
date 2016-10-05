var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);





// describe('Shopping List', function() {
//     it('should list items on get');
//     it('should add an item on post');
//     it('should edit an item on put');
//     it('should delete an item on delete');
//     it('should add item to id on post');
//     it('should post without body data');
//     it('should not need valid json on post');
//     it('should not need id in input on put');
//     it('should be able to use different id in input than body on put');
//     it('should use id that does not exist on put');
//     it('should not need body data on put');
//     it('should not need valid json on put');
//     it('should remove id that does not exist on delete');
//     it('should remove without id in endpoint on delete');
    
// });



describe('Shopping List', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
   
    



 it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Kale');
                done();
            });
        });
            
 it('should delete an item on delete', function(done){
     chai.request(app)
     .delete('/items/:id')
     .send({id: 1})
     .end(function(err, res){
         should.equal(err, null);
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.have.property('name');
         res.body.should.have.property('id');
         res.body.id.should.be.a('number');
         res.body.name.should.be.a('string');
         res.body.id.should.equal(1);
         storage.items.should.be.a('array');
         storage.items.should.have.length(2);
         done();
     });
     
     
     
    });
    
    it('should edit an item on put', function(done) {
    chai.request(app)
     .put('/items/:id')
     .send({id : 1})
     .end(function(err, res){
         should.equal(err, null);
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.have.property('name');
         res.body.should.have.property('id');
         res.body.id.should.be.a('number');
         res.body.name.should.be.a('string');
         res.body.id.should.equal(1);
         storage.items.should.be.a('array');
         storage.items.should.have.length(3);
         done();
             
         });
     });

});