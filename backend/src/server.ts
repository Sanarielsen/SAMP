import 'dotenv/config'
import { app } from "./app.js";
import { env } from "./env/index.js";

const port = env.PORT || 3333

app.listen({
  port,
  host: '0.0.0.0',
}).then(() => {
  console.log('HTTP Server running')
})