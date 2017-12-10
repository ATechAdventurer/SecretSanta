let config = {};
const {TITLE, GMAIL_USER, GMAIL_PASS, GMAIL_FRIENDLY_NAME, ADMIN_PASS} = process.env;

Object.assign(config, {TITLE, GMAIL_USER, GMAIL_PASS, GMAIL_FRIENDLY_NAME, ADMIN_PASS});



module.exports = config;
