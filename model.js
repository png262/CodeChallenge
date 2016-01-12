var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Connect to mongoose db called eventbrite
mongoose.connect('mongodb://localhost/eventbrite'); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Schema = mongoose.Schema;

//Create user schema
var userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  receivedInvites: [{type: Schema.Types.ObjectId,  ref: 'Invite'}],
  sentInvites: [{type: Schema.Types.ObjectId,  ref: 'Invite'}]
})

//Create event schema
var eventSchema = new Schema({
  name: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId,  ref: 'User'},
  invites: [{type: Schema.Types.ObjectId,  ref: 'Invite'}],
  date: {type: Date,  default: Date.now},
})

//Create invite schema
var inviteSchema = new Schema({
  sender: {type: Schema.Types.ObjectId,  ref: 'User', required: true},
  invitee: {type: Schema.Types.ObjectId,  ref: 'User', required: true},
  event: {type: Schema.Types.ObjectId,  ref: 'Event', required: true},
  status: { type: String, 
            required: true,
            enum: {
              values: ['yes', 'no', 'maybe', 'created'],
              message: "Invalid value for status"}, 
            default: 'created'
          }
})

//additional methods to append invite details to Event & Users
inviteSchema.methods.addToEvent = function() {
  return Event.findByIdAndUpdate(this.event, {$push: {"invites": this}}, {new: true})
}

inviteSchema.methods.addToInvitee = function() {
  return User.findByIdAndUpdate(this.invitee, {$push: {"receivedInvites": this}}, {new: true})
}

inviteSchema.methods.addToSender = function() {
  return User.findByIdAndUpdate(this.sender, {$push: {"sentInvites": this}}, {new: true})
}

//calculate overall invite status information for event
eventSchema.methods.inviteStatus = function() {
  var summary = {}

  for (var i = 0; i < this.invites.length; i++) {
    if(summary[this.invites[i].status])
      summary[this.invites[i].status]++;
    else
      summary[this.invites[i].status] = 1;
  }
  summary["totalinvites"] = this.invites.length;
  return summary;

}


// Creates the mongoose models
var User = mongoose.model('User', userSchema);
var Event = mongoose.model('Event', eventSchema);
var Invite = mongoose.model('Invite', inviteSchema);


module.exports = {
  User: User,
  Event: Event,
  Invite: Invite
}

