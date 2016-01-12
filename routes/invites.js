'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Invite = require('../model.js').Invite;

//Get specific Invite information
router.get('/:invite_id', function(req, res, next){
	Invite.findById(req.params.invite_id)
	.then(function(invite){
		res.send(invite);
	})
	.then(null, next);
})

//Gets all invites
router.get('/', function(req, res, next){
	Invite.find()
	.then(function(invites){
		res.send(invites)
	})
	.then(null, next);
})

//Creates invite
//Requires sender, invitee, event in request body
router.post('/', function(req,res,next){
	var createdInvite;
	Invite.create(req.body)
	.then(function(invite){
		createdInvite = invite;
		return invite.addToEvent()
	})
	.then(function(){
		return createdInvite.addToInvitee();
	})
	.then(function(){
		return createdInvite.addToSender();
	})
	.then(function() {
		res.status(201).send(createdInvite)
	})
	.then(null,next);
})

//Modify invite, mostly used for changing the status
router.put('/:invite_id', function(req,res,next){
	Invite.findByIdAndUpdate(req.params.invite_id, req.body, {new: true})
	.then(function(updatedInvite){
		res.send(updatedInvite)
	})
	.then(null,next);
})

