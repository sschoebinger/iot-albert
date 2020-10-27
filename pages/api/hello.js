// Imports the Google Cloud client library
import { PubSub } from '@google-cloud/pubsub';
import {getDecryptedSecret} from '../../utils/decret-secret'

const projectId = 'iot-albert'
// Creates a client; cache this for further use
const pubSubClient = new PubSub({projectId, credentials: getDecryptedSecret()});

module.exports = async (req, res) => {
    await quickstart()
    const { name = 'World' } = req.query
    res.status(200).send(`Hello ${name}!`)
}

async function quickstart(
    topicName = 'projects/iot-albert/topics/node-red', // Name for the new topic to create
  ) {
  
    const messageId = await pubSubClient.topic(topicName).publish(Buffer.from('yeah!'));
    console.log(`Message ${messageId} published.`);
  }