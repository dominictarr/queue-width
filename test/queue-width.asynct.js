var qw = require('queue-width')
  , it = require('it-is')

function checkForEach(obj,done){
  var r = []
  
  obj.forEach(function (v,k,o){
    it(o).property(k,v)
    r.push(v)
    if(this.next)
      setTimeout(this.next,0)
  },done)
  
  return function (){
    return r
  }
}

exports ['for each is normal'] = function (test){

 var a = [1,2,3,4,5,6,7,8,9,0]
 
   , sync = checkForEach(a)()
   , async = checkForEach(qw(a,1),done)

  function done(){
    it(async()).deepEqual(sync)
    test.done()
  }
}


exports ['process 3 items at a time'] = function (test){

 var a = [1,2,3,4,5,6,7,8,9,0]
 
   , sync = checkForEach(a)()
   , async = checkForEach(qw(a,3),done)

  it(async()).deepEqual([1,2,3])

  function done(){
    it(async()).deepEqual(sync)
    test.done()
  }
}

exports ['process 5 items at a time'] = function (test){

 var a = [1,2,3,4,5,6,7,8,9,0]
 
   , sync = checkForEach(a)()
   , async = checkForEach(qw(a,5),done)

  it(async()).deepEqual([1,2,3,4,5])

  function done(){
    it(async()).deepEqual(sync)
    test.done()
  }
}
