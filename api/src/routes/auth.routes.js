/* --------------------------------------------
  file: auth.routes.js
  create by: ivo.monzon.im@gmail.com
  github: ivocfh
  date: 02/06/2022 
  description: This route is intended to make a request from the backend to get the API Token to use for the Auth0 Management
-----------------------------------------------*/


const express = require('express');
const router = express.Router();
const guard = require('express-jwt-permissions');
const request = require("request");
const axios = require('axios')

const getManagementApiJwt = () => {
  return new Promise( function(resolve, reject) {
    let postOptions = { 
      method: 'POST',
      url: 'https://ivocfh.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"s1cWWIFA96ZG5Tuq7LojCQpNMFnwAsnk","client_secret":"JuwrQs9ilEC9UmtlgYLigPkHEtcM-B7MkrHTD3346YZvhNCrXXbzvk450XfqSIo1","audience":"https://ivocfh.us.auth0.com/api/v2/","grant_type":"client_credentials"}' 
    };
    
    request(postOptions, function (error, response, body) {
        if (error) {
          reject(error)
        }
        else {
          const { access_token } = JSON.parse(body);
          resolve(access_token);
        }    
    });
  })
}

router.get('/auth', async function (req, res){
  getManagementApiJwt()
    .then( apiToken => {
      res.send(apiToken)
    })
});



module.exports = router;