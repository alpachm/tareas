require('dotenv').config();
const app = require('./app');
const db = require('./database/config');
const initModel = require('./models/initModels');

db.authenticate()
  .then((res) => console.log('db is authorizated'))
  .catch((err) => console.log(err));

initModel();

db.sync()
  .then((res) => console.log('db is synced'))
  .catch((err) => console.log(err));

const port = process.env.port || 3012;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
