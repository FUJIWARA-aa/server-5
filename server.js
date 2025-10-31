import { Hono } from "jsr:@hono/hono";
import { serveStatic } from "jsr:@hono/hono/deno";
const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));

// GETリクエストに対する処理
app.get("/api", async (c) => {
  const name = c.req.query("name");
  const rank = c.req.query("rank");

  return c.json({ message: "GET", query: { name, rank } });
});
app.post("/api", async (c) => {
  const formData = await c.req.formData();
  const name = formData.get("name");
  const rank = formData.get("rank");
  return c.json({ message: "POST", form: { name, rank } });
});
app.put("/api", async (c) => {
  // メッセージボディの受け取り
  const body = await c.req.json();
  const name = body["name"];
  const rank = body["rank"];

  return c.json({ message: "PUT", json: { name, rank } });
});
app.delete("/api", async (c) => {
  const body = await c.req.json();
  const name = body["name"];
  const rank = body["rank"];
  return c.json({ message: "DELETE", deleted: { name, rank } });
});
Deno.serve(app.fetch);
