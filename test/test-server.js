process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../bin/www');
var Link = require("../bin/serv/models/links");
var User = require("../bin/serv/models/user");

var should = chai.should();
var token;
var shortlink;

chai.use(chaiHttp);
	
describe('Links', function() {

    Link.collection.remove();
    User.collection.remove();

    // SIGNUP
    it('should add a user', (done) => {
        let user = {
            name: 'vik',
            login: 'vik',
            password: '12345' 
        }
        chai.request(server)
            .post('/userlink/signup')
            .send(user)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('message').eql('Пользователь создан!');
               done();
            });
    });  

    // SIGNUP - err 
    it('not should add a exist user', (done) => {
        let user = {
            name: 'vik',
            login: 'vik',
            password: '12345'
        }
        chai.request(server)
            .post('/userlink/signup')
            .send(user)
            .end((err, res) => {
               res.should.have.status(200);               
               res.should.be.json;
               res.body.should.be.a('object');         
               res.body.should.have.property('success',false);               
               res.body.should.have.property('message','Пользователь с данным логином уже существует!'); 
              done();
            });
    });
        
    // LOGIN - err
    it('should not login in without registering', (done) => {
        let user = {         
            login: 'vera',
            password: '12345',
          }
        chai.request(server)
            .post('/userlink/login')
            .send(user)
            .end((err, res) => {              
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.be.a('object');
               res.body.should.have.property('success',false);    
               res.body.should.have.property('message','Пользователь не найден!'); 
               done();
            });
    });  
      
    // LOGIN
    it('should successfully log in', (done) => {       
        let user = {
          login: 'vik',
          password: '12345'
        }         
        chai.request(server)
            .post('/userlink/login')
            .send(user)
            .end((err, res) => {
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.be.a('object');
               res.body.should.have.property('success',true);    
               res.body.should.have.property('message','Вы успешно прошли авторизацию!');
               res.body.should.have.property('token');
               token = res.body.token;  
               done();
            });
    });  

    // ADD LINK
    it('should add a link of user', (done) => {
        let link = {
            longlink: 'mail.ru',
            description: 'почта',
            click: 0,
            tags: '11,33,',
            token: token
        }
        chai.request(server)
            .post('/userlink/linkcreate')
            .send(link)
            .end((err, res) => {
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.be.a('object');
               res.body.should.have.property('success',true);     
               res.body.should.have.property('message');
               done();
            });
    });    

    // LINKS OF USERS
    it('should get list all links of all users', function(done) {
        chai.request(server)
          .get('/userlink/info')
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');            
            res.body[0].should.have.property('longlink');
            res.body[0].should.have.property('shortlink');
            res.body[0].should.have.property('description');
            res.body[0].should.have.property('click');
            res.body[0].should.have.property('tags');            
            done();
          });
    });

    // ALL LINKS OF USER
    it('should get list all links of user', function(done) {
      let user = {
        name: 'vik',
        login: 'vik',
        password: '12345',
        token: token
      }
      chai.request(server)
        .get('/userlink/linkcreate')
        .send(user)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');            
          res.body[0].should.have.property('longlink');
          res.body[0].should.have.property('shortlink');
          shortlink = res.body[0].shortlink;
          res.body[0].should.have.property('description');
          res.body[0].should.have.property('click');
          res.body[0].should.have.property('tags');           
          done();
        });
    });

    // LINK INFORMATION
    it('should get detail info of link', function(done) {
      chai.request(server)
        .get('/userlink/info-one/'+ shortlink)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');           
          done();
        });
    });

    // TAG
    it('should get list all links of tag', function(done) {
      chai.request(server)
        .get('/userlink/tag/'+ '11')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');            
          res.body[0].should.have.property('longlink');
          res.body[0].should.have.property('shortlink');
          res.body[0].should.have.property('description');
          res.body[0].should.have.property('click');
          res.body[0].should.have.property('tags');          
          done();
        });
    });

    // UPDATE
    it('should update a link', function(done) {
        chai.request(server)
            .put('/userlink/linkedit/'+shortlink)
            .send({token: token, longlink: 'mail.ru', shortlink: shortlink, description: 'почта после редактирования', tags: '22,44,'})
            .end(function(err, res){
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('success',true);    
              res.body.should.have.property('message','Ссылка отредактирована!');
              done();
        });       
    });
    
    // UPDATE - err
    it('should not update a link', function(done) {
          chai.request(server)
              .put('/userlink/linkedit/'+'11111')
              .send({token: token, longlink: 'mail.ru', shortlink: shortlink, description: 'почта после редактирования', tags: '22,44,'})
              .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success',false);    
                res.body.should.have.property('message','Отсутствует ссылка для редактирования.');
                done();
            });       
    });
});