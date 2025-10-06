import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import courseApp from './routes/courseRoutes.js'
import studentApp from './routes/studentRoutes.js'
import { HTTPException } from 'hono/http-exception'
import { authApp } from './routes/auth.js'
import { optionalAuth } from './middleware/auth.js'




const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use("*", optionalAuth)
app.route("/auth", authApp);
app.route("/courses", courseApp);
app.route("/students", studentApp);

app.onError((err, c) => {
  if (err instanceof HTTPException) {

    return c.json({ error: err.message }, err.status);
  }
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
