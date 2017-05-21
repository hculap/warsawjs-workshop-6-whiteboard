import { Rooms } from '/imports/api/rooms/rooms.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { CanvasManager } from '/imports/utils/client/canvas_manager.js';

import './room.html';
import './room.css';

let init = false;
window.Rooms = Rooms;
let canvasManager = null;

Template.App_room.onCreated(function () {
  Meteor.subscribe('rooms.show', FlowRouter.getParam('id'));
});

Template.App_room.onRendered(function(){
  this.autorun(() => {
    if(!init){
      const room = Rooms.findOne(FlowRouter.getParam('id'));
      if(room){
        const canvas = $('#canvas')[0];
        // Set canvas dimensions
        if(canvas.width > window.innerWidth){
          canvas.width = window.innerWidth - 40;
          canvas.height = window.innerHeight - 150;
        }

        canvasManager = new CanvasManager(canvas, {
          //instant: true,
          callback: () => {
            Meteor.call('rooms.updateCanvas', room._id, canvas.toDataURL(), (error) => {
              if (error) {
                alert(error.error);
              } else {
                name.value = '';
              }
            });
        }});
        canvasManager.load(room.dataUrl);
        init = true;
      }
    }
  });
});


Template.App_room.helpers({
  room() {
    const room = Rooms.findOne(FlowRouter.getParam('id'));
    if(room && canvasManager){
      canvasManager.load(room.dataUrl);
    }
    return room;
  },
});

Template.App_room.events({
  'click .color-selector .option': function (e) {
    e.preventDefault();
    if(canvasManager){
      const color = $(e.currentTarget).data('color');
      canvasManager.color = color;
    }
  },
  'change .size-selector input': function(e) {
    if(canvasManager){
      const size = $(e.currentTarget).val();
      canvasManager.size = size;
    }
  },
  'click .clear-all button': function (e) {
    e.preventDefault();
    if(canvasManager){
      canvasManager.clear();
    }
  },
});
