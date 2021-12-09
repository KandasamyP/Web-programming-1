const mongoCollections = require('../config/mongoCollections');
let { ObjectId, ObjectID } = require('mongodb');
const books = mongoCollections.books;

isObject = (item) => {
    return (typeof item === "object" && !Array.isArray(item) && item !== null);
}

function isValidDate(date) {
    var temp = date.split('/');
    if(temp.length > 2) {
        if(temp[2].trim().length != 4) {
           return false;
        }
        var d = new Date(temp[2] + '/' + temp[0] + '/' + temp[1]);
        return (d && (d.getMonth() + 1) == temp[0] && d.getDate() == Number(temp[1]) && d.getFullYear() == Number(temp[2]));
    } else {
        return false;
    }
}
  
function genreCheck(genre) {
    if (!Array.isArray(genre)) {
        return true;
    }

    if(genre.length < 1) {
        throw new Error("Genre array should have atleast one genre value in it");
    }
    for(let i=0; i < genre.length; ++i) {
        if(typeof genre[i] == "string") {
            if(genre[i].trim().length === 0) {
                throw new Error("Genre array should not have empty string value in it");
            }
        } else {
            throw new Error("Genre should have string value");
        }
    }
    genre = genre.map(str => str.trim());
    const result = genre.some((element, index) => { return genre.indexOf(element) !== index });
    if(result)
        throw new Error("Genre array should not have duplicate value in it");

    return false;
}

function genrePatchCheck(genre) {
    if (!Array.isArray(genre)) {
        return true;
    }

    for(let i=0; i < genre.length; ++i) {
        if(typeof genre[i] == "string") {
            if(genre[i].trim().length === 0) {
                throw new Error("Genre array should not have empty string value in it");
            }
        } else {
            throw new Error("Genre should have string value");
        }
    }
    return false;
}

function authorCheck(author) {
    if(Object.keys(author).length == 0)
        throw new Error("authorFirstName and authorLastName is needed in author argument to process request");

    for(let i=0; i<Object.keys(author).length; ++i) {
        if(Object.keys(author)[i] != "authorFirstName" && Object.keys(author)[i] != "authorLastName")
            throw new Error("Only authorFirstName and authorLastName is expected in author argument to process request");
    }

    if(!author.authorFirstName)
        throw new Error("authorFirstName is needed in author argument to process request");
    if(!author.authorLastName)
        throw new Error("authorLastName is needed in author argument to process request");
    if(Object.keys(author).length > 2)
        return false;

    return true;
}

function objEqual(obj1, obj2) {
    const object1 = Object.keys(obj1);
    const object2 = Object.keys(obj2);

    if (object1.length !== object2.length) {
        return false;
    }

    for (let index of object1) {
        const val1 = obj1[index];
        const val2 = obj2[index];
        const isObjects = isObject(val1) && isObject(val2);
        if (isObjects && !objEqual(val1, val2) ||  !isObjects && val1.trim() !== val2.trim()) {
        return false;
        }
    }

    return true;
}

function arrayEqual(array1, array2) {
    if(array1.length !== array2.length)
        return false;
    for(let i=0; i < array1.length; ++i) {
        if(Array.isArray(array1[i]))
            array1[i].sort();
        if(Array.isArray(array2[i]))
            array2[i].sort();
    }
    array1.sort();
    array2.sort();
    for(let i=0; i < array1.length; ++i) {
        const isArrays = Array.isArray(array1[i]) && Array.isArray(array2[i]);
        if(isArrays && !arrayEqual(array1[i].sort(), array2[i].sort()) || !isArrays && array1[i].trim() !== array2[i].trim())
            return false;        
    }
    return true;
}

function genreArrayValueComparision(newArray, existingArray) {
    let toBeUpdatedArray = existingArray;
    newArray = newArray.map(str => str.trim());
    for(let i=0; i < newArray.length; ++i) {
        if(existingArray.indexOf(newArray[i]) < 0) {
            toBeUpdatedArray.push(newArray[i]);
        }
    }
    return toBeUpdatedArray;
}

