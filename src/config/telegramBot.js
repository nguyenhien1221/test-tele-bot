const { Telegraf } = require("telegraf");

const TOKEN = "6949670904:AAGRsfNNWB-9EAx99M6s6onm0iCma4fAPtU";

const bot = new Telegraf(TOKEN);

const web_link = process.env.REACT_APP_WEB_URL;

bot.start((ctx) => {
  ctx.reply("Welcome", {
    reply_markup: {
      inline_keyboard: [[{ text: "Open app", web_app: { url: web_link } }]],
    },
  });
});

bot.launch();
