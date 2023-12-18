import { Hono } from 'hono'

//routes
import testRouter from './routes/test';
//
const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

//test
app.post('/test/create', async (c) => { 
    const body = await c.req.json();
    const resulte = await testRouter.create(body, c.env.DB);
    return c.json(resulte);
  });
app.post('/test/get_list', async (c) => { 
    const resulte = await testRouter.get_list(c, c.env.DB);
    return c.json({ret: "OK", data: resulte});
});
app.post('/test/get', async (c) => { 
    const body = await c.req.json();
    const resulte = await testRouter.get(body, c, c.env.DB);
    return c.json({ret: "OK", data: resulte});
});


export default app
