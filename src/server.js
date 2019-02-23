import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { ServerStyleSheet } from 'styled-components';

import createStore from './stores';
import App from './app';
import pageRoutes from './page-routes';
import apiRoutes from './api-routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = new Koa();
const router = new Router();

function render({ css, style, js, markup, state, path }) {
    const html = `
        <!doctype html>
        <html>
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <title>Welcome to Razzle</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="${css}" />
            ${style}
            <script src="${js}" defer crossorigin></script>
        </head>
        <body>
            <div id="root">${markup}</div>
            <script>window.__INIT_STATE__ = (${state});</script>
            <script>window.__RENDER_PATH__ = '${path}';</script>
        </body>
        </html>
    `;
    return html;
}

router.use(apiRoutes.routes());
router.get('/*', async ctx => {
    const context = {};
    const url = ctx.req.url;
    const view = pageRoutes.find(i => i.path === url);
    let state = {};
    if (view && typeof view.component.getInitProps === 'function') {
        state = await view.component.getInitProps({}, { req: ctx.req, res: ctx.res });
    }

    const store = createStore({}).getState();
    state = { ...store, ...state };

    const sheet = new ServerStyleSheet();

    const markup = renderToString(sheet.collectStyles(
        <Provider store={createStore(state)}>
            <StaticRouter context={context} location={url}>
                <App />
            </StaticRouter>
        </Provider>
    ));

    if (context.url) {
        return ctx.redirect(context.url);
    }

    ctx.body = render({
        css: assets.client.css || '',
        js: assets.client.js,
        style: sheet.getStyleTags(),
        markup: markup,
        state: serialize(state),
        path: url,
    });
});

server
    .use(serve(process.env.RAZZLE_PUBLIC_DIR))
    .use(router.routes())
    .use(router.allowedMethods());

export default server.callback();
