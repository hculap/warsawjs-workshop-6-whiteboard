// Methods related to rooms

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Rooms } from './rooms.js';

Meteor.methods({
  'rooms.insert'(name) {
    check(name, String);

    return Rooms.insert({
      name,
      createdAt: new Date(),
    });
  },
  'rooms.updateCanvas'(roomId, dataUrl){
    if(dataUrl){
      //check(dataUrl, String);

      return Rooms.update(roomId, {$set: {
        dataUrl,
        updatedAt: new Date()
        }
      });
    }
  },
  'rooms.canvasData'(roomId){
      const room = Rooms.findOne(roomId);
      return room && room.dataUrl;
  }
});
