    qw = require('queue-width')
    
    qw({
      jobs: [1,2,3,4,5,6,7] //array of jobs
    , width: 3 //process two items at once
    , done: function (){} //function to call when finished 
    }).forEach(function (v,k,o){//same API as [].forEach
      console.log(v)
      setTimeout(this.next,1000)
      //this.next will end this task and start a new one, if necessary.
    })