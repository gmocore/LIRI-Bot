# CLIRI BOT

## Command Line Interpretation and Recognition Interface.

A command line application that uses information passed in from the command line to query various APIs.

### Installing

type `npm i` into the command line (in the same directory as the liri.js application) to install the required packages included in `package.json` prior to running this application.

### Prerequisites

To run this app, you will need API keys for: Bands in Town, OMDB Movie Database, and Spotify which are to be stored in a `.env` file to be accessed with the `dotenv` package.

## Instructions

type `node liri.js` followed by one of the following commands: `concert-this`, `spotify-this`, `movie-this`, or `do-what-it-says`followed by a search query.

Format:
`node` + `filename` + `command` + `search query`

Example:
`node liri.js spotify-this lazy eye`

`node liri.js concert-this` [band name] - will query the bands in town API and return upcoming concerts by:
concert venue, <br>
concert city, <br>
concert state, <br>
concert date (in MM/DD/YYYY format).

`node liri.js spotify-this` [song name] - will query Spotify API and return song information by:
artist name, <br>
song name, <br>
album, <br>
song preview url.

`node liri.js movie-this` [movie name] - will query OMDB API and return movie info by:
title, <br>
rating, <br>
IMDB score, <br>
RT score, <br>
country, <br>
langauge(s), <br>
plot, <br>
actors

`node liri.js do-what-it-says` (which is NOT followed by a user input value) will read the text from `random.txt` and perform a search based on the text in the file.

Example text from file:
`spotify-this,"Between the Bars"`

Will perform a Spotify search for Between the Bars by Elliott Smith, because, like me, you are really into sad music, and wouldn't have it any other way.

## Code Overview

`process.argv[2]` listens for one of the designated commands to be entered as `cliriQuery` and `process.argv.slice(3).join(" ")`assigns the search query to `input`which will be passed into the corresponding API request.

a switch statement is used to listen for `cliriQuery` input and will route the request to the appropriate function. If `cliriQuery` does not match one of the available commands, an error will be displayed tot he user.

the`axios` package is used to perform GET requests from BandsInTown and OMDB APIs and data is returned based on `input`. if `input` is a valid search it will display the results, otherwise, an error message is displayed to the user.

BandsInTown uses `moment.js` to parse returned UTC concert dates into a more readable format for the user.

the `node-spotify-api` package is a wrapper for the Spotify API which calls a `new Spotify`object to be instantiated. The instantiated object requires `id` and `secret` values. the `dotenv` package is used to access `id: process.env.SPOTIFY_CLIENT_ID` and `secret: process.env.SPOTIFY_CLIENT_SECRET` in the `.env` file to securely store all API keys.
Spotify `.search` method is used to query the API based on the value of `input`and returns data based on the song, or an error is displayed to the user if an invalid song search is passed in.

## Built With

### Languages

JavaScript, Node.js, JSON

### Packages/APIs

- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js

- [Dotenv](https://www.npmjs.com/package/dotenv) - a zero-dependency module that loads environment variables from a `.env` file into `process.env`

- [Spotify](https://www.npmjs.com/package/node-spotify-api) - A simple to use API library for the Spotify REST API.
- [OMDB](http://www.omdbapi.com/) - The Open Movie Database
- [Moment](https://www.momentjs.com) - Parse, validate, manipulate, and display dates and times in JavaScript
- [fs](https://nodejs.org/api/fs.html) - File System package built into Node.js to read from and write to files

## Authors

- **Gerritt Black** - _Backend, API, Scripting/Everything_ - [gmocore](https://github.com/gmocore)
