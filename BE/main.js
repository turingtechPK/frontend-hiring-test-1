const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const port = 8585;
require('dotenv').config();


app.use(cors());
app.options('*', cors()); // this enables preflight
app.use(express.json());
app.use(express.urlencoded());

app.post('/', (req, res) => {
  constantAPICall()
})

let accessToken;
let refreshToken;


// this function will verify the jwt token for the user from the React FrontEnd
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearertoken = bearerHeader.split(' ')[1];
    req.token = bearertoken;
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        console.log("token verified");
        next()
      }
    });
  } else {
    res.sendStatus(403);
  }
}

// this function will call the API will create the token for us and it will run only once when server starts
const constantAPICall = () => {
  axios.post("https://frontend-test-api.aircall.io/auth/login", {
    "username": "TuringTechInterview",
    "password": "TuringTechInterview"
  })
    .then(response => {
      console.log("I have logged in");
      accessToken = response.data.access_token;
      refreshToken = response.data.refresh_token;
    })
}
constantAPICall()

let data = {}

// this function will get all data from our API
const calltoAPI = async () => {
  if (!refreshToken) {
    constantAPICall()
  }
  await axios.get("https://frontend-test-api.aircall.io/calls", {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => {
      data = response.data
    })
    .catch(error => {
      console.log("=====refresh token=====")
      axios.post("https://frontend-test-api.aircall.io/auth/refresh-token", {
        "access_token": accessToken,
        "refresh_token": refreshToken
      })
        .then(response => {
          console.log("I have refreshed the token");
          accessToken = response.data.access_token;
          refreshToken = response.data.refresh_token;
          calltoAPI()
        })
        .catch(error => {
          console.log("<<<<<<<=============>>>>>>>", error);
        })
    })

}

// on clicking next button, this function will get us 10 more entries from the API
const moreDataFun = (lastitem) => {
  let url = "https://frontend-test-api.aircall.io/calls?offset=" + lastitem + "&limit=10"
  axios.get(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => {

      data = response.data
    })
    .catch(error => {
      console.log("=====refresh token=====")
      axios.post("https://frontend-test-api.aircall.io/auth/refresh-token", {
        "access_token": accessToken,
        "refresh_token": refreshToken
      })
        .then(response => {
          console.log("I have refreshed the token");
          accessToken = response.data.access_token;
          refreshToken = response.data.refresh_token;
          moreDataFun()
        })
        .catch(error => {
          console.log("<<<<<<<=============>>>>>>>", error);
        })
    })
}

app.put("/getMoreData", async (req, res) => {
  let name = req.body.data.name
  let lastitem = req.body.data.lastId
  console.log(data.hasNextPage)
  console.log(name)
  if (data.hasNextPage === true) {
    await moreDataFun(lastitem)
    setTimeout(() => {
      res.send(data)
    }, 2000);
  } else if (data.hasNextPage === false) {
    res.send("no data")
  }

})

app.get('/getData', verifyToken, (req, res) => {
  calltoAPI()
  setTimeout(() => {
    res.send(data)
  }, 2000);
  // res.send(callData);
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});