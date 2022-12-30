const success = (statusCode, data, message, res) => {
    res.status(statusCode).json(
        {
            status : statusCode,
            message : message,
            data : data,
        }
    ) 
}

const error = (statusCode, serverMessage, message, res) => {
    res.status(statusCode).json(
        {
            status : statusCode,
            message : message,
            serverMessage : serverMessage,
        }
    )
}

module.exports = {
    success,
    error
}