function postPutErrorCheck (booksBodyData) {
    if (!booksBodyData.title) {
        throw new Error('You must provide books title');
    } else if(typeof booksBodyData.title !== "string") {
        throw new Error("Title argument value should be of string type");
    } else if( booksBodyData.title.trim().length == 0 ) {
        throw new Error("Title argument value should not contain empty string");
    } 

    if(!booksBodyData.author) {
        throw new Error('You must provide books author' );
    } else if(!isObject(booksBodyData.author)) {
        throw new Error("Author argument should have object type as value");
    } else if(!authorCheck(booksBodyData.author)) {
        throw new Error("Author argument should have only authorFirstName and authorLastName values");
    }

    if (!booksBodyData.genre) {
        throw new Error('You must provide books genre' );
    } else if(genreCheck(booksBodyData.genre)) {
        throw new Error("Genre argument value should be of Array type");
    }

    if (!booksBodyData.datePublished) {
        throw new Error('You must provide books datePublished' );
    } else if(typeof booksBodyData.datePublished !== "string") {
        throw new Error("datePublished argument value should be of string type");
    } else if( booksBodyData.datePublished.trim().length == 0 ) {
        throw new Error("datePublished argument value should not contain empty string");
    } else if(!isValidDate(booksBodyData.datePublished)) {
        throw new Error("datePublished argument should be in format of MM/DD/YYYY format");
    }

    if (!booksBodyData.summary) {
        throw new Error('You must provide books summary');
    } else if (typeof booksBodyData.summary !== "string") {
        throw new Error("summary argument value should be of string type");
    } else if (booksBodyData.summary.trim().length == 0 ) {
        throw new Error("summary argument value should not contain empty string");
    }
}

