"use strict";
const User = require("../models/User");
const utils = require("../utils");
const UserProfile = require("../models/UserProfile");
const uuidv4 = require("uuid/v4");

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

module.exports.login = (email, password, callback) => {
  User.findOne({ "profile.email": email })
    .then(user => {
      console.log(user);
      if (user) {
        utils.hashPassword(
          password,
          user.credentials.passwordSalt,
          (err, passwordHash) => {
            if (passwordHash == user.credentials.password.value) {
              const userProfile = {
                lastName: user.profile.lastName,
                firstName: user.profile.firstName,
                login: user.profile.login,
                email: user.profile.email
              };
              console.log(userProfile);

              return callback(null, userProfile);
            } else {
              return callback(null, null);
            }
          }
        );
      } else {
        return callback(null, null);
      }
    })
    .catch(err => err);
};

module.exports.register = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const newUser = body["newUser"];
  const plainPassword = body["password"];
  console.log(newUser);
  User.findOne({ email: newUser.email })
    .then(user => {
      console.log(user);
      if (user) {
        return callback(null, {
          statusCode: 403,
          headers: { "Content-Type": "text/plain" },
          body: "Email Already Exists"
        });
      } else {
        const passwordSalt = uuidv4();
        console.log(passwordSalt);
        utils.hashPassword(plainPassword, passwordSalt, (err, passwordHash) => {
          console.log(passwordHash);
          const credentials = {
            password: {
              value: passwordHash
            },
            passwordSalt: passwordSalt
          };
          const profile = newUser;
          const newUserModel = {
            profile: profile,
            credentials: credentials
          };
          User.create(newUserModel)
            .then(user => {
              const userProfile = user.profile;
              return callback(null, {
                statusCode: 200,
                body: JSON.stringify(userProfile)
              });
            })
            .catch(err => {
              return callback(null, {
                statusCode: err.statusCode || 500,
                headers: { "Content-Type": "text/plain" },
                body: "Error Creating User"
              });
            });
        });
      }
    })
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Internal Server Error"
      })
    );
};
