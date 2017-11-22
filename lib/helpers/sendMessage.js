module.exports = (message) => {
    if (process.send) {
        process.send(message)
    }
};