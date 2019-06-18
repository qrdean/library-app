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
  const apiOptions = parseARN(methodArn);
  const privileges = userScopes.find(scope => scope.path === apiOptions.path);
  if (privileges) {
    const restMethodArray = privileges.restMethods.filter(
      restMethod => restMethod === apiOptions.restMethod
    );
    const hasValidScope = restMethodArray.length > 0 ? true : false;
    return hasValidScope;
  }
  return false;
};

const parseARN = methodArn => {
  let apiOptions = {};
  let tmp = methodArn.split(":");
  let apiGatewayArnTmp = tmp[5].split("/");
  apiOptions.restApiId = apiGatewayArnTmp[0];
  apiOptions.stage = apiGatewayArnTmp[1];
  apiOptions.restMethod = apiGatewayArnTmp[2];
  apiOptions.path = apiGatewayArnTmp[3];
  return apiOptions;
};

const authorizations = userRole => {
  // admin
  const adminPrivileges = [
    {
      path: "books",
      restMethods: ["GET", "POST", "PUT", "DELETE"]
    }
  ];
  const userPrivileges = [
    {
      path: "books",
      restMethods: ["GET", "POST", "PUT"]
    }
  ];
  if (userRole == 1) {
    return adminPrivileges;
  } else if (useRole == 2) {
    return userPrivileges;
  }
  return [];
};

/**
 * Authorizer functions are executed before your actual functions.
 * @method authorize
 * @param {String} event.authorizationToken - JWT
 * @throws Returns 401 if the token is invalid or has expired.
 * @throws Returns 403 if the token does not have sufficient permissions.
 */
module.exports.handler = (event, context, callback) => {
  const token = event.authorizationToken;
  const signOptions = {
    expiresIn: JWT_EXPIRATION_TIME,
    algorithm: ["RS256"]
  };
  try {
    // Verify JWT
    const decoded = jwt.verify(token, JWT_PUBLIC, signOptions);
    const profile = decoded.profile;
    const role = decoded.role;
    const scopes = authorizations(role);
    // Checks if the user's scopes allow her to call the current function
    const isAllowed = authorizeUser(scopes, event.methodArn);

    const effect = isAllowed ? "Allow" : "Deny";
    const userId = profile.email;
    const authorizerContext = { user: JSON.stringify(profile) };
    // Returan an IAM policy document for the current endpoint
    const policyDocument = utils.buildIAMPolicy(
      userId,
      effect,
      "*",
      // event.methodArn,
      authorizerContext
    );

    callback(null, policyDocument);
  } catch (e) {
    callback("Unauthorized"); // Return a 401 Unauthorized response
  }
};
