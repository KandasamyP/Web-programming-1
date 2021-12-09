const movies = require('./data/movies');
const connection = require('./config/mongoConnection');
let { ObjectId } = require('mongodb');

const main = async () => {

    const movie1 = await movies.create("Batman superman","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy", ["Tom", "Kandasamy"], {director: "Nolan", yearReleased: 2021});
    console.log(movie1);

    // const movie2 = await movies.create("Kaithi","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy", ["Parthasarathy", "Kandasamy"], {director: "Kandasamy", yearReleased: 2000});

    // const allMovies = await movies.getAll();   
    // console.log(allMovies);

    // const movie3 = await movies.create("Avengers","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy", ["Parthasarathy", "Kandasamy"], {director: "Kandasamy", yearReleased: 2000});
    // console.log(movie3);

    // const renamedMovie1 = await movies.rename(movie1._id, "Batman Begins");
    // console.log(renamedMovie1);

    // try {
    //     const removeMovieById = await movies.remove(movie2._id);
    //     console.log(removeMovieById);
    // } catch(e) {
    //     console.error(e);
    // }

    // const allMovieList = await movies.getAll();
    // console.log(allMovieList);

    // try {
    //     const movieError = await movies.create("Batman","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy", ["     ", "Kandasamy"], {director: "Nolan", yearReleased: 2021});
    // } catch(e) {
    //     console.error(e);
    // }

    // try {
    //     const removeMovieError = await movies.remove(ObjectId().toString());
    // } catch(e) {
    //     console.error(e);
    // }

    // try {
    //     const renameMovieError = await movies.rename(ObjectId().toString(), "Kandasamy and Ted Face the Music");
    // } catch(e) {
    //     console.error(e);
    // }

    // try {
    //     const renameMovieError = await movies.rename(ObjectId().toString(), ["Kandasamy and Ted Face the Music"]);
    // } catch(e) {
    //     console.error(e);
    // }
        
    // const movieById =  await movies.get(ObjectId().toString());
    // console.log(movieById);


    const db = await connection();
    await db.serverConfig.close();
};

main().catch(async (error) => {
  console.log(error);
  const db = await connection();
  await db.serverConfig.close();
});