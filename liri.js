require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios")
var moment = require("moment")
var Spotify = require("node-spotify-api")
var fs = require("fs")

var spotify = new Spotify(keys.spotify)

// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// capture command using process.argv[]

var command = process.argv[2];
var userInput = process.argv[3];

var concertThis = function () {

    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"

    axios.get(queryURL).then(function (response) {
        var venue = response.data[0].venue.name
        var location = response.data[0].venue.location
        var date = response.data[0].datetime
        date = moment(date).format("MM/DD/YYYY")
        console.log("Name of Venue: " + venue)
        console.log("Location: " + location)
        console.log("Date: " + date)
    })
    // *bonus: add for loop to display multiple concerts
}

var spotifyThis = function () {
    if (userInput == undefined) {
        userInput = 'The Sign'
    }

    spotify.search({ type: 'track', query: userInput }, function (err, data) {
        // Returns an error if there is one
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var artist = data.tracks.items[0].artists[0].name;
        var songName = userInput;
        var previewLink = data.tracks.items[0].artists[0].external_urls.spotify;
        var album = data.tracks.items[0].album.name;

        console.log("Artist: " + artist +
            "\nSong: " + songName +
            "\nAlbum: " + album +
            "\nLink: " + previewLink)
    });

}

var movieThis = function () {

    if (userInput === "") {
        userInput = "Mr. Nobody";
    };

    // If the user doesn't type a movie in, the program will output data for the movie'Mr. Nobody.'

    var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy";

    axios.get(queryURL).then(function (response) {
        var title = response.data.Title;
        var year = response.data.Year;
        var imdb = response.data.Ratings[0].Value;
        var tomatoes = response.data.Ratings[1].Value;
        var country = response.data.Country;
        var language = response.data.Language;
        var plot = response.data.Plot;
        var actors = response.data.Actors;

        console.log("Title: " + title);
        console.log("Year: " + year);
        console.log("IMDB Rating: " + imdb);
        console.log("Rotten Tomatoes Rating: " + tomatoes)
        console.log("Country: " + country);
        console.log("Language: " + language);
        console.log("Plot: " + plot);
        console.log("Actors: " + actors);
    });
};

var doThis = function () {
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.  
    // Edit the text in random.txt to test out the feature for movie-this and concert-this.
    fs.readFile("./random.txt", "utf8", function (err, data) {
        // save the data from the readfile as variables so that we can call the correct function
        var dataArr = data.split(",")
        command = dataArr[0];
        userInput = dataArr[1];
                // run our switch case based on the data in the random.txt file
        determineTask();
    })

};

var determineTask = function () {

    switch (command) {
        case "concert":
            concertThis();
            break;
        case "spotify":
            spotifyThis();
            break;
        case "movie":
            movieThis();
            break;
        case "do-this":
            doThis();
            break;
        default:
            console.log("not a valid input")

    }
};

determineTask();