import axios from "axios";

const tele = window.Telegram.WebApp;

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "telegram-data":
      tele.initData ||
      "query_id=AAGuZdFMAAAAAK5l0Uxa9Bjj&user=%7B%22id%22%3A1288791470%2C%22first_name%22%3A%22Nguy%E1%BB%85n%22%2C%22last_name%22%3A%22Hi%E1%BB%83n%22%2C%22username%22%3A%22nguyenhien29420%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1718096559&hash=ad608970f0aaaf3dec93749db2ffd8c17ddb6ee6da4d96056f80cbe753a6f55c",
  },
});
