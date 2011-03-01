var qw = require('queue-width')
  , it = require('it-is')

function checkForEach(obj){
  var r = []
  
  obj.forEach(function (v,k,o){
    it(o).property(k,v)
    r.push(v)
    if(this.next)
      setTimeout(this.next,0)
  })
  
  return function (){
    return r
  }
}

exports ['for each is normal'] = function (test){

 var a = [1,2,3,4,5,6,7,8,9,0]
 
   , sync = checkForEach(a)()
   , async = checkForEach(qw(a,1,done))

  function done(){
    it(async()).deepEqual(sync)
    test.done()
  }
}


exports ['process width items at a time'] = function (test){

 var a = [1,2,3,4,5,6,7,8,9,0]
 
   , sync = checkForEach(a)()
   , async = checkForEach(qw(a,3,done))

  //should begin 3 items syncly so, [1,2,3] should be the list so far
  
  //process.nextTick(function (){it(async()).deepEqual([1,2,3])})

  it(async()).deepEqual([1,2,3])

  function done(){
    it(async()).deepEqual(sync)
    test.done()
  }
}
