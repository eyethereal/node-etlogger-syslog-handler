const Log = require("etlogger");

const SyslogHandler = require("./index.js");

const handler = new SyslogHandler();

Log.addLogHandler(handler);

Log.debug("This is a %s message", "debug");
Log.info("This is a %s message", "info");
Log.warn("This is a %s message", "warn");
Log.error("This is a %s message", "error");

const obj = {
    a: 1,
    b: [ 1, 2, 3],
    c: {
        sub: "value",
    }
};

Log.infoi("An inspected complex object ", obj);
Log.info("A printed complex object %o", obj);
