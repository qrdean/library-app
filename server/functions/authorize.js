const _ = require("lodash");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const utils = require("../utils");

const JWT_EXPIRATION_TIME = "60m";
const JWT_PUBLIC = fs.readFileSync("./public.key", "utf8");

// return a boolean whether or not a user is allowed to call a particular method
// A user with scopes: ['books'] can
// call get books
const authorizeUser = (userScopes, methodArn) => {
  const hasValidScope = _.some(userScopes, scope =>
    _.endsWith(methodArn, scope)
  );
  return hasValidScope;
};

/**
 * Authorizer functions are executed before your actual functions.
 * @method authorize
 * @param {String} event.authorizationToken - JWT
 * @throws Returns 401 if the token is invalid or has expired.
 * @throws Returns 403 if the token does not have sufficient permissions.
 */
module.exports.handler = (event, context, callback) => {
  console.log(event);
  const token = event.authorizationToken;
  console.log(token);
  const signOptions = {
    expiresIn: JWT_EXPIRATION_TIME,
    algorithm: ["RS256"]
  };
  try {
    // Verify JWT
    const decoded = jwt.verify(token, JWT_PUBLIC, signOptions);
    console.log(decoded);
    const user = decoded.user;
    console.log(user);

    // Checks if the user's scopes allow her to call the current function
    const isAllowed = authorizeUser(user.scopes, event.methodArn);

    const effect = isAllowed ? "Allow" : "Deny";
    const userId = user.email;
    const authorizerContext = { user: JSON.stringify(user) };
    // Returan an IAM policy document for the current endpoint
    const policyDocument = utils.buildIAMPolicy(
      userId,
      effect,
      event.methodArn,
      authorizerContext
    );

    callback(null, policyDocument);
  } catch (e) {
    callback("Unauthorized"); // Return a 401 Unauthorized response
  }
};
