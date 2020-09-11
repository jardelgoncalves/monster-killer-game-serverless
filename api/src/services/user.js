const Service = require('./service');

module.exports = class UserService extends Service {
  constructor({ dynamoDbService }) {
    super({dynamoDbService, tableName: process.env.DYNAMO_USER_TABLE});
  }
}