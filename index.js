//var curry = require('curry')

//process a queue n items at a time
//like tellers at a bank.

/*
there is still lots of functionality to be added, error support etc.

but this will do for now.

*/

module.exports = Queue

function Queue(jobs,width){
  if(!(this instanceof Queue)) return new Queue(jobs,width)

var self = this
  
  this.keys = Object.keys(jobs)
  this.running = 0
  this.jobs = jobs
  this.width = width || 1
  this.done = function (){}
  
  this.start = function (){
    var k = self.keys.shift()
    self.running ++
    self.func(self.jobs[k],k,self.jobs)
  }
  
  this.next = function (){
    self.running --
    if(self.keys.length){
      self.start()
    } else if (self.running == 0){
        self.done()
    }
  }
}

Queue.prototype = {

  forEach: 
    function (func,done){
      this.func = func
      this.done = done || this.done 
      var i = 0
      while(i++ < this.width)
        this.start()
    }
}

