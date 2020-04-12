import kafka from 'kafka-node'

import kafkaClient, { producer } from '../utils/kafka'
import logger from '../utils/logger'

/*
  Create,      /
  Delete,     / An Le
  Directory  /
*/

export async function createTopic(req, res) {
    try {

        var topicsToCreate = [{
            topic: 'topic1',
            partitions: 2,
            replicationFactor: 2,
            configEntries: [
                {
                  name: 'compression.type',
                  value: 'gzip'
                },
                {
                  name: 'min.compaction.lag.ms',
                  value: '50'
                }
              ],
              replicaAssignment: [
                {
                  partition: 0,
                  replicas: [3, 1]
                },
                {
                  partition: 1,
                  replicas: [2, 1]
                }
              ]
          },
          {
            topic: 'topic2',
            partitions: 2,
            replicationFactor: 3,
            configEntries: [
              {
                name: 'compression.type',
                value: 'gzip'
              },
              {
                name: 'min.compaction.lag.ms',
                value: '50'
              }
            ],
            replicaAssignment: [
              {
                partition: 0,
                replicas: [3, 1]
              },
              {
                partition: 1,
                replicas: [2, 1]
              }
            ]
          }];
           
          kafkaClient.getInstance().createTopics(topicsToCreate, (error, result) => {
            res.status(200).json({
                message: result ? 'Success': 'Error',
                result,
                error,
            })
          });  

    } catch (err) {
        logger.error(err)
        res.status(err.code || 500).json({ message: err.message })
    }
}

export async function pushMessagToProducer(req, res) {
    try {
        const { message } = req.body
        const producer = new kafka.Producer(kafkaClient.getInstance())

        const payloads = [
            { topic: 'topic1', messages: message, partition: 0 },
            { topic: 'topic2', messages: message, partition: 1 }
        ];

        producer.send(payloads, function (err, data) {
            console.log(data, err);
            res.status(200).json({
                message: 'Success',
                data,
                err,
            })
        });

        producer.on('error', function (err) { console.log(err)})        

    } catch (err) {
        logger.error(err)
        res.status(err.code || 500).json({ message: err.message })
    }
}

export async function consumerTopicExample() {
    try {
        const consumer = new kafka.Consumer(
            kafkaClient.getInstance(),
            [
                { topic: 'topic1', partition: 0 },
                { topic: 'topic2', partition: 1 },
            ],
            {
                autoCommit: false
            }
        )

        consumer.on('message', function (message) {
            console.log('message', message);
        })

    } catch (err) {
        logger.error(err)
    }
}

consumerTopicExample()

/*
  Create,      /
  Delete,     / An Le
  Directory  /
*/
