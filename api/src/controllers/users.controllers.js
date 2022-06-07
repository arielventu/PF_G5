const axios = require('axios')

const getUsers = (req, res) => {
    let options = {
        method: 'GET',
        url: `https://ivocfh.us.auth0.com/api/v2/users`,
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
}

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


module.exports = {
    getUsers,
    updateUser,
    deleteUser,
    resetPass,
    getUserRoles
}