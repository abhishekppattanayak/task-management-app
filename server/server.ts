import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { MongoClient, ObjectId } from "npm:mongodb";
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

router.post('/tasks/:id', async (ctx) => {
  const id = ctx.params.id;
  const _id = new ObjectId(id)
  try {
    let newTask = await ctx.request.body.formData();
    newTask = Object.fromEntries(newTask)

    const res = await tasks.updateOne({_id: _id}, {$set: newTask})

    if (res.modifiedCount > 0) {
      ctx.response.status = 200
      ctx.response.body = {
        message: "Successfully updated the task"
      }
    }
    else {
      throw Error("Unsuccessful")
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