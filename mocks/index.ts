import { setupServer } from "msw/node";
import { setupWorker } from "msw";
import { handlers } from "./handlers";

const mockStart = async () => {
  if (typeof window === "undefined") {
    const server = setupServer(...handlers);
    server.listen();
  } else {
    const worker = setupWorker(...handlers);
    worker.start();
  }
};

mockStart();
