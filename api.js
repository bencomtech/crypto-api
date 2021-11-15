const app = require("./src/app");
const logger = require("./src/logger");
const port = process.env.PORT || 7000;

app.listen(port, () => {
  logger.info(`API Server running on port ${port}`);
});