async function get(id) {  // fix me: check for tostring
    id = id.toString();
    if(id === undefined || id === null) {
        throw new Error("Id value is needed");
    } else if(typeof id !== 'string') {
        throw new Error("Id value should of string type");
    } else if(id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 
    const objId = ObjectId(id);
    const booksCollection = await books();   

    const book =  await booksCollection.findOne({ _id: objId });
    if(book === null) {
        throw new Error("NO book found in database for the given ID");
    }
    book.datePublished = new Date(book.datePublished);
    book.datePublished = "" + (book.datePublished.getMonth() + 1) + "/" + book.datePublished.getDate() + "/" + book.datePublished.getFullYear();
    book._id = book._id.toString();

    if(book.reviews) {
        if(book.reviews.length > 0) {  
            book.reviews.map(value => {
                value.dateOfReview = new Date(value.dateOfReview);
                value.dateOfReview = "" + (value.dateOfReview.getMonth() + 1) + "/" + value.dateOfReview.getDate() + "/" + value.dateOfReview.getFullYear();
            
                value._id = value._id.toString();
                return value;
            });
        }
    }

    return book;
}

async function getAll() {
    const booksCollection = await books();

    const allBooksList = await booksCollection.find({}).toArray();
    if(allBooksList === null)
        return [];

    const bookDisplay = allBooksList.map(value => {
        return {"_id": value._id.toString(), "title": value.title};
    });

    return bookDisplay ? bookDisplay : [];
}

async function create(title, author, genre, datePublished, summary) {
    if(title === undefined || title === null || author === undefined || author === null || datePublished === undefined || datePublished === null || summary === undefined || summary === null || genre === undefined || genre === null) {   
        throw new Error("title, author, genre, datePublished, summary Argument is needed to create collection");
    } else if(typeof title !== "string" || typeof summary !== "string" || typeof datePublished !== "string" ) {
        throw new Error("Title, Summary, datePublished argument value should be of string type");
    } else if( title.trim().length == 0 || summary.trim().length == 0 || datePublished.trim().length == 0) {
        throw new Error("Title, Summary, datePublished argument value should not contain empty string");
    } else if(!isObject(author)) {
        throw new Error("Author argument should have object type as value");
    } else if(!authorCheck(author)) {
        throw new Error("Author argument should have only authorFirstName and authorLastName values");
    } else if(genreCheck(genre)) {
        throw new Error("Genre argument value should be of Array type");
    } else if(!isValidDate(datePublished)) {
        throw new Error("datePublished should be in format of MM/DD/YYYY format");
    }

    title = title.trim();
    summary = summary.trim();
    genre = genre.map(str => str.trim());
    author.authorFirstName = author.authorFirstName.trim();
    author.authorLastName = author.authorLastName.trim();
    datePublished = new Date(datePublished);

    let newBook = {
        title,         
        author, 
        genre,
        datePublished, 
        summary
    };

    newBook.reviews = [];
    const booksCollection = await books();
    const insertInfo = await booksCollection.insertOne(newBook);
    

    if (insertInfo.insertedCount === 0) 
      throw new Error('Could not add books to the database');

    const newId = insertInfo.insertedId;

    return await this.get(newId);
}

async function update(id, updatedBook) {
    if(id === undefined || id === null) {
        throw new Error("Id value is needed");
    } else if(typeof id != 'string') {
        throw new Error("Id value should of string type");
    } else if(id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } else if(updatedBook === undefined || updatedBook === null) {
        throw new Error("Updated book value is needed to update in DB");
    } 
    ObjectID(id);
    
    if(Object.keys(updatedBook).length != 5) {
      throw new Error("Only Title, Author, Genre, datePublished, Summary is expected in request");
    }

    if(updatedBook.title === undefined || updatedBook.title === null || updatedBook.author === undefined || updatedBook.author === null || updatedBook.datePublished === undefined || updatedBook.datePublished === null || updatedBook.summary === undefined || updatedBook.summary === null || updatedBook.genre === undefined || updatedBook.genre === null) {   
        throw new Error("Title, Summary, datePublished, author, genre Argument is needed to create collection");
    } else if(typeof updatedBook.title !== "string" || typeof updatedBook.summary !== "string" || typeof updatedBook.datePublished !== "string" ) {
        throw new Error("Title, Summary, datePublished argument value should be of string type");
    } else if( updatedBook.title.trim().length == 0 || updatedBook.summary.trim().length == 0 || updatedBook.datePublished.trim().length == 0) {
        throw new Error("Title, Summary, datePublished argument value should not contain empty string");
    } else if(!isObject(updatedBook.author)) {
        throw new Error("Author argument should have object type as value");
    } else if(!authorCheck(updatedBook.author)) {
        throw new Error("Author argument should have only authorFirstName and authorLastName values");
    } else if(genreCheck(updatedBook.genre)) {
        throw new Error("Genre argument value should be of Array type");
    } else if(!isValidDate(updatedBook.datePublished)) {
        throw new Error("datePublished should be in format of MM/DD/YYYY format");
    }
    updatedBook.title = updatedBook.title.trim();
    updatedBook.summary = updatedBook.summary.trim();
    updatedBook.genre = updatedBook.genre.map(str => str.trim());
    updatedBook.author.authorFirstName = updatedBook.author.authorFirstName.trim();
    updatedBook.author.authorLastName = updatedBook.author.authorLastName.trim();
    updatedBook.datePublished = new Date(updatedBook.datePublished);

    const updatedBookData = {};   
    if (updatedBook.title) {
      updatedBookData.title = updatedBook.title;
    }
    if (updatedBook.author) {
      updatedBookData.author = updatedBook.author;
    }  
    if (updatedBook.genre) {
      updatedBookData.genre = updatedBook.genre;
    }
    if (updatedBook.datePublished) {
      updatedBookData.datePublished = updatedBook.datePublished;
    }
    if (updatedBook.summary) {
      updatedBookData.summary = updatedBook.summary;
    }

    const booksCollection = await books();    
    const book =  await this.get(id);
    updatedBookData.reviews = book.reviews;

    const objId = ObjectId(id);    
    const updatedInfo = await booksCollection.updateOne(
      { _id: objId },
      { $set: updatedBookData }
    );

    return await this.get(id);
}

async function patchUpdate(id, updatedBook) {
    if(id === undefined || id === null) {
        throw new Error("Id value is needed");
    } else if(typeof id != 'string') {
        throw new Error("Id value should of string type");
    } else if(id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } else if(updatedBook === undefined || updatedBook === null) {
        throw new Error("Updated book value is needed to update in DB");
    } 
    ObjectID(id);

    if(Object.keys(updatedBook).length < 1) {
        throw new Error("To perform PATCH request atleast one field of db schema is needed");
    }
   
    if(Object.keys(updatedBook).length > 5) {
        throw new Error("Only Title, Author, Genre, datePublished, Summary is expected in request");
    }

    if(!updatedBook.title && !updatedBook.author && !updatedBook.genre && !updatedBook.datePublished && !updatedBook.summary) 
      throw new Error("Only Title, author, genre, datePublished, summary fields are expected to perform request");

    if(updatedBook.title) {
        if(typeof updatedBook.title !== "string")
            throw new Error("Title argument value should be of string type");
        else if (updatedBook.title.trim().length == 0)
            throw new Error("Title argument value should not contain empty string");
           
        updatedBook.title = updatedBook.title.trim();
    } 
    
    if(updatedBook.author) {
        if(!isObject(updatedBook.author))
            throw new Error("Author argument should have object type as value");
        if(Object.keys(updatedBook.author).length == 0)
            throw new Error("Author argument should have only either authorFirstName or authorLastName or both");
    
        for(let i=0; i < Object.keys(updatedBook.author).length; ++i) {
            if(Object.keys(updatedBook.author)[i] != "authorFirstName" && Object.keys(updatedBook.author)[i] != "authorLastName")
                throw new Error("Only authorFirstName and authorLastName is expected in author argument to process request");
        }

        if(Object.keys(updatedBook.author).length > 2)
            throw new Error("Author argument should have either authorFirstName or authorLastName");

        
        if(updatedBook.author["authorFirstName"])
        updatedBook.author.authorFirstName = updatedBook.author.authorFirstName.trim();
        if(updatedBook.author["authorLastName"])
          updatedBook.author.authorLastName = updatedBook.author.authorLastName.trim();
    }
    
    if(updatedBook.genre) {
        if(genreCheck(updatedBook.genre)) {
            throw new Error("Genre argument value should be of Array type");
        }
    }
    
    if(updatedBook.datePublished) {
        if( typeof updatedBook.datePublished !== "string") {
            throw new Error("datePublished argument value should be of string type");
        } else if( updatedBook.datePublished.trim().length == 0 ) {
            throw new Error("datePublished argument value should not contain empty string");
        } else if(!isValidDate(updatedBook.datePublished)) {
            throw new Error("datePublished argument should be in format of MM/DD/YYYY format");
        }
        updatedBook.datePublished = new Date(updatedBook.datePublished);
    } 
    
    if (updatedBook.summary) {
        if(typeof updatedBook.summary !== "string")
            throw new Error("summary argument value should be of string type");
        else if (updatedBook.summary.trim().length == 0 )
            throw new Error("summary argument value should not contain empty string");

        updatedBook.summary = updatedBook.summary.trim();
    }
    
    const updatedBookData = {};   
    if (updatedBook.title) {
      updatedBookData.title = updatedBook.title;
    }
    if (updatedBook.author) {
      updatedBookData.author = updatedBook.author;
    }  
    if (updatedBook.genre) {
      updatedBookData.genre = updatedBook.genre;
    }
    if (updatedBook.datePublished) {
      updatedBookData.datePublished = updatedBook.datePublished;
    }
    if (updatedBook.summary) {
      updatedBookData.summary = updatedBook.summary;
    }

    const booksCollection = await books();    
    const book =  await this.get(id);
    updatedBookData.reviews = book.reviews;

    const objId = ObjectId(id);    
    const updatedInfo = await booksCollection.updateOne(
      { _id: objId },
      { $set: updatedBookData }
    );

    return await this.get(id);
}

async function remove(id) {
    if(!id) {
        throw new Error("Id value is needed");
    } else if(typeof id !== 'string') {
        throw new Error("Id value should of string type");
    } else if(id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 

    const booksCollection = await books();  
    const bookDetail = await this.get(id);  
    const objId = ObjectId(id);

    const book = await booksCollection.deleteOne({ _id: objId });
    if(book.deletedCount === 0) {
        throw new Error("NO book found in database for the given ID to remove");
    }   

    return {"bookId": bookDetail._id, "deleted": true};
}

module.exports = {
    create,
    getAll,
    get,
    update,
    remove,
    patchUpdate
}