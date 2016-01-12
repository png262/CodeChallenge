'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = require('../model.js').User;

//Gets a specific user id
router.get('/:user_id', function(req, res, next){
	User.findById(req.params.user_id)
	.then(function(user){
		res.send(user);
	})
	.then(null, next);
})

//Gets all user ids
router.get('/', function(req, res, next){
	User.find()
	.then(function(users){
		res.send(users)
	})
	.then(null, next);
})

//Creates user
//Requires firstName, lastName, and email in request body
router.post('/', function(req,res,next){
	User.create(req.body)
	.then(function(user){
		res.status(201).send(user)
	})
	.then(null,next);
})

//Deletes user
router.delete('/:user_id', function(req, res, next){
	User.findByIdAndRemove(req.params.user_id)
	.then(function(){
		res.status(204).end();
	})
	.then(null, next);
})











