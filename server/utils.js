const crypto = require("crypto");

module.exports.buildIAMPolicy = (userId, effect, resource, context) => {
  const policy = {
    principalId: userId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource
        }
      ]
    },
    context
  };

  return policy;
};

module.exports.hashPassword = (password, salt, callback) => {
  const iterations = 10000;
  const keyLen = 64; // 64 bit.
  crypto.pbkdf2(password, salt, iterations, keyLen, "sha256", callback);
};
