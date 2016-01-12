#### CodeChallenge: Eventbrite Mini

Please spend no more than **1 hour** to complete the following challenge.

We need three classes in either **Ruby or Javascript**: 
* **Event** - An event has a name, date, and attendees.
* **Person** - A person has a first name and a last name.
* **Invite** -  An invite has a person and an event.

Once completed you should easily be able to create events, and get them attended by many people by way of invites.  The way you structure your api, and how to interact with it is totally up to you.

**Fork this repository** for you solution, and send us the link.

###How to Use:

1. Perform npm install
2. `node app.js` to start the server

##API Routes
####User
- GET localhost:3000/users/
   - retrieves all users
- GET localhost:3000/users/user_id
   - retrieves specific user_id information
- PUT localhost:3000/users/user_id
   - modifies existing user_id
- POST localhost:3000/users/
   - creates a user
   - Requires firstName (string), lastName (string), and email in request body

####Event
- GET localhost:3000/events/
   - retrieves all events
- GET localhost:3000/events/event_id
   - retrieves specific event with summary invite information (number of invites, number of yes, no, etc)
- POST localhost:3000/events/
   - creates an event
   - requires name (string), owner (user id), and optional Date (i.e. 2016-01-12T01:40:03.970Z) in the request body

####Invite
- GET localhost:3000/invites/
   - retrieves all invites
- GET localhost:3000/invites/invite_id
   - retrieves specific invite information
- PUT localhost:3000/invites/invite_id
   - modifies existing invite
   - primarily used for changing invite status
- POST localhost:3000/invites/
   - creates an invite
   - Requires sender (user id), invitee (user id), event id in request body

Deletes are not implemented for Invites/Events yet