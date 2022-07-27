import { rest, graphql } from "msw";
import users from "./data/users.json";

export const handlers = [
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.json(users));
  }),
  rest.get("/api/users/:id", async (req, res, ctx) => {
    const notFound = res(ctx.status(404), ctx.json({ msg: "error" }));

    switch (req.params.id) {
      case "2":
        return notFound;
      case "3":
        return res(
          ctx.delay(1000),
          ctx.json({
            id: req.params.id,
            name: `user${req.params.id}`,
            description: `user${req.params.id}'s description`,
          })
        );
      case "4":
        return req.passthrough();
      default:
        const user = users.find((user) => user.id === Number(req.params.id));
        if (!user) return notFound;
        const name = user.name;
        const result = await ctx.fetch(
          `https://ja.wikipedia.org/w/api.php?format=json&action=query&origin=*&list=search&srlimit=45&srsearch=${name}`
        );
        return res(
          ctx.json({
            id: req.params.id,
            name: user.name,
            description: (await result.json()).query.search[0].snippet,
          })
        );
    }
  }),
  graphql.query("GetAllNotes", (req, res, ctx) => {
    console.log(req);
    return res(ctx.data([{ id: "1", title: "hoge" }]));
  }),
];
