import express from "express";
import path from "path";

export class Server {
  private port = 3000;
  private app = express();

  async start() {
    // Middleware

    // Public Folder
    this.app.use(express.static("public"));

    this.app.get("/*splat", (req, res) => {
      const indexPath = path.join(__dirname, "../../public/index.html");

      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
