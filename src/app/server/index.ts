import { webhookCallback } from "grammy";

import app from "./express";
import bot from "./bot";
import env from "./env";

function main() {
  if (!env.DETA_SPACE_APP_HOSTNAME) {
    bot.catch(console.error);
    bot.start();
    console.log("Bot started");
    return;
  }

  app.use(webhookCallback(bot));
  app.listen(env.PORT, async () => {
    const webhookUrl = `https://${env.DETA_SPACE_APP_HOSTNAME}.deta.app`;

    console.log("Server listening on port", env.PORT);
    console.log("host is: "+env.DETA_SPACE_APP_HOSTNAME)

    await bot.api.deleteWebhook();
    console.log(`Webhook deleted`);
    await bot.api.setWebhook(webhookUrl, {
      drop_pending_updates: true,
    });

    // notify admin about deployment if process.env.ADMIN is set
    if (env.ADMIN) {
      await bot.api.sendMessage(
        env.ADMIN,
        `Bot connected to webhookUrl ${webhookUrl}`
      );
    }
  });
}

main();
export default app;
