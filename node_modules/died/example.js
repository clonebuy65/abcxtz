const Died = require('./index')
let url = 'https://example.com/'

let died = new Died(url, 10)

died.on('result', (result, error) => {
  if(!result) console.log(url, 'is alive')
  else console.log(url, 'is dead')
})

died.stop() // stop testing

died.resume() // resume testing