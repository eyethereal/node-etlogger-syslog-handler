const syslog = require("syslog-client");

class SyslogHandler {
    constructor(opts) {
        // See https://github.com/paulgrove/node-syslog-client#syslogtransport
        this.cfg = Object.assign({
            target: "127.0.0.1",
            // port: 514,
            transport: syslog.Transport.Udp,
            facility: syslog.Facility.Local0,
            severity: syslog.Severity.Informational,
            // appName: process.title,
            // rfc3164: false
        }, opts);

        console.log(this.cfg);

        if (typeof this.cfg.transport === "string") {
            this.cfg.transport = syslog.Transport[this.cfg.transport];
        }
        if (typeof this.cfg.facility === "string") {
            this.cfg.facility = syslog.Facility[this.cfg.facility];
        }
        if (typeof this.cfg.severity === "string") {
            this.cfg.severity = syslog.Severity[this.cfg.severity];
        }

        this.client = syslog.createClient(this.cfg.target, this.cfg);
        this.client.on("error", console.error);
    }

    handleLog(logMsg) {
        const opts = {};

        switch (logMsg.level) {
        case logMsg.logger.LEVEL_ERROR:
            opts.severity = syslog.Severity.Error;
            break;

        case logMsg.logger.LEVEL_WARN:
            opts.severity = syslog.Severity.Warning;
            break;

        case logMsg.logger.LEVEL_INFO:
            opts.severity = syslog.Severity.Informational;
            break;

        case logMsg.logger.LEVEL_DEBUG:
            opts.severity = syslog.Severity.Debug;
            break;
        }

        opts.timestamp = logMsg.date;

        const msg = logMsg.getPlainMessage();
        this.client.log(msg, opts);
        // console.log(msg);
    }
}

module.exports = SyslogHandler;
