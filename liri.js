const dotenv = require("dotenv").config();
const keys = require("./keys.js");
// const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");
const artist = process.argv[2]

// process.argv.slice(2).join('%20)


axios
  .get(
    `https://rest.bandsintown.com/artists/${artist}/events?app_id=${process.env.BANDS_IN_TOWN_API_KEY}`
  )
  .then(response => {
    response.data.forEach(item => {
      console.log(`venue name: ${item.venue.name} city: ${item.venue.city} state: ${item.venue.region} time: ${moment(item.datetime).format('MM/DD/YYYY')}`)
    })
    // console.log(response.data);
  })

  .catch(err => {
    console.log("Error: ", err.code);
  });

// axios
//   .get("https://api.spotify.com/v1/search?q=tania%20bowra&type=artist")
//   .then(response => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.log("error: ", err);
//   });
