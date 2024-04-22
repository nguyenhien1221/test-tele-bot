const { Telegraf } = require("telegraf");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const TOKEN = process.env.REACT_APP_BOT_TOKEN;
const bot = new Telegraf(TOKEN);
const web_link = process.env.REACT_APP_WEB_URL;

bot.start(async (ctx) => {
  const imagePath = path.join(__dirname, "../../public/images/about.png");
  const imageBuffer = fs.readFileSync(imagePath);
  const imageStream = imageBuffer;

  const caption = `
    <b>What can this bot do?</b>
    New generation Telegram wallet, built on NEAR
    Description: HERE is a Telegram-based non-custodial wallet 
    designed for the NEAR Protocol. Easily import or create an account,
    transfer tokens, and mine HOT. This wallet operates independently of your login account,
    ensuring all data is securely stored locally on your device

    Support: @herewalletchat
    HOT Coin News: @hotnear
    Open Wallet: https://wallet.here.app
  `;

  await ctx.replyWithPhoto(
    { source: imageStream },
    {
      caption,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Join the community", url: "t.me/seed_coin_bot" },
            // { text: "Learn more about SEED coin", url: "" },
            { text: "Open Wallet", web_app: { url: web_link } },
          ],
        ],
      },
    }
  );
});

//message when open box chat
bot.start(async (ctx) => {
  const imagePath = path.join(__dirname, "../../public/images/about.png");
  const imageBuffer = fs.readFileSync(imagePath);
  const imageStream = imageBuffer;

  const caption = `
    <b>What can this bot do?</b>
    New generation Telegram wallet, built on NEAR
    Description: HERE is a Telegram-based non-custodial wallet 
    designed for the NEAR Protocol. Easily import or create an account,
    transfer tokens, and mine HOT. This wallet operates independently of your login account,
    ensuring all data is securely stored locally on your device
    
    Support: @herewalletchat
    HOT Coin News: @hotnear
    Open Wallet: https://wallet.here.app
  `;

  await ctx.replyWithPhoto(
    { source: imageStream },
    { caption, parse_mode: "HTML" }
  );
});

bot.launch();
