"use strict";
const Book = require("../models/Book");

module.exports.create = (event, context, callback) => {
  Book.create(JSON.parse(event.body))
    .then(book =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(book)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not create the book."
      })
    );
};

module.exports.getOne = (event, context, callback) => {
  Book.findById(event.pathParameters.id)
    .then(book =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(book)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not fetch the book."
      })
    );
};

module.exports.getAll = (event, context, callback) => {
  Book.find()
    .then(books =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(books)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not fetch the books."
      })
    );
};

module.exports.update = (event, context, callback) => {
  Book.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
    new: true
  })
    .then(book =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(book)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not update the book."
      })
    );
};

module.exports.delete = (event, context, callback) => {
  Book.findByIdAndRemove(event.pathParameters.id)
    .then(book =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Removed book with isbn: " + book.isbn,
          book: book
        })
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not delete the book."
      })
    );
};
