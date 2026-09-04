import { envs } from "../src/config/envs.js";
import { Server } from "../src/presentation/server.js";

vi.mock("../src/presentation/server.js");

describe("Testing App", () => {
  test("should call server with arguments and start", async () => {
    await import("../src/app.js");

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      PORT: envs.PORT,
      PUBLIC_PATH: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    });

    expect(Server.prototype.start).toHaveBeenCalledWith();
  });
});
