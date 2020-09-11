const Service = require('./service');

const response = require('../util/response');

module.exports = class ScoreService extends Service {
  constructor({ dynamoDbService }) {
    super({dynamoDbService, tableName: process.env.DYNAMO_SCORE_TABLE});
    this.userTableName = process.env.DYNAMO_USER_TABLE;
  }

  async create(event) {
    const { body, pathParameters } = event

    if (!pathParameters || !pathParameters.userId)
      return response.error({ statusCode: 422 }, null, 'userId is required!')

    const user = await super.find({
      expression: { id: pathParameters.userId },
      tableName: this.userTableName
    })

    if (!user || !user.Item || !user.Item.id) return response.error({ statusCode: 422 }, null, 'User not found!')
    
    return super.create(body);
  }
}