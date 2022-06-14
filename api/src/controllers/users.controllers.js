const axios = require('axios')
const adminRoleCte = 'rol_ssYAS839QjRHk2GX';

const getUsers = (req, res) => {
    let finalUsersArray = [];
    let usersReq = {
      method: 'GET',
      url: `https://ivocfh.us.auth0.com/api/v2/users`,
      headers: {
          'authorization': req.headers.authorization,
          "content-type": "application/json"
      }
    };
    let adminsReq = { 
      method: 'GET',
      url: `/users/admins`,
      headers: {
          'authorization': req.headers.authorization,
          "content-type": "application/json"
      }
    }

    Promise.all([
      axios.request(usersReq),
      axios.request(adminsReq)
    ])
    .then( result => {
      // console.log(res[0].data);
      // console.log(res[1].data);

      finalUsersArray = result[0].data.map( user => {
        let adminRole = result[1].data.filter( role =>  user.user_id === role.user_id);
        if ( adminRole.length > 0 ) {
          return {
            ...user,
            admin: true
          }
        }
        else {
          return {
            ...user,
            admin: false
          }
        }
      })
      // console.log(users)
      res.status(200).json(finalUsersArray)
    })
    .catch( err => console.log(err) )
};

const getUser = (req, res) => {
  let options = {
    method: 'GET',
    url: `https://ivocfh.us.auth0.com/api/v2/users/${req.params.id}`,
    headers: {
        'authorization': req.headers.authorization,
        "content-type": "application/json"
    }
  }

  axios.request(options)
  .then( response => res.status(200).json(response.data))
  .catch( err => console.log(err) )
};

const updateUser = (req, res) => {
    
};

const getUserRoles = (req, res) => {
    var options = {
        method: 'GET',
        url: `https://ivocfh.us.auth0.com/api/v2/users/${req.params.id}/roles`,
        headers: {
            authorization: req.headers.authorization,
            "content-type": "application/json"
        }
      };
      
      axios.request(options).then(function (response) {
        // console.log(response.data);
        res.send(response.data)
      }).catch(function (error) {
        console.error(error);
      });
};

const setAdmin = (req, res) => {
  console.log(req.body)
  let options = {
    method: 'POST',
    url: `https://ivocfh.us.auth0.com/api/v2/users/${req.params.id}/roles`,
    headers: {
        'authorization': req.headers.authorization,
        "content-type": "application/json"
    },
    data: req.body
  }

  axios.request(options)
  .then( response => res.status(200).json(response.data))
  .catch( err => console.log(err) )
};

const revokeAdmin = (req, res) => {
  let options = {
    method: 'DELETE',
    url: `https://ivocfh.us.auth0.com/api/v2/users/${req.params.id}/roles`,
    headers: {
        'authorization': req.headers.authorization,
        "content-type": "application/json"
    },
    data: req.body
  }
  
  axios.request(options)
  .then( response => res.status(200).json(response.data))
  .catch( err => console.log(err) )
};

const getAdminUsers = ( req, res ) => {
  let options = {
    method: 'GET',
    url: `https://ivocfh.us.auth0.com/api/v2/roles/${adminRoleCte}/users`,
    headers: {
        'authorization': req.headers.authorization,
        "content-type": "application/json"
    }
  }

  axios.request(options)
  .then( response => res.status(200).json(response.data))
  .catch( err => console.log(err) )
};

const resetPass = (req, res) => {
    // console.log('>> RESET USER PASSWORD');
    // console.log(req.params.email);
    // console.log(req.headers.authorization)
    var options = {
        method: 'POST',
        url: 'https://ivocfh.us.auth0.com/dbconnections/change_password',
        headers: {'content-type': 'application/json'},
        data: {
          client_id: 's1cWWIFA96ZG5Tuq7LojCQpNMFnwAsnk',
          email: req.params.email,
          connection: 'Username-Password-Authentication'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
        res.send(response.data)
      }).catch(function (error) {
        console.error(error);
      });

};

const deleteUser = (req, res) => {
  // console.log('>> DELETE USER');
  // console.log(req.params.id);
  // console.log(req.headers.authorization)
  let options = {
      method: 'DELETE',
      url: `https://ivocfh.us.auth0.com/api/v2/users/${req.params.id}`,
      headers: {
          authorization: req.headers.authorization,
          "content-type": "application/json"
      }
  }

  axios.request(options)
      .then( response => {
          if (response.status === 204) {
              res.status(204).send('User deleted')
          }
      })
      .catch( err => res.status(403).send(err.response.statusText))

};


module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    resetPass,
    getUserRoles,
    setAdmin,
    revokeAdmin,
    getAdminUsers
}