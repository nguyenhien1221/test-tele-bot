const { Telegraf } = require("telegraf");

const TOKEN = "6949670904:AAGRsfNNWB-9EAx99M6s6onm0iCma4fAPtU";

const bot = new Telegraf(TOKEN);

const web_link = "https://main--tele-bot-test.netlify.app/";

const tesst = window.Telegram.WebApp;
tesst.setHeaderColor("#FFF5CF");

bot.start((ctx) => {
  ctx.reply("Welcome", {
    reply_markup: {
      inline_keyboard: [[{ text: "Open app", web_app: { url: web_link } }]],
    },
  });
});

bot.launch();
