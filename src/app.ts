import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  const server = new Server({
    PORT: envs.PORT,
    PUBLIC_PATH: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  await server.start();
}
