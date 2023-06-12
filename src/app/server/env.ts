import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

export default cleanEnv(process.env, {
  BOT_TOKEN: str({ desc: "The Telegram bot API token" }),
  DETA_SPACE_APP_HOSTNAME: str({ default: undefined }),
  ADMIN: num({ default: undefined }),
  PORT: num({
    desc: "Server port",
    default: (process.env.PORT as unknown as number) || 8080,
  }),
});
