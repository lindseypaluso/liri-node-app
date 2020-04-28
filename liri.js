require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios")

//var spotify = new Spotify(keys.spotify);

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
    
    axios.get(queryURL).then(function(response) {
        var venue = response.data[0].venue.name
        var location = response.data[0].venue.location
        var date = response.data[0].datetime
        console.log(venue + location + date)
    })
   
    // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
    // Name of the venue   
    
    // Venue location 
    // Date of the Event (use moment to format this as "MM/DD/YYYY")

    // Important: There is no need to sign up for a Bands in Town api_id key. Use the codingbootcamp as your app_id. For example, the URL used to search for "Celine Dion" would look like the following:

    // https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp
}

switch (command) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        // code block for spotify
        break;
    case "movie-this":
        // code block for movie-this
        break;
    case "do-what-it-says":
        // code block for do what it says
        break;
    default:
        console.log("not a valid input")

}