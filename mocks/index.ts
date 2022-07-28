import { setupServer } from "msw/node";
import { setupWorker } from "msw";
import { handlers } from "./handlers";

const mockStart = async () => {
  if (typeof window === "undefined") {
    const server = setupServer(...handlers);
    server.listen();
    return server;
  } else {
    const worker = setupWorker(...handlers);
    worker.start();
    return worker;
  }
};

module.exports = mockStart;
