const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.ACCOUNT_SID;
const authoToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authoToken);
const schedule = require('node-schedule');
require('es6-promise').polyfill();
require('isomorphic-fetch');//use nodefetch

const j = schedule.scheduleJob('0 0 9 ? * *', () => {
    //get random jokes from Api
    fetch('https://api.chucknorris.io/jokes/random')
    .then(res => res.json())
    .then(res => {
      //send SMS
      client.messages.create({
      body: res.value,
      from: '+18016830359',
      to: '+2347035311608'
      })
      .then(message => console.log(message.sid));
    })
    .catch((error) => console.log(error))
})
