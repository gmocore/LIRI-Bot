const dotenv = require("dotenv").config();
const keys = require("./keys.js");
// const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");

// axios
//   .get(
//     `https://rest.bandsintown.com/artists/deftones?app_id=${process.env.BANDS_IN_TOWN_API_KEY}`
//   )
//   .then(response => {
//     console.log(response);
//   })

//   .catch(err => {
//     console.log("Error: ", err);
//   });

axios
  .get("https://api.spotify.com/v1/search?q=tania%20bowra&type=artist")
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log("error: ", err);
  });
