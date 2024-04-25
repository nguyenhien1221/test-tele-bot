import axios from "axios";

const tele = window.Telegram.WebApp;

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "telegram-data":
      tele.initData ||
      "query_id=AAGuZdFMAAAAAK5l0UweT-k8&user=%7B%22id%22%3A1288791470%2C%22first_name%22%3A%22Nguy%E1%BB%85n%22%2C%22last_name%22%3A%22Hi%E1%BB%83n%22%2C%22username%22%3A%22nguyenhien29420%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1714035618&hash=09b22ffee689430ffd44b7adbdba92c565a5d4e9222044a4a4fc8c7f2d977b6c",
  },
});
