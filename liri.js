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
let artist = process.argv.slice(3).join(" ");
let cliriQuery = process.argv[2];

// process.argv.slice(2).join('%20)
const searchBand = band => {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${band}/events?app_id=${process.env.BANDS_IN_TOWN_API_KEY}`
    )
    .then(response => {
      // console.log(response.data.length)
      if(response.data.length === 0) {
        console.log(`Sorry, ${artist} has no upcoming concerts`)
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
      console.log(data.name);
      console.log(data.artists[0].name);
      console.log(data.album.name);
      console.log(data.preview_url);
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
      console.log("title: ", movies.data.Title);
      console.log("Rating: ", movies.data.Rated);
      console.log("IMDB Rating: ", movies.data.imdbRating);
      console.log("RT Score: ", movies.data.Ratings[1].Value);
      console.log("Country: ", movies.data.Country);
      console.log("Language: ", movies.data.Language);
      console.log("Plot: ", movies.data.Plot);
      console.log("Actors: ", movies.data.Actors);
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
    artist = dataArray[1];
    console.log(cliriQuery, artist);
  });
};

  switch (cliriQuery) {
    case "concert-this":
      console.log(cliriQuery);
      searchBand(artist);
      break;

    case "spotify-this":
      console.log(cliriQuery);
      searchSong(artist);
      break;

    case "movie-this":
      console.log(cliriQuery);
      searchMovie(artist);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("type a valid command");
      break;
  }
