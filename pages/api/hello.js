// Imports the Google Cloud client library
import { PubSub } from '@google-cloud/pubsub';
import {getDecryptedSecret} from '../../utils/decret-secret'

const projectId = process.env['PROJECT'] || 'iot-albert'
const topicName = process.env['TOPIC'] || 'projects/iot-albert/topics/node-red'
// Creates a client; cache this for further use
const pubSubClient = new PubSub({projectId, credentials: getDecryptedSecret()});

module.exports = async (req, res) => {
    const { action = '', key='' } = req.query
    if(key === process.env['THEKEY']){
      await quickstart(action)
    }
    res.status(200).send(`OK!`)
}

async function quickstart(
     action = ''
  ) {
    const messageId = await pubSubClient.topic(topicName).publish(Buffer.from(action));
    console.log(`Message ${messageId} published.`);
  }