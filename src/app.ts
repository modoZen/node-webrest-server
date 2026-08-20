import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  const server = new Server();

  await server.start();
}
