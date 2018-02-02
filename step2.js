let res = require('restify');
let builder = require('botbuilder');

let server = res.createServer();
server.listen(3978, () => console.log('server', server.url));

let connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

server.post('/api/messages2/', connector.listen());
let store = {
    name: '',
    option: '',
    where: ''
};
const dinnerMenu = {
    'Arroz con pollo - $5.99': {
        Description: 'Arroz con pollo',
        Price: 5.99
    },
    'Lomo Saltado - $6.89': {
        Description: 'Lomo Saltado',
        Price: 6.89
    },
    'Ceviche - $6.50': {
        Description: 'Ceviche',
        Price: 6.50
    }
};
let bot = new builder.UniversalBot(connector, [
    (session) => builder.Prompts.text(session, 'Cuál es tu nombre..'),
    (session, results) => {
        session.send('Hola ' + results.response)
        builder.Prompts.choice(session, 'Este es el menu del día: ', dinnerMenu, { listStyle: builder.ListStyle.button } )
    },
    (session, results) => {
        store.option = results.response.entity;
    }
] )
