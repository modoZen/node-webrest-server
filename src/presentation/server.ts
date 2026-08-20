import express from "express";

export class Server {
  private port = 3000;
  private app = express();

  async start() {
    // Middleware

    // Public Folder
    this.app.use(express.static("public"));

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
