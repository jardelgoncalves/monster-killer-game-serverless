const Service = require('./service');
const response = require('../util/response');

module.exports = class RankingService extends Service {
  constructor({ dynamoDbService }) {
    super({dynamoDbService, tableName: process.env.DYNAMO_RANKING_TABLE});
  }

  _treatRecords({ Records }) {
    if(!Records || !Array.isArray(Records)) return [];

    return Records.map(({ dynamodb }) => ({
      userId: dynamodb.NewImage.userId.S,
      username: dynamodb.NewImage.username.S,
      scoreId: dynamodb.NewImage.id.S,
      score: dynamodb.NewImage.score.N,
    }))
  }
  
  async _createOrUpdate(data) {
    if (!data) return null;

    const record = await this.query({
      keyExpression: 'userId = :userId',
      expressionAttr: { ':userId': data.userId || null }
    });

    const exists = record.Items.filter(
      r => r.userId === data.userId && Number(r.score) < Number(data.score)
    )
    if (record.Items.length && !exists.length ) return;

    return super.create({ body: data })
  }

  async treatEvent(event) {
    try {
      const data = this._treatRecords(event)

      await Promise.all(
        data.map(d => this._createOrUpdate(d))
      )
      
      return response.success({ success: true })
    } catch (error) {
      console.error('Deu ruim**', error.stack)
      return response.error({ statusCode: 500 })
    }
  }
}