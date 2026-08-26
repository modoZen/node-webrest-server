import express, { Router } from "express";
import path from "path";

interface Options {
  PORT: number;
  PUBLIC_PATH?: string;
  routes: Router;
}

export class Server {
  private readonly port;
  private readonly publicPath;
  private readonly routes: Router;

  private app = express();

  constructor(options: Options) {
    const { PORT, PUBLIC_PATH = "public", routes } = options;
    this.port = PORT;
    this.publicPath = PUBLIC_PATH;
    this.routes = routes;
  }

  async start() {
    // Middleware
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    // Public Folder
    this.app.use(express.static(this.publicPath));

    // Routes
    this.app.use(this.routes);

    // SPA
    this.app.get("/*splat", (req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`,
      );

      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
