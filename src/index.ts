import { Hono } from 'hono'
import { cors } from 'hono/cors'
//routes
import testRouter from './routes/test';
import bookMarkRouter from './routes/BookMark';
//
const app = new Hono();
app.use("/*", cors());

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
app.post('/test/delete', async (c) => { 
    const body = await c.req.json();
    const resulte = await testRouter.delete(body, c.env.DB);
    return c.json(resulte);
});
app.post('/test/update', async (c) => { 
    const body = await c.req.json();
    const resulte = await testRouter.update(body, c.env.DB);
    return c.json(resulte);
});
//bookMarkRouter
app.post('/api/bookmark/create', async (c) => { 
  const body = await c.req.json();
  const resulte = await bookMarkRouter.create(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/bookmark/update', async (c) => { 
  const body = await c.req.json();
  const resulte = await bookMarkRouter.update(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/bookmark/get_list', async (c) => { 
  const body = await c.req.json();
  const resulte = await bookMarkRouter.get_list(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/bookmark/get', async (c) => { 
  const body = await c.req.json();
//console.log(body);  
  const resulte = await bookMarkRouter.get(body, c.env.DB, body.id);
  return c.json(resulte);
});
app.post('/api/bookmark/search', async (c) => { 
  const body = await c.req.json();
  const resulte = await bookMarkRouter.search(body, c.env.DB);
  return c.json(resulte);
});
app.post('/api/bookmark/delete', async (c) => { 
  const body = await c.req.json();
  const resulte = await bookMarkRouter.delete(body, c.env.DB);
  return c.json(resulte);
});

export default app
