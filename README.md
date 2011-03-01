#queue width

process a queue (async forEach) a fixed number of item at a time.

often you must do a number of IO opperations at once, 
but are limited by the enviroment as so how many you can do at one time (file descriptors, cores)

    qw = require('queue-width')
    
    qw({
      jobs: [1,2,3,4,5,6,7] //array of jobs
    , width: 3 //process two items at once
    , done: function (){} //callback when finished 
    }).forEach(function (v,k,o){//same API as [].forEach
      console.log(v)
      setTimeout(this.next,1000)
      //this.next will end this task and start a new one, if necessary.
    })