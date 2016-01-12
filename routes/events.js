'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Event = require('../model.js').Event;


//Gets specific event information along with invite summary information
router.get('/:event_id', function(req, res, next){
	Event.findById(req.params.event_id).populate('invites')
	.then(function(event){
		var returnobj = event.toObject();
		returnobj["inviteSummary"] = event.inviteStatus();
		res.send(returnobj)
	})
	.then(null, next);
})

//Gets all event information
router.get('/', function(req, res, next){
	Event.find()
	.then(function(events){
		res.send(events)
	})
	.then(null, next);
})

//Creates an event
//Requires name, owner, and optional Date (i.e. 2016-01-12T01:40:03.970Z) in the request body
router.post('/', function(req,res,next){
	Event.create(req.body)
	.then(function(event){
		res.status(201).send(event)
	})
	.then(null,next);
})


