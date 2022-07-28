import { rest, graphql } from "msw";
import players from "./data/players.json";

export const handlers = [
  rest.get("/api/players", (req, res, ctx) => {
    return res(ctx.json(players));
  }),
  rest.get("/api/players/:id", async (req, res, ctx) => {
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
        const player = players.find(
          (user) => user.id === Number(req.params.id)
        );
        if (!player) return notFound;
        const name = player.name;
        const result = await ctx.fetch(
          `https://ja.wikipedia.org/w/api.php?format=json&action=query&origin=*&list=search&srlimit=45&srsearch=${name}`
        );
        return res(
          ctx.json({
            id: req.params.id,
            name: player.name,
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
