
import Index from './views/index';
import About from './views/about';

const list = [
    {
        path: '/',
        exact: true,
        component: Index,
    },
    {
        path: '/about',
        component: About,
    },
];

export default list;