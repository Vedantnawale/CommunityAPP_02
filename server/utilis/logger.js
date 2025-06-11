const { createLogger, format, transports } = require('winston');
require('winston-mongodb');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [

        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),

        // File logs
        new transports.File({ filename: 'logs/combined.log' }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),

        // MongoDB transport
        new transports.MongoDB({
            level: 'info', // captures info, warn, error, etc.
            db: process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/JWT`,
            collection: 'log_records',
            tryReconnect: true,
            format: format.metadata(), // stores message & metadata
        }),

    ],
    exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log' })
    ]
});

module.exports = logger;
