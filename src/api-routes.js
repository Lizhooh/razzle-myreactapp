import Routet from 'koa-router';
const router = new Routet();

router.get('/api/index', ctx => {
    const list = [...new Array(3)].map(i => ({
        id: Math.random(),
        title: Math.random().toString(32),
    }));
    ctx.body = list;
});

export default router;