const { Telegraf } = require("telegraf");

const TOKEN = "6949670904:AAGRsfNNWB-9EAx99M6s6onm0iCma4fAPtU";

const bot = new Telegraf(TOKEN);

const web_link = "https://dexloto-stag.icetea-software.com/";

bot.start((ctx) => ctx.reply("Welcome"));
bot.launch();
