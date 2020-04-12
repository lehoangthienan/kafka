import kafka from 'kafka-node'
import configs from '../configs'

const kafkaClient = (() => {
    var instance
    function init() {
        const client = new kafka.KafkaClient({kafkaHost: configs.KAFKA_HOST});
      
      return client
    }
    
    return {
      getInstance : function() {
        if (!instance) instance = init()
        return instance
      },
    }
})()

export const producer = new kafka.Producer(kafkaClient.getInstance())
  
export default kafkaClient