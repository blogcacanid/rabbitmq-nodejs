const amqp = require('amqplib')     // Import library amqp

amqp.connect('amqp://localhost')
    .then(conn=> {
        return conn.createChannel().then(ch => {
            const ok = ch.assertQueue('hello', { durable: false })      // Deklarasi antrian
            ok.then(() => {
                /* Menangkap pesan yang dikirimkan oleh RabbitMQ */
                return ch.consume('hello', msg => console.log('- Received', msg.content.toString()), { noAck: true })
            })
            .then(() => {
                console.log('* Waiting for messages. Ctrl+C to exit')
            })
        })
    }).catch(console.warn)
  