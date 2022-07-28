import { act, render, screen, waitFor } from "@testing-library/react";
import Players from "@/pages/players";
import "@testing-library/jest-dom";
import { server } from "@/mocks/server";
import { rest } from "msw";

describe("Players", () => {
  it("初期ロード", () => {
    const { container } = render(<Players />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="chakra-stack css-14witgw"
        />
      </div>
      `);
  });

  it("データロード完了", async () => {
    // server.use(
    //   rest.get("/api/players", (req, res, ctx) => {
    //     return res(ctx.json([{ id: 1, name: "Unkown Player" }]));
    //   })
    // );

    render(<Players />);
    await waitFor(() => screen.getAllByTestId("player-list-item"));
    const playerListItems = screen.getAllByTestId("player-list-item");
    expect(playerListItems).toHaveLength(11);
  });
});
