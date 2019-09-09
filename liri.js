const dotenv = require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");
const spotify = new Spotify({
  id: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_CLIENT_SECRET
});
// const artist = process.argv[2]
const artist = process.argv.slice(2).join(" ");

// process.argv.slice(2).join('%20)

// axios
//   .get(
//     `https://rest.bandsintown.com/artists/${artist}/events?app_id=${process.env.BANDS_IN_TOWN_API_KEY}`
//   )
//   .then(response => {
//     response.data.forEach(item => {
//       console.log(`venue name: ${item.venue.name} city: ${item.venue.city} state: ${item.venue.region} time: ${moment(item.datetime).format('MM/DD/YYYY')}`)
//     })
//     // console.log(response.data);
//   })
//   .catch(err => {
//     console.log("Error: ", err.code);
//   });

spotify
  .search({ type: "track", query: artist, limit: 5 })
  .then(response => {
    let data = response.tracks.items[0]
    console.log(data.name)
    console.log(data.artists[0].name);
    console.log(data.album.name);
    console.log(data.preview_url);
  })
  .catch(err => {
    console.log("Error: ", err);
  });
