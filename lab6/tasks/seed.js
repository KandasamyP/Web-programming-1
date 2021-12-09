const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const books = data.books;
const reviews = data.reviews;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

 const data1 = await books.create("Dark", {"authorFirstName":"Kandasamy", "authorLastName": "King"}, ["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"],
    "1/28/1977",
    "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.."
  );
  const data2 = await books.create("Friends", {"authorFirstName": "Stephen", "authorLastName": "King"}, ["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"],
    "1/28/1977",
    "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.."
    );
  await reviews.create(data1._id, "This book scared me to death!!", "scaredycat", 5, "10/7/2020", "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best work!");

  const data3 = await books.create("Friends", {"authorFirstName": "Stephen", "authorLastName": "King"}, ["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"],
  "1/28/1977",
  "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.."
  );
  await reviews.create(data2._id, "This book scared me to death!!", "scaredycat", 5, "10/7/2020", "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best work!");


  console.log("Done seeding !!!");
  await db.serverConfig.close();
}

main();