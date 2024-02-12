const EventEmitter = require('events').EventEmitter
if(process) fetch = require('node-fetch')
else fetch = fetch

const Died = function(url, interval){
  let died = this
  const events = new EventEmitter()
  died.emit = events.emit.bind(events)
  died.on = events.on.bind(events)
  died.once = events.once.bind(events)
  died.off = events.off.bind(events)

  function testUrl(url){
    fetch(url)
    .then(res => {
      if(res.status >= (200  || 300 || 100) && res.status <= (299 || 399 || 199))
      died.emit('result', false)
      else died.emit('result', true)
    }).catch(err => {
      died.emit('result', true)
    })
  }
  let stop
  died.stop = () =>{
    stop = true
  }
  died.resume = () => {
    stop = false
  }
  testUrl(url)
  let intervalId = setInterval(()=>{
    if(stop === true){
      clearInterval(intervalId)
    }
    testUrl(url)
  }, interval * 1000)
}

module.exports = Died