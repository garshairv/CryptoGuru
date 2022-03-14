var request = require('request');
let symbol = 'LTCBTC';
var options = {
  'method': 'GET',
  'url': 'https://api.api-ninjas.com/v1/cryptoprice?symbol=' + symbol,
  'headers': {
    'X-Api-Key': 'LCAI7w4plGGN4ytCYHhw2A==u1KYNraaqddRHd5N'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});