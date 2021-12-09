const mongoCollections = require('../config/mongoCollections');
let { ObjectId } = require('mongodb');
const movies = mongoCollections.movies;

isObject = (item) => {
    return (typeof item === "object" && !Array.isArray(item) && item !== null);
}

function castCheck(cast) {
    if (!Array.isArray(cast)) {
        return true;
    }

    for(let i=0; i< cast.length; ++i) {
        if(typeof cast[i] == "string") {
            if(cast[i].trim().length === 0) {
                throw new Error("Cast array should not have empty string value in it");
            }
        } else {
            throw new Error("Cast should have string value");
        }
    }

    return false;
}

async function create(title, plot, rating, runtime, genre, cast, info) {

    if(title === undefined || title === null || plot === undefined || plot === null || rating === undefined || rating === null || runtime === undefined || runtime === null || genre === undefined || genre === null || cast === undefined || cast === null || info === undefined || info === null) {   
        throw new Error(" Argument is needed to create collection");
    } else if(typeof title !== "string" || typeof plot !== "string" || typeof rating !== "string" || typeof runtime !== "string" || typeof genre !== "string" ) {
        throw new Error("Title, Plot, Rating, Runtime, Genre argument value should be of string type");
    } else if( title.trim().length == 0 || plot.trim().length == 0 || rating.trim().length == 0 || runtime.trim().length == 0 || genre.trim().length == 0 ) {
        throw new Error("Title, Plot, Rating, Runtime, Genre argument value should not contain empty string");
    } else if (castCheck(cast)) {
        throw new Error("Cast argument value should be of Array type");
    } else if(!isObject(info)) {
        throw new Error("Info argument should have object type as value");
    } else if(info['director'] == undefined || info['director'] == null) {
        throw new Error("Info director key should be defined in Info object");
    } else if(typeof info['director'] !== "string") {
        throw new Error("Info director key should be defined in Info object");
    } else if(info['director'].trim().length == 0) {
        throw new Error("Info director key should have value in it");
    } else if(info['yearReleased'] == undefined || info['yearReleased'] == null) {
        throw new Error("Info yearRelased should be defined in Info object");
    } else if(typeof info['yearReleased'] != "number") {
        throw new Error("Info yearRelased should have number type as value");
    } else if(info['yearReleased'] < 1000 || info['yearReleased'] > 9999) {
        throw new Error("Info yearRelased should be of 4 digit number");
    } else if(info['yearReleased'] < 1930 || info['yearReleased'] > new Date().getFullYear() + 5) {
        throw new Error("Info yearRelased is not in valid range");
    }

    let newMovie = {
        title,         
        plot, 
        rating,
        runtime, 
        genre,
        cast, 
        info
    };

    const moviesCollection = await movies();
    const insertInfo = await moviesCollection.insertOne(newMovie);

    if (insertInfo.insertedCount === 0) 
      throw new Error('Could not add movies to the database');

    const newId = insertInfo.insertedId;
    const movieAdded = await moviesCollection.findOne({ _id: newId });

    if (movieAdded === null) 
        throw new Error('No movie with the id in database');

    movieAdded._id = movieAdded._id.toString();
    return movieAdded;
}

async function getAll() {
    const moviesCollection = await movies();

    const allMovieList = await moviesCollection.find({}).toArray();
    if(allMovieList === null)
        return [];

    allMovieList.map(value => {
        return value._id = value._id.toString();
    });

    return allMovieList;
}

async function get(id) {  
    if(id === undefined || id === null) {
        throw new Error("Id value is needed");
    } else if(typeof id !== 'string') {
        throw new Error("Id value should of string type");
    } else if(id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 
    const objId = ObjectId(id);
    const moviesCollection = await movies();   

    const movie =  await moviesCollection.findOne({ _id: objId });
    if(movie === null) {
        throw new Error("NO movie found in database for the given ID");
    }

    movie._id = movie._id.toString();
    return movie;
}

async function remove(id) {
    if(!id) {
        throw new Error("Id value is needed");
    } else if(typeof id !=   'string') {
        throw new Error("Id value should of string type");
    } else if(id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 

    const objId = ObjectId(id);
    const moviesCollection = await movies();  
    const movieDetail = await moviesCollection.findOne({ _id: objId });  
    if(movieDetail === null) {
        throw new Error("NO movie found in database for the given ID to remove");
    }

    const movie = await moviesCollection.deleteOne({ _id: objId });
    if(movie.deletedCount === 0) {
        throw new Error("NO movie found in database for the given ID to remove");
    }   

    return movieDetail.title + " has been successfully deleted";
}

async function rename(id, newTitle) {
    if(id === undefined || id === null) {
        throw new Error("Id value is needed");
    } else if(typeof id != 'string') {
        throw new Error("Id value should of string type");
    } else if(id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } else if(newTitle === undefined || newTitle === null) {
        throw new Error("New Title value is needed");
    } else if(typeof newTitle != 'string') {
        throw new Error("New Title value should of string type");
    } else if(newTitle.trim().length == 0) {
        throw new Error(" New Title value should not be empty");
    } 

    const objId = ObjectId(id);
    const moviesCollection = await movies();    
    const movie =  await moviesCollection.findOne({ _id: objId });

    if(movie === null) {
        throw new Error("NO movie found in database for the give ID to rename it.");
    }

    movie.title = newTitle;                         // Updating movie title

    const updatedInfo = await moviesCollection.updateOne(
      { _id: objId },
      { $set: movie }
    );

    if (updatedInfo.modifiedCount === 0) {
      throw new Error('could not update movie successfully');
    }

    const updatedMovie =  await moviesCollection.findOne({ _id: objId });    
    updatedMovie._id = updatedMovie._id.toString();

    return updatedMovie;
}

module.exports = {
    create,
    getAll,
    get,
    rename,
    remove
}