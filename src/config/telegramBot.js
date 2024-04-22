const { Telegraf } = require("telegraf");
require("dotenv").config();

const TOKEN = process.env.REACT_APP_BOT_TOKEN;

const bot = new Telegraf(TOKEN);

const web_link = process.env.REACT_APP_WEB_URL;

bot.start((ctx) => {
  ctx.replyWithHTML("wwelcomeeeee", {
    reply_markup: {
      inline_keyboard: [[{ text: "Open app", web_app: { url: web_link } }]],
    },
  });
});

bot.on("test");

bot.launch();
