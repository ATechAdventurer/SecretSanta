let config = {};
const {title, gmailUser, gmailPassword, gmailFriendlyName} = process.env;

Object.assign(config, {title, gmailUser, gmailPassword, gmailFriendlyName});



module.exports = config;
