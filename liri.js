// VARIABLES
require("dotenv").config();
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const spotify = new Spotify({
  // import keys from .env file to spotify object required for validation
  id: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_CLIENT_SECRET
});
let input = process.argv.slice(3).join(" ");
let cliriQuery = process.argv[2];

// BANDS IN TOWN CONCERT SEARCH

const searchBand = band => {
  // submit GET request to BIT API
  axios
    .get(
      // pass in band and api key to request url
      `https://rest.bandsintown.com/artists/${band}/events?app_id=${process.env.BANDS_IN_TOWN_API_KEY}`
    )
    // await promise to resolve from api
    .then(response => {
      // error checking for invalid results
      if (!response.data.length) {
        console.log(`Sorry, ${input} has no upcoming concerts`);
      }
      // response return array of reults. each item of array is looped through and displayed
      response.data.forEach(item => {
        return console.log(
          // display results to console
          `
          =======================================
          =============Concert Results===========
          =======================================
          venue name: ${item.venue.name} 
          City: ${item.venue.city} 
          State: ${
            item.venue.region
            // UTC time is passed into moment and parsed to MM/DD/YYYY format
          } 
          Date: ${moment(item.datetime).format("MM/DD/YYYY")}
          `
        );
      });
    })
    // check for error in api request
    .catch(err => {
      return console.log("Error: ", err.code);
    });
};

// SPOTIFY SONG SEARCH

const searchSong = songName => {
  // perform spotify search based on spotify package
  spotify
    // search by track name. pass in song name is query and limit results to 5
    .search({ type: "track", query: songName, limit: 5 })
    // await promise to resolve
    .then(response => {
      // error checking for invalid search
      if (!response.tracks.total) {
        return console.log(
          `${songName} is not a valid song, try typing it correctly, or choosing a song that isn't by one of your friends`
        );
      }
      let data = response.tracks.items[0];
      // display search results to console
      return console.log(`
      =======================================
      ==============Song Results=============
      =======================================

      Artist: ${data.artists[0].name}
      Song: ${data.name}
      Album: ${data.album.name}
      Preview: ${data.preview_url}

      =======================================
      =======================================
      =======================================
      `);
    })
    // check for error in api response
    .catch(err => {
      return console.log("Error: ", err);
    });
};

// OMDB MOVIE SEARCH

const searchMovie = movie => {
  // perform GET request to api
  axios
    .get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${movie}`
    )
    // await resolve of promise
    .then(movies => {
      // error checking for invalid search
      if (movies.data.Error) {
        //display error to console
        return console.log(movies.data.Error, "try typing it correctly?");
      }
      // display formatted search results to console
      return console.log(`
        =======================================
        =============Movie Results=============
        =======================================

        Title: ${movies.data.Title}
        Rating: ${movies.data.Rated}
        IMDB Rating: ${movies.data.imdbRating}
        RT Score: ${movies.data.Ratings[1].Value}
        Country: ${movies.data.Country}
        Langauge: ${movies.data.Language}
        Plot: ${movies.data.Plot}
        Actors: ${movies.data.Actors}

        =======================================
        =======================================
        =======================================

      `);
    })
    // check for api response error
    .catch(err => {
      console.log(err);
    });
};

// DO WHAT IT SAYS SEARCH

const doWhatItSays = () => {
  // read text from random.text
  fs.readFile("random.txt", "utf8", (err, data) => {
    // error checking for readFile method
    if (err) {
      // display error to console
      console.log(err);
    }

    // set text content to new array, and split items by comma
    let dataArray = data.split(",");
    // set cliriQuery and input to values from the array
    cliriQuery = dataArray[0];
    input = dataArray[1];
    // perfrom search based on information read from random.txt
    searchSong(input);
  });
};

// listen for cliriQuery commands to run function associtated with cliriQuery input
switch (cliriQuery) {
  case "concert-this":
    console.log(cliriQuery);
    searchBand(input);
    break;

  case "spotify-this":
    console.log(cliriQuery);
    searchSong(input);
    break;

  case "movie-this":
    console.log(cliriQuery);
    searchMovie(input);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    // error checking to ensure valid input was entered.
    console.log(
      // display available commands
      `
    !*!-type a valid command-!*!
    ***Available commands***: 

    concert-this 'band name'
    spotify-this 'song name'
    movie-this 'movie name'
    do-what-it-says
    `
    );
    break;
}
