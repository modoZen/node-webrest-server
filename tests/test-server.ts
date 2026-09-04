import { envs } from "../src/config/envs.js";
import { AppRoutes } from "../src/presentation/routes.js";
import { Server } from "../src/presentation/server.js";

export const testServer = new Server({
  PORT: envs.PORT,
  routes: AppRoutes.routes,
});
