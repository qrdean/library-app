const fs = require("fs");
const jwt = require("jsonwebtoken");
const users = require("./user-functions");

const JWT_EXPIRATION_TIME = "60m";
const JWT_SECRET = fs.readFileSync("./private.key", "utf8");

/**
 * POST /login
 *
 * Returns a JWT, given a username and password.
 * @method login
 * @param {String} event.body.email
 * @param {String} event.body.password
 * @throws Returns 401 if the user is not found or password is invalid.
 * @returns {Object} jwt that expires in 60 mins
 */
module.exports.handler = (event, $options, callback) => {
  const { email, password } = JSON.parse(event.body);
  const signOptions = {
    expiresIn: JWT_EXPIRATION_TIME,
    algorithm: "RS256"
  };

  try {
    // Authenticate user
    users.login(email, password, (err, result) => {
      if (result) {
        const user = result;
        const payload = {
          profile: user.userProfile,
          role: user.role
        };
        // Issue JWT
        const token = jwt.sign(payload, JWT_SECRET, signOptions);
        const expirationTime = JWT_EXPIRATION_TIME.split("m").join("");
        const bodyPayload = {
          token: token,
          expiresIn: expirationTime
        };
        const response = {
          // Success response
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(bodyPayload)
        };

        // Return response
        return callback(null, response);
      } else {
        const response = {
          statusCode: 401,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
            error: "Unauthorized"
          })
        };
        return callback(null, response);
      }
    });
  } catch (e) {
    const response = {
      // Error response
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        error: e.message
      })
    };
    callback(null, response);
  }
};
