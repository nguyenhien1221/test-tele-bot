const { Telegraf } = require("telegraf");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const TOKEN = process.env.REACT_APP_BOT_TOKEN;
const bot = new Telegraf(TOKEN);
const web_link = process.env.REACT_APP_WEB_URL;

// Create buttons
const button1 = { text: "Join the community", url: "t.me/Catia_Announcement" };
const button2 = { text: "Open Wallet", web_app: { url: web_link } };

// Create the inline keyboard markup
const inlineKeyboard = [[button1], [button2]];

bot.start(async (ctx) => {
  const imagePath = path.join(__dirname, "../../public/images/about.png");
  const imageBuffer = fs.readFileSync(imagePath);
  const imageStream = imageBuffer;

  const caption =
    "<i>New generation Telegram wallet</i>, built on SEED Description: HERE is a Telegram-based non-custodial wallet designed for the SEED. Easily import or create an account, transfer tokens, and mine SEED. This wallet operates independently of your login account, ensuring all data is securely stored locally on your device";

  await ctx.replyWithPhoto(
    { source: imageStream },
    {
      caption,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    }
  );
});

bot.launch();
