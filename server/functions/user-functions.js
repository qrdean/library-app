"use strict";
const User = require("../models/User");

module.exports.create = (event, context, callback) => {
  User.create(JSON.parse(event.body))
    .then(user =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(user)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not create the user."
      })
    );
};

module.exports.getOne = (event, context, callback) => {
  User.findById(event.pathParameters.id)
    .then(user =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(user)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not fetch the user."
      })
    );
};

module.exports.getAll = (event, context, callback) => {
  User.find()
    .then(users =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(users)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not fetch the users."
      })
    );
};

module.exports.update = (event, context, callback) => {
  User.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
    new: true
  })
    .then(user =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(user)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not update the user."
      })
    );
};

module.exports.delete = (event, context, callback) => {
  User.findByIdAndRemove(event.pathParameters.id)
    .then(user =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Removed user with _id: " + user._id,
          user: user
        })
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not delete the user."
      })
    );
};
