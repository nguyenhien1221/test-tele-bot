const { Telegraf } = require("telegraf");

const TOKEN = "6949670904:AAGRsfNNWB-9EAx99M6s6onm0iCma4fAPtU";

const bot = new Telegraf(TOKEN);

const web_link = "https://main--tele-bot-test.netlify.app/";

bot.start((ctx) => {
  ctx.reply("Welcome", {
    reply_markup: {
      keyboard: [[{ text: "test", web_app: { url: web_link } }]],
    },
  });
});

bot.launch();
