import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Rooms } from '/imports/api/rooms/rooms.js';
import { CanvasManager } from '/imports/utils/client/canvas_manager.js';
import './room.html';
import './room.css';

let init = false;
let canvasManager = null;

Template.App_room.onCreated(function(){
  init = null;
  Meteor.subscribe('rooms.show', FlowRouter.getParam('id'));
})

Template.App_room.onRendered(function(){
  this.autorun(() => {

    if(!init){
      const canvas = document.getElementById('canvas');
      const room = Rooms.findOne(FlowRouter.getParam('id'));
      if(room){
        canvasManager = new CanvasManager(canvas, {
          instant: true,
          callback(){
            Meteor.call('rooms.updateDataUrl', room._id, canvas.toDataURL());
          }
        });
        canvasManager.load(room.dataUrl);
        init = true;
      }
    }
  });
});

Template.App_room.helpers({
  room(){
    const room = Rooms.findOne(FlowRouter.getParam('id'));
    if(room && canvasManager){
      if(room.dataUrl){
        canvasManager.load(room.dataUrl);
      } else {
        canvasManager.clear();
      }
    }
    return Rooms.findOne(FlowRouter.getParam('id'));
  }
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
    if (confirm("Czy na pewno chcesz wszystko usunąć?")) {
      const room = Rooms.findOne(FlowRouter.getParam('id'));
      if(room && canvasManager){
        canvasManager.clear();
        Meteor.call('rooms.updateDataUrl', room._id, null);
      }
    }
  },
});

