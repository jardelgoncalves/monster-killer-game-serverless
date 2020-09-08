const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}
module.exports = {
  success(data, status = 201) {
    return {
      statusCode: status,
      headers,
      body: JSON.stringify(data),
    }
  },
  error(data, status = 501, message) {
    return {
      statusCode: data.statusCode || status,
      headers: {
        ...headers,
        'Content-Type': 'text/plain'
      },
      body: message || 'Couldn\'t create item',
    }
  }
}