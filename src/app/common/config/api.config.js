if (process.env.NODE_ENV === "production") {
  module.exports = require("./api.config.prod.json");
} else {
  module.exports = require("./api.config.dev.json");
}
