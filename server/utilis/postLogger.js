const { createLogger, format, transports } = require("winston");

const postLogger = createLogger({
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

        new transports.File({ filename: 'postLogs/combined.log'}),
        new transports.File({ filename : 'postLogs/error.log', level: 'error'}),

        new transports.MongoDB({
            level: 'info',
            db: process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/JWT`,
            collection: 'post_records',
            tryReconnect: true,
            format: format.metadata(),
        }),
    ],

    exceptionHandlers: [
        new transports.File({ filename : 'postLogs/exceptions.log' })
    ]
})

module.exports = postLogger;