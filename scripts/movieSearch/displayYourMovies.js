//author Kristen Norris
//Functionality: gets the user's tracked movies and displays them on the DOM

const $ = require("jquery")
const movieCard = require("./movieCard")
// const mainDB = require("./movieFactory")


const displayYourMovies = Object.create(null, {
    "init": {
        value: function () {
            $.ajax({
                "url": "./scripts/movieSearch/testMovieDB.json",
                "method": "GET"
            }).then( movieDB => {
                const authorized = require("../authorization/authorization")                
                $.ajax({
                    "url": "./scripts/movieSearch/testUserDB.json",
                    "method": "GET"
                }).then( userMoviesDB => {
                    //iterate through userMovies and if the userId equals the current authorized user then iterate through the trackMovies database to build a string of movies to add to the DOM
                    userMoviesDB.userMovie.forEach( yourMovie => {
                        const activeUserId = authorized.activeUser.uid
                        if(activeUserId === yourMovie.userId) { //the authorized user id is equal to the userId on the userMovie database
                            movieDB.trackedMovies.forEach( currentMovie => { //iterate through the movies in the trackedMovies database

                                if(currentMovie.movieId === yourMovie.movieId) { //when the movie id in the trackedMovies database equals the movieId on the userMovie database
        
                                    //use the imported movieCard function to create a movie card and append it to the searchYourMovies section of the DOM
                                    movieCard(currentMovie)
                
                                    //if the movie has been watched add the rating. If not, add a link to allow users to mark when they've watched it
                                    if(yourMovie.watched === true) {
                                        //adds movie rating and adds the class of "watched" to the movie card 
                                        $(`#movie_${currentMovie.movieId}`).addClass("watched").append(`
                                        <div>
                                            <p id="movie_rating">Rating: ${yourMovie.rating}</p> //change to display stars
                                        </div>
                                        `)
                                    } else {
                                        //adds link to mark when user watches the movie and adds the class of "unwatched" to the movie card
                                        $(`#movie_${currentMovie.movieId}`).addClass("unwatched").append(`
                                        <div>
                                            <a href="#" id="movie_watched">Watched</a>
                                        </div>
                                        `)
                                    }
                                }
                                
                            })
                            
                        }
                        
                    })
                })
            })
        }
    },
    "watched": { //if watched value is true then display movie
        value: ""
    },
    "unwatched": { //if watched value is false then display movie
        value: ""
    }
})


module.exports = displayYourMovies


