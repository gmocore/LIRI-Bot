const dotenv = require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");
const omdb = require("omdb");
const fs = require('fs')
const spotify = new Spotify({
  id: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_CLIENT_SECRET
});
// const artist = process.argv[2]
const artist = process.argv.slice(2).join(" ");

// process.argv.slice(2).join('%20)
const searchBand = (band)=> {
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
}

const searchSong = songName => {

  spotify
    .search({ type: "track", query: songName, limit: 5 })
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
}

const searchMovie = movie => {

  axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${movie}`).then(movies => {
    console.log('title: ', movies.data.Title)
    console.log('Rating: ', movies.data.Rated)
    console.log('IMDB Rating: ', movies.data.imdbRating)
    console.log('RT Score: ', movies.data.Ratings[1].Value)
    console.log('Country: ', movies.data.Country)
    console.log('Language: ', movies.data.Language)
    console.log('Plot: ', movies.data.Plot)
    console.log('Actors: ', movies.data.Actors)
  }).catch(err => {
    console.log(err)
  })
}

// searchBand(artist)
// searchSong(artist)
searchMovie(artist)

