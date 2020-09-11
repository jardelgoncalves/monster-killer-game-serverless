# Monster Killer Game
Monster Killer consists of a set actions that can be performed by the player, such as attacking, performing a special attack and healing in order to kill the monster.


This project aimed to put into practice knowledge acquired in the chapter on how to receive events from an insertion in DynamoDB in the Serveless course taught by [Erick Wendel](https://github.com/ErickWendel).

## User Interface
<div align="center">
  <img src="./screenshot/tela_1.png" />
</div>
<hr>
<div align="center">
  <img src="./screenshot/tela_2.png" />
</div>
<hr>
<div align="center">
  <img src="./screenshot/tela_3.png" />
</div>

## Setup and Run
See how to configure the serverless API and Front End (in Vue.js)
- install Node.js v12.0.0 (using [nvm](https://github.com/nvm-sh/nvm))

#### Serverless API
- Create an AWS account
- Add a user with admin permissions ( Download the CSV file with the user data that was created)
- Open CSV File
- Install AWS-CLI (example for [linux](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/install-linux-al2017.html))
- Run `aws configure` in the terminal
- When running the command above, it will require some information:
  ```
  AWS Access Key ID: <Access Key Id of CSV file> 
  AWS Secret Access Key: <Secret Access Key of CSV file> 
  Default region name: us-east-1
  Default output format: json
  ```
- Install serverless framework (`npm i -g serverless`)
- Open the `api` directory
- Install the dependencies (run `npm i`)
- To deploy, run `serverless deploy` or `sls deploy` (alias)
- And copy the link (endpoint) of the project that was generated in the deploy

#### Frontend
- Open the `frontend` directory
- Open the `src/services/api.js` file
- And change the link generated when deploying the serverless api to the `baseUrl` of the file for example:
```js
  /**
   * generated endpoints:
   *   POST - https://fcrdriv8t4.execute-api.us-east-1.amazonaws.com/dev/score/{userId}
   *   POST - https://fcrdriv8t4.execute-api.us-east-1.amazonaws.com/dev/user
   *   GET - https://fcrdriv8t4.execute-api.us-east-1.amazonaws.com/dev/ranking
   */
   

  /**
   * just add: https://fcrdriv8t4.execute-api.us-east-1.amazonaws.com/dev/
   */
   
   
  // file frontend/src/services/api.js
  import axios from 'axios';

  const api = axios.create({
    baseURL: 'https://fcrdriv8t4.execute-api.us-east-1.amazonaws.com/dev/'
  })

  export default api
```
- Install the dependencies (run `npm i`)
- Run `npm start` or `npx vue-cli-service serve`
