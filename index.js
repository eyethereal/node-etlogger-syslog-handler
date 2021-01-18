const syslog = require("modern-syslog");

class SyslogHandler {
    constructor(opts) {
        // See https://github.com/strongloop/modern-syslog
        // for more info about the flags
        this.cfg = Object.assign({
            ident: process.title,
            flags: syslog.LOG_PID,
            facility: syslog.LOG_LOCAL0,
        }, opts);

        console.log(this.cfg);

        syslog.open(this.cfg.ident, this.cfg.flags, this.cfg.facility);
    }

    handleLog(logMsg) {
        const opts = {};

        // TODO: Test the performance impact of a switch lookup table vs.
        // a dictionary based one.
        let level = syslog.level.LOG_INFO;
        switch (logMsg.level) {
        case logMsg.logger.LEVEL_ERROR:
            level = syslog.level.LOG_ERR;
            break;

        case logMsg.logger.LEVEL_WARN:
            level = syslog.level.LOG_WARNING;
            break;

        case logMsg.logger.LEVEL_INFO:
            level = syslog.level.LOG_INFO;
            break;

        case logMsg.logger.LEVEL_DEBUG:
            level = syslog.level.LOG_DEBUG;
            break;
        }

        const msg = logMsg.getPlainMessage();
        syslog.log(level, msg);
        console.log(level, " = ", msg);
    }
}

SyslogHandler.flag = syslog.option;
SyslogHandler.facility = syslog.facility;

module.exports = SyslogHandler;
