var option = process.argv[2];
// var option2 = process.argv[3];
var fullOption = process.argv;
var input = "";

var request = require("request");
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var getKeys = require("./keys.js");
var keyTwitter = getKeys.twitterKeys;
var keySpotify = getKeys.spotifyKeys;
var count = 0;
var fs = require("fs");
var clientSpotify = new Spotify(keySpotify);
var clientTwitter = new Twitter(keyTwitter);

for (var i = 3; i < fullOption.length; i++) {
  input = input + " " + fullOption[i];
}

logic(option, input);

function logic(option, input){
if (option == "my-tweets"){
    if (count < 20){
        twit();
        count++;
    }
} else if (option == "spotify-this-song"){
    artist();
}else if (option == "movie-this"){
    movie();
} else if (option == "do-what-it-says"){
    function textFile(){
    fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
    return console.log(error);
  }
  console.log(data);
  var dataArr = data.split(",");
  input = dataArr[1];
  option = dataArr[0];
});
}}
}


function movie(data){
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=40e9cece";
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {

    console.log("--------------------------"); 
    console.log("Title: " + JSON.parse(body).Title);
    console.log("--------------------------"); 
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("--------------------------"); 
    console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
    console.log("--------------------------"); 
    console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1]);
    console.log("--------------------------"); 
    console.log("Country where the movie was produced: " + JSON.parse(body).Country);
    console.log("--------------------------"); 
    console.log("Language of the movie: " + JSON.parse(body).Language);
    console.log("--------------------------"); 
    console.log("Plot of the movie: " + JSON.parse(body).Plot);
    console.log("--------------------------"); 
    console.log("Actors in the movie: " + JSON.parse(body).Actors);
    console.log("--------------------------"); 
    
  }
});

}



function artist (data){
    clientSpotify.search({ type: 'track', query: input, data})
  .then(function(response) {
    console.log("--------------------------"); 
    console.log("Artist: " + response.tracks.items[1].artists[0].name);
    console.log("--------------------------");
    console.log("Song Name: " + response.tracks.items[1].name);
    console.log("--------------------------");
    console.log("A preview link of the song from Spotify: " + response.tracks.items[3].preview_url);
    console.log("--------------------------");
    console.log(response.tracks.items[0].album.name);
    console.log("--------------------------");
  })
  .catch(function(err) {
    console.log(err);
  });
}

function twit(){
clientTwitter.get('statuses/user_timeline', {screen_name: 'tintime192'}, function(error, tweets, response) {
   if (!error){
       for (var i = 0; i < tweets.length; i++){
           console.log(tweets[i].created_at, tweets[i].text);
       }
    }else{
            console.log(error);
       }
   }
)};

// clientTwitter.stream("statuses/filter", {track: 'Donald Trump'}, function(stream) {
//   stream.on('data', function(event) {
//     console.log(event && event.text);
//   });
 
//   stream.on('error', function(error) {
//     console.log(error);
//   });
// });