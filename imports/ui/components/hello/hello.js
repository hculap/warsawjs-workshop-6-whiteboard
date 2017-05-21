import './hello.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.name = new ReactiveVar('Wrold');
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  name(){
    return Template.instance().name.get();
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  'keyup input'(event, instance){
    instance.name.set($(event.target).val());
  }
});
