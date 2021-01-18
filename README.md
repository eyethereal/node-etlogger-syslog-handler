# ET Logger Syslog Handler

This handler will send logger output to syslog using modern-syslog. That package uses native C bindings to the host syslog library, which is good for performance, but of course you're going to need build tools to install it which may or may not be ideal.

It logs to the local syslog daemon which can then do other things with the message as appropriate and based on it's configuration. So if you're not seeing output, you may want to check that.

## Usage

See the example in `./example.js`


    const Log = require("etlogger"); 
    const SyslogHandler = require("etlogger-syslog-handler");
    
    // The opts object is optional
    const opts = {
        ident: "MyApp", // defaults to process.title which is probably just `node`
        flags: SyslogHandler.flag.LOG_ID || SyslogHandler.flag.LOG_PERROR,  // An or'd set of values
        facility: SyslogHandler.facility.LOG_DAEMON, // defaults to LOG_LOCAL0
    };
    const handler = new SyslogHandler(opts);
    
    Log.addLogHandler(handler);
    
    Log.debug("This is a %s message", "debug");

## Flags and facilities

See <https://github.com/strongloop/modern-syslog> for inherited values.
