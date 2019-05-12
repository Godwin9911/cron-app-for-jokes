if (process.env.NODE_ENV !== 'development') {
    require('dotenv').config();
  }
const accountSid = process.env.ACCOUNT_SID;
const authoToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authoToken);
const express = require('express');
const schedule = require('node-schedule-tz');
require('es6-promise').polyfill();
require('isomorphic-fetch');//use nodefetch

const app = express()
const port = process.env.PORT || 3000
      
//cron job for 8 am everyday
const j = schedule.scheduleJob('0 14 * * *', () => {
    //get random jokes from Api
    fetch('https://api.chucknorris.io/jokes/random')
    .then(res => res.json())
    .then(res => {
      //send SMS
      client.messages.create({
      body: res.value,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.MY_PHONE_NUMBER
      })
      .then(message => console.log(message.sid));
    })
    .catch((error) => console.log(error))
})

app.listen(port);
