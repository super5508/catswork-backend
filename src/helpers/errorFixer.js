const sendError = (error) => {
  if (error.includes("/")) {
    const status = parseInt(error.split("/")[0]) ? parseInt(error.split("/")[0]) : 500
    const message = error.split("/")[1] ? error.split("/")[1] : 'Server Error'
    return { status, message }
  }
}

module.exports = sendError