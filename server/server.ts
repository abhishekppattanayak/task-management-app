import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { MongoClient } from "npm:mongodb";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const PORT = 8000;
const DATABASE_URL = Deno.env.get("DATABASE_URL") || "";

const client = new MongoClient(DATABASE_URL);
(async () => await client.connect())()

const db = client.db('tasks');
const tasks = db.collection('tasks');

const router = new Router();
const app = new Application();

router.get('/tasks', async (ctx) => {
  try {
    const documents = await tasks.find().toArray();

    ctx.response.status = 200
    ctx.response.body = {
      documents: documents
    }
  }
  catch (error: any) {
    ctx.response.status = 501;
    ctx.response.body = {
      message: error.message
    }
  }
})



app.use(oakCors())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen({port: PORT})
console.log(`Server is running on PORT:${PORT}`)