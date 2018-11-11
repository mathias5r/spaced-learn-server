import { MONGO_URL, MONGO_DATABASE } from '../../constants';
import { MongoClient } from 'mongodb';

const client = async () => {
  try {
    const conn = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true });
    const db = await conn.db(MONGO_DATABASE);
    console.log('Sucessfully connected to database!');
    return db;
  } catch (err) {
    console.log('Error trying to connect to database: ', err);
    return {};
  }
}

export default {
  spaced_learn_db: client(),
};