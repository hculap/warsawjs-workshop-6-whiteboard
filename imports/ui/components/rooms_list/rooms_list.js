import { Rooms } from '/imports/api/rooms/rooms.js';
import { Meteor } from 'meteor/meteor';
import './rooms_list.html';

Template.roomsList.onCreated(function () {
  Meteor.subscribe('rooms.all');
});

Template.roomsList.helpers({
  rooms() {
    return Rooms.find({});
  },
});

Template.roomsList.events({
  'submit .room-add'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name;
    const url = target.url;

    Meteor.call('rooms.insert', name.value, (error) => {
      if (error) {
        alert(error.error);
      } else {
        name.value = '';
      }
    });
  },
});
