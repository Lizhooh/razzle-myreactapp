import isEnv from 'is-env';

export const isNotServerRenderPage = () => (
    isEnv('browser') && window.__RENDER_PATH__ !== window.location.pathname
);


