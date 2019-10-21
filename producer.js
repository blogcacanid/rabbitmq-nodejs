const amqp = require('amqplib')     // Import library amqp

amqp.connect('amqp://localhost')
    .then(conn => {
        return conn.createChannel().then(ch => {
            const q = 'hello'     // Nama antrian adalah 'hello'
            const msg = 'Hello world!'    // Isi pesan yang dikirim ke RabbitMQ

            const ok = ch.assertQueue(q, { durable: false })    // Membuat antrian 'hello'
            return ok.then(() => {
                ch.sendToQueue(q, Buffer.from(msg))     // Mengirim pesan ke RabbitMQ
                console.log('- Sent', msg)
                return ch.close()
            })
        }).finally(() => conn.close())
    }).catch(console.warn)
  