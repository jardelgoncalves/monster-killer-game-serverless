const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
}
module.exports = {
  success(data, status = 201) {
    return {
      statusCode: status,
      body: JSON.stringify(data),
      headers
    }
  },
  error(data, status = 501) {
    return {
      statusCode: data.statusCode || status,
      body: 'Couldn\'t create item',
      headers: {
        ...headers,
        'Content-Type': 'text/plain'
      }
    }
  }
}