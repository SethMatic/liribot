// require("dotenv").config();

var action = process.argv[2];
var value = process.argv[3];
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotifyKeys);
var request = require("request");
var fs = require("fs");
switch (action) {
    
    case "spotify-this-song":
        invokeSpotify();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        random();
        break;
}

function invokeSpotify() {
    if (value === undefined){
        value = "The Box";
    }
    spotify.search({ type: 'track', query: value }, function(error, data) {
        if (error) {
            return console.log("Error occurred: " + error);
        } else {
            fs.writeFile('log.txt', "");
            var firstObject = data.tracks.items[0];
            console.log(firstObject.artists[0].name);
            console.log(firstObject.name);
            console.log(firstObject.external_urls.spotify);
            console.log(firstObject.album.name);
            fs.appendFile('log.txt', ("Song Title: " + firstObject.name + "\r\n" + "Artist Name: " + firstObject.artists[0].name + "\r\n" + "Listen: " + firstObject.external_urls.spotify + "\r\n" + "Album Name: " + firstObject.album.name + "\r\n"))
        }
    })
}
function movie() {
    if (value === undefined) {
        value = "Friday";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
           
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    })
}
function random() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log("Something is Trippin!" + error);
        } else {
            console.log(data);
            var text = data.trim().split(",");
            action = text[0];
            value = text[1];
            switch (action) {
                
                case "spotify-this-song":
                    invokeSpotify();
                    break;
                
            }
        }
    })
}