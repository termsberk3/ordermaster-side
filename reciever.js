var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (connError, connection) => {
 
    if(connError){
        throw connError;
    }
    connection.createChannel((channelError, channel) => {
        if(channelError){
            throw channelError;
        }
        const Queue = 'ordertest'
        channel.assertQueue(Queue);
        channel.consume(Queue,(msg)=>{
            console.log(`Recieved message ${msg.content.toString()}`);
        }, {noAck : true});

    })

})