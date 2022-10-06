require("dotenv").config();

const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const lyrics = require("lyrics-finder");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", function (req, res) {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });
  spotifyApi
    .authorizationCodeGrant(req.body.code)
    .then((data) => {
      res.json({
        access_token: data.body.access_token,
        token_type: data.body.token_type,
        expires_in: data.body.expires_in,
        refresh_token: data.body.refresh_token,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

//app.post('/refresh_token', function (req, res) {
// const refresh_token = req.query.refresh_token;
// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     Authorization:
//       'Basic ' +
//       new Buffer(client_id + ':' + client_secret).toString('base64'),
//   },
//   form: {
//     grant_type: 'refresh_token',
//     refresh_token: refresh_token,
//   },
//   json: true,
// };
// request.post(authOptions, function (error, response, body) {
//   if (!error && response.statusCode === 200) {
//     var access_token = body.access_token;
//     res.send({
//       access_token: access_token,
//     });
//   }
// });
//});

app.listen(5000);
