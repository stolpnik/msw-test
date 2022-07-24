import { rest, graphql } from "msw";
import users from "./data/users.json";

export const handlers = [
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.json(users));
  }),
  rest.get("/api/users/:id", (req, res, ctx) => {
    switch (req.params.id) {
      case "1":
        return res(ctx.status(404), ctx.json({ msg: "error" }));
      default:
        return res(
          ctx.json({
            id: req.params.id,
            name: `user${req.params.id}`,
            description: `user${req.params.id}'s description`,
          })
        );
    }
  }),
  graphql.query("GetAllNotes", (req, res, ctx) => {
    console.log(req);
    return res(ctx.data([{ id: "1", title: "hoge" }]));
  }),
];
