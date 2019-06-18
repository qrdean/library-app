const Roles = require("../models/Roles");

module.exports.addRole = (id, role, callback) => {
  const payload = { userId: id, role: role };
  Roles.create(payload)
    .then(role =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(role)
      })
    )
    .catch(err => {
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not create Role"
      });
    });
};

module.exports.getById = (id, context, callback) => {
  Roles.findOne({ userId: id })
    .then(role => {
      if (role) {
        return callback(null, {
          statusCode: 200,
          body: role
        });
      } else {
        return callback(null, {
          statusCode: 404,
          body: "Role not found"
        });
      }
    })
    .catch(err => {
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Error: Could not get role"
      });
    });
};

module.exports.deleteRole = (id, context, callback) => {
  Roles.findOneAndDelete({ userId: id })
    .then(role => {
      if (role) {
        return callback(null, {
          statusCode: 200,
          body: "Role Deleted"
        });
      }
    })
    .catch(err => {
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Error: Could not delete role"
      });
    });
};
