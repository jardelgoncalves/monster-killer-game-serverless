const decoratorValidator = (fn, schema, argType) => {
  return async function(event) {
    const data = event[argType];
    const { error, value } = schema.validate(data, { abortEarly: true });


    event[argType] = value

    if(!error) return fn.apply(this, arguments);

    return  {
      statusCode: 422,
      body: error.message
    }
  }
}

module.exports = decoratorValidator