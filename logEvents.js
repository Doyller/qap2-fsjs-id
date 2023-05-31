const { format, getYear } = require("date-fns");
const { v4: uuid } = require('uuid');
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (event, level, message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;
  if (DEBUG) console.log(logItem);
  try {
    const currFolder = "logs/" + getYear(new Date());
    if (DEBUG) console.log(currFolder);
    if (!fs.existsSync(path.join(__dirname, currFolder))) {
      await fsPromises.mkdir(path.join(__dirname, currFolder));
    }
    const fileName = `${format(new Date(), "yyyyMMdd")}` + "_http_events.log";
    await fsPromises.appendFile(
      path.join(__dirname, currFolder, fileName),
      logItem + "\n"
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
