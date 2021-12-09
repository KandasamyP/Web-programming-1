const express = require('express');
const router = express.Router();
const data = require('../data');
const booksData = data.books;
let { ObjectId } = require('mongodb');


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
  const result = genre.some((element, index) => {return genre.indexOf(element) !== index});
  if(result)
      throw new Error("Genre array should not have duplicate value in request");

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


router.get('/', async (req, res) => {
  try {
    const booksList = await booksData.getAll();
    res.json(booksList);
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

router.get('/:id', async (req, res) => {
  try {
    if(req.params.id === undefined || req.params.id === null) {
      throw new Error("Id value is needed");
    } else if(typeof req.params.id !== 'string') {
        throw new Error("Id value should of string type");
    } else if(req.params.id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 
    ObjectId(req.params.id);
  } catch (e) {
    res.status(400).json({ error: e.message});
    return;
  }

  try {
    const book = await booksData.get(req.params.id);
    res.json(book);
    return;
  } catch (e) {
    res.status(404).json({ error: e.message });
    return;
  }
});

router.post('/', async (req, res) => {
  try { 
    if(Object.keys(req.body).length != 5) {
      throw new Error("Only Title, Author, Genre, datePublished, Summary is expected in request");
    }
    postPutErrorCheck(req.body);
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }

  try {
    const { title, author, genre, datePublished, summary } = req.body;
    const newPost = await booksData.create(title, author, genre, datePublished, summary);
    res.json(newPost);
    return;
  } catch (e) {
    res.status(404).json({ error: e.message });
    return;
  }
});

router.put('/:id', async (req, res) => {
  try { 
    if(req.params.id === undefined || req.params.id === null) {
      throw new Error("Id value is needed");
    } else if(typeof req.params.id !== 'string') {
        throw new Error("Id value should of string type");
    } else if(req.params.id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 
    ObjectId(req.params.id);

    if(Object.keys(req.body).length != 5) {
      throw new Error("Only Title, Author, Genre, datePublished, Summary is expected in request");
    }
    postPutErrorCheck(req.body);

  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }

  try {
    const updatedBook = await booksData.update(req.params.id, req.body);
    res.json(updatedBook);
    return;
  } catch (e) {
    res.status(404).json({ error: e.message });
    return;
  }
});

router.patch('/:id', async (req, res) => { // fix me: do we have to check empty values ?
  const requestBody = req.body;
  let updatedObject = {};

  try { 
    if(req.params.id === undefined || req.params.id === null) {
      throw new Error("Id value is needed");
    } else if(typeof req.params.id !== 'string') {
        throw new Error("Id value should of string type");
    } else if(req.params.id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 
    ObjectId(req.params.id);

    if(Object.keys(requestBody).length < 1) {
      throw new Error("To perform PATCH request atleast one field of db schema is needed");
    }

    if(Object.keys(requestBody).length > 5) {
      throw new Error("Only Title, Author, Genre, datePublished, Summary is expected in request");
    }

    if(!requestBody.title && !requestBody.author && !requestBody.genre && !requestBody.datePublished && !requestBody.summary) 
      throw new Error("Only Title, author, genre, datePublished, summary fields are expected to perform request");

    for(let i=0; i<Object.keys(requestBody).length; ++i) {
      if(Object.keys(requestBody)[i] != "title" && Object.keys(requestBody)[i] != "author" && Object.keys(requestBody)[i] != "genre" && Object.keys(requestBody)[i] != "datePublished" && Object.keys(requestBody)[i] != "summary")
          throw new Error("Only Title, author, genre, datePublished, summary fields are expected to perform request");
    }

    if(requestBody.title && typeof requestBody.title !== "string") {
      throw new Error("Title argument value should be of string type");
    } 
  
    if(requestBody.author) {
      if(!isObject(requestBody.author))
        throw new Error("Author argument should have object type as value");

      if(Object.keys(requestBody.author).length == 0)
        throw new Error("Author argument should have only either authorFirstName or authorLastName or both");

      for(let i=0; i<Object.keys(requestBody.author).length; ++i) {
        if(Object.keys(requestBody.author)[i] != "authorFirstName" && Object.keys(requestBody.author)[i] != "authorLastName")
            throw new Error("Only authorFirstName and authorLastName is expected in author argument to process request");
      }

      if(Object.keys(requestBody.author).length > 2)
        throw new Error("Author argument should have only either authorFirstName or authorLastName or both");
    }
  
    if(requestBody.genre) {
     if(genreCheck(requestBody.genre)) {
        throw new Error("Genre argument value should be of Array type");
      }
    }
  
    if(requestBody.datePublished) {
      if( typeof requestBody.datePublished !== "string") {
        throw new Error("datePublished argument value should be of string type");
      } else if( requestBody.datePublished.trim().length == 0 ) {
          throw new Error("datePublished argument value should not contain empty string");
      } else if(!isValidDate(requestBody.datePublished)) {
          throw new Error("datePublished argument should be in format of MM/DD/YYYY format");
      }
    } 
    
    if (requestBody.summary) {
      if(typeof requestBody.summary !== "string")
        throw new Error("summary argument value should be of string type");
      else if (requestBody.summary.trim().length == 0 )
        throw new Error("summary argument value should not contain empty string");
    }

  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }

  try {
    const oldBookData = await booksData.get(req.params.id);

    if (requestBody.title && requestBody.title.trim() !== oldBookData.title)
      updatedObject.title = requestBody.title;
    if (requestBody.datePublished && requestBody.datePublished !== oldBookData.datePublished)
      updatedObject.datePublished = requestBody.datePublished;
    if (requestBody.summary && requestBody.summary.trim() !== oldBookData.summary)
      updatedObject.summary = requestBody.summary.trim();

    if (requestBody.author && !objEqual(requestBody.author, oldBookData.author)) {
      updatedObject.author = oldBookData.author;
      if(requestBody.author["authorFirstName"]) {
        updatedObject.author["authorFirstName"] = requestBody.author["authorFirstName"].trim();
      } 
      if(requestBody.author["authorLastName"]) {
        updatedObject.author["authorLastName"] = requestBody.author["authorLastName"].trim();
      } 
    }
      
    if (requestBody.genre && !arrayEqual(requestBody.genre, oldBookData.genre)) {
      updatedObject.genre = genreArrayValueComparision(requestBody.genre, oldBookData.genre);
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
    return;
  }

  if (Object.keys(updatedObject).length !== 0) {
    try {
      const updatedBook = await booksData.patchUpdate(
        req.params.id,
        updatedObject
      );
      res.json(updatedBook);
      return;
    } catch (e) {
      res.status(404).json({ error: e.message });
      return;
    }
  } else {
    res.status(400).json({error: 'No fields have been changed from their inital values, so no update has occurred'});
    return;
  }
});

router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply ID to delete record in DB' });
    return;
  }

  try {
    const deletedData = await booksData.remove(req.params.id);
    res.status(200).json(deletedData);
    return;
  } catch (e) {
    res.status(404).json({ error: e.message });
    return;
  }
});

module.exports = router;