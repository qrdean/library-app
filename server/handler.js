"use strict";
require("dotenv").config({ path: "./variables.env" });
const Note = require("./models/Note");
const BookFunctions = require("./functions/book-functions");
const UserFunctions = require("./functions/user-functions");
const connectToDatabase = require("./db");

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Note.create(JSON.parse(event.body))
      .then(note =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(note)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not create the note."
        })
      );
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Note.findById(event.pathParameters.id)
      .then(note =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(note)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the note."
        })
      );
  });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Note.find()
      .then(notes =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(notes)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the notes."
        })
      );
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Note.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
      new: true
    })
      .then(note =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(note)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the notes."
        })
      );
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Note.findByIdAndRemove(event.pathParameters.id)
      .then(note =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: "Removed note with id: " + note._id,
            note: note
          })
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the notes."
        })
      );
  });
};

module.exports.createBook = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    BookFunctions.create(event, context, callback);
  });
};

module.exports.getOneBook = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    BookFunctions.getOne(event, context, callback);
  });
};

module.exports.getAllBooks = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    BookFunctions.getAll(event, context, callback);
  });
};

module.exports.updateBook = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    BookFunctions.update(event, context, callback);
  });
};

module.exports.deleteBook = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    BookFunctions.delete(event, context, callback);
  });
};

module.exports.createUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    UserFunctions.create(event, context, callback);
  });
};
