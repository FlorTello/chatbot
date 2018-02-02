let res = require('restify');
let builder = require('botbuilder');

let server = res.createServer();
server.listen(3978, () => console.log('server', server.url));

let connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

server.post('/api/messages/', connector.listen());

let bot = new builder.UniversalBot(connector, [
    (session) => builder.Prompts.text(session, 'Cuál es tu nombre..'),
    (session, results) => session.send('Hola ' + results.response),
    (session) => builder.text('de que signo eres ?'),
    (session, results) => session.send('Hola ' + results.response),
] )
