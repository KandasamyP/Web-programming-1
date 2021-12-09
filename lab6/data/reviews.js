const mongoCollections = require('../config/mongoCollections');
let { ObjectId } = require('mongodb');
const books = mongoCollections.books;
const booksData = require("./books")

function isValidDate(date) {
    var temp = date.split('/');
    if(temp.length > 2) {
        if(temp[2].length != 4) {
           return false;
        }
        var d = new Date(temp[2] + '/' + temp[0] + '/' + temp[1]);
        return (d && (d.getMonth() + 1) == temp[0] && d.getDate() == Number(temp[1]) && d.getFullYear() == Number(temp[2]));
    } else {
        return false;
    }
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
    const booksCollection = await books();   
    
    const book =  await booksCollection.findOne({ "reviews": { $elemMatch: { _id: objId } }});
    if(book === null) {
        throw new Error("NO Review found in database for the given ID");
    }

    const reviewDetail = book.reviews.filter(element => {
        if(element._id == id)
          return element;     
    });

    if(reviewDetail !== null && reviewDetail.length > 0) {
        reviewDetail[0]._id = reviewDetail[0]._id.toString();
        reviewDetail[0].dateOfReview = new Date(reviewDetail[0].dateOfReview);
        reviewDetail[0].dateOfReview = "" + (reviewDetail[0].dateOfReview.getMonth() + 1) + "/" + reviewDetail[0].dateOfReview.getDate() + "/" + reviewDetail[0].dateOfReview.getFullYear();

        return reviewDetail[0];
    }
    else 
        throw new Error("NO Review found in database for the given ID");
}

async function getAll(id) {
    if(id === undefined || id === null) {
        throw new Error("Id value is needed");
    } else if(typeof id !== 'string') {
        throw new Error("Id value should of string type");
    } else if(id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 
    const objId = ObjectId(id);

    const booksCollection = await books();

    const allReviewsInBook = await booksData.get(objId);
    if(allReviewsInBook === null) {
        throw new Error("NO book and review found in database for the given ID");
    }

    if(allReviewsInBook.reviews) {
        if(allReviewsInBook.reviews.length == 0)
            throw new Error("NO reviews added for book in database for the given ID");
    }

    allReviewsInBook.reviews.map(value => {
        return value._id = value._id.toString();
    });

    return allReviewsInBook.reviews;
}

async function create(id, title, reviewer, rating, dateOfReview, review) {

    if(id=== undefined || id === null || title === undefined || title === null || reviewer === undefined || reviewer === null || rating === undefined || rating === null || dateOfReview === undefined || dateOfReview === null || review === undefined || review === null) {   
        throw new Error(" Argument is needed to create collection");
    } else if(typeof id != 'string' || typeof title !== "string" || typeof reviewer !== "string" || typeof dateOfReview !== "string" || typeof review !== "string" ) {
        throw new Error("ID, Title, Reviewer, dateOfReview, Review argument value should be of string type");
    } else if(id.trim().length == 0 || title.trim().length == 0 || reviewer.trim().length == 0 || dateOfReview.trim().length == 0 || review.trim().length == 0) {
        throw new Error("ID, Title, Reviewer, dateOfReview, Review argument value should not contain empty string");
    } else if(typeof rating != "number") {
        throw new Error("Rating argument should have number type as value");
    } else if(!(Math.floor(rating) === rating)) {
        throw new Error("Rating argument value should be whole number from 1 - 5");
    } else if (rating < 1 || rating > 5) {
        throw new Error("Rating argument value should have range of value from 1 - 5");
    } else if(!isValidDate(dateOfReview)) {
        throw new Error("dateOfReview argument should be in format of MM/DD/YYYY format");
    }

    title = title.trim();
    reviewer = reviewer.trim();
    review = review.trim();
    dateOfReview = new Date(dateOfReview);

    let newReview = {
        title,         
        reviewer, 
        rating,
        dateOfReview, 
        review
    };
    newReview._id = ObjectId();

    const bookId = ObjectId(id);
    const booksCollection = await books();
    const booksAdded = await booksCollection.findOne({ _id: bookId });

    if (booksAdded === null) 
        throw new Error('No book with the id in database');   

    booksAdded.reviews.push(newReview);

    const updatedInfo = await booksCollection.updateOne(
        { _id: bookId },
        { $set: booksAdded }
      );
  
    if (updatedInfo.modifiedCount === 0) {
        throw new Error('Could not update review successfully');
    }

    return await booksData.get(bookId);
}


async function remove(id) {
    if(!id) {
        throw new Error("Id value is needed");
    } else if(typeof id !== 'string') {
        throw new Error("Id value should of string type");
    } else if(id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 

    const objId = ObjectId(id);
    const booksCollection = await books();  
    const bookDetail = await booksCollection.findOne({ 'reviews._id': objId });  
    if(bookDetail === null) {
        throw new Error("NO review found in database for the given ID to remove");
    }

    const book = booksCollection.updateOne({ _id: ObjectId(bookDetail._id) }, { $pull: { reviews: { _id: objId } } });

    if(book.modifiedCount === 0) {
        throw new Error("NO reviews found in database for the given ID to remove");
    }   

    return {"reviewId": objId.toString(), "deleted": true}
}


module.exports = {
    create,
    getAll,
    get,
    remove
}