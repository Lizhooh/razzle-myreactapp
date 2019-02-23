import http from 'http';

let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;
const post = process.env.PORT || 3000;

server.listen(post, error => {
    if (error) {
        console.log(error);
    }
    console.log('🚀 started:', `http://127.0.0.1:${post}`);
});

if (module.hot) {
    console.log('✅  Server-side HMR Enabled!');

    module.hot.accept('./server', () => {
        console.log('🔁  HMR Reloading `./server`...');
        try {
            app = require('./server').default;
            server.removeListener('request', currentApp);
            server.on('request', app);
            currentApp = app;
        } catch (error) {
            console.error(error);
        }
    });
}
