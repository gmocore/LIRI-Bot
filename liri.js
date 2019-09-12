const dotenv = require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");
const omdb = require("omdb");
const fs = require("fs");
const spotify = new Spotify({
  id: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_CLIENT_SECRET
});
let input = process.argv.slice(3).join(" ");
let cliriQuery = process.argv[2];

const searchBand = band => {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${band}/events?app_id=${process.env.BANDS_IN_TOWN_API_KEY}`
    )
    .then(response => {
      // console.log(response.data.length)
      if(response.data.length === 0) {
        console.log(`Sorry, ${input} has no upcoming concerts`)
      }
      response.data.forEach(item => {
        console.log(
          `venue name: ${item.venue.name} city: ${item.venue.city} state: ${
            item.venue.region
          } time: ${moment(item.datetime).format("MM/DD/YYYY")}`
        );
      });
      // console.log(response.data);
    })
    .catch(err => {
      console.log("Error: ", err.code);
    });
};

const searchSong = songName => {
  spotify
    .search({ type: "track", query: songName, limit: 5 })
    .then(response => {
      if(response.tracks.total === 0) {
        return console.log(`${songName} is not a valid song, try typing it correctly, or choosing a song that isn't by one of your friends`)
      }
      let data = response.tracks.items[0];
      console.log(`
      Artist: ${data.artists[0].name}
      Song: ${data.name}
      Album: ${data.album.name}
      Preview: ${data.preview_url}
      `)
    })
    .catch(err => {
      console.log("Error: ", err);
    });
};

const searchMovie = movie => {
  axios
    .get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${movie}`
    )
    .then(movies => {
      if(movies.data.Error) {
        
        return console.log(movies.data.Error, 'try typing it correctly?')
      }
    
      console.log(`
        Title: ${movies.data.Title}
        Rating: ${movies.data.Rated}
        IMDB Rating: ${movies.data.imdbRating}
        RT Score: ${movies.data.Ratings[1].Value}
        Country: ${movies.data.Country}
        Langauge: ${movies.data.Language}
        Plot: ${movies.data.Plot}
        Actors: ${movies.data.Actors}
      `)
    })
    .catch(err => {
      console.log(err);
    });
};

const doWhatItSays = () => {
  fs.readFile("random.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }

    let dataArray = data.split(",");
    cliriQuery = dataArray[0];
    input = dataArray[1];
    
    
    
    searchSong(input)
    console.log(cliriQuery, input)
  });
};

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
      console.log("type a valid command");
      break;
  }
