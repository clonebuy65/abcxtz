# Died
Test if a website has died

## Usage
### Install
`> npm i died`

### Example
```js
const Died = require('died')
let url = 'https://example.com/'

let died = new Died(url, 10)

died.on('result', (result, error) => {
  if(!result) console.log(url, 'is living')
  else console.log(url, 'has died')
})

died.stop() // stop testing

died.resume() // resume testing
```