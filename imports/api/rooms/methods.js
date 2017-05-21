import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Rooms } from './rooms.js';

Meteor.methods({
  'rooms.insert'(title){
    check(title, String);
    if(!Meteor.user()){
      throw new Meteor.Error(404, 'Error 404: Not found', details);
    }
      Rooms.insert({
        title,
        createdAt: new Date()
      });

  },
  'rooms.remove'(roomId){
    check(roomId, String);

    Rooms.remove(roomId);
  },
  'rooms.updateDataUrl'(roomId, dataUrl){
    check(roomId, String);
    //check(dataUrl, String);

    Rooms.update(roomId, {$set: {
      dataUrl,
      updatedAt: new Date()
    }});
  }
});
