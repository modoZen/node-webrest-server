import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  const server = new Server({
    PORT: envs.PORT,
    PUBLIC_PATH: envs.PUBLIC_PATH,
  });

  await server.start();
}
