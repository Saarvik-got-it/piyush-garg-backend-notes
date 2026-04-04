const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n`,
      (err, data) => {
        next(); //Passes on request to next middleware
      },
    );
  };
}

module.exports = {
  logReqRes,
};
