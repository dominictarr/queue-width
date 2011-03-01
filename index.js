//var curry = require('curry')

//process a queue n items at a time
//like tellers at a bank.

/*
there is still lots of functionality to be added, error support etc.

but this will do for now.

*/

module.exports = Queue

function Queue(options){
  if(!(this instanceof Queue)) return new Queue(options)

var self = this
  
  this.keys = Object.keys(options.jobs)
  this.running = 0
  this.jobs = options.jobs
  this.width = options.width || 1
  this.done = options.done 
  
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
    function (func){
      this.func = func
      var i = 0
      while(i++ < this.width)
        this.start()
    }
}

