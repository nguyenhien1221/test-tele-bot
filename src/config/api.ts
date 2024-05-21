import axios from "axios";

// const tele = window.Telegram.WebApp;

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "telegram-data":
      "query_id=AAGuZdFMAAAAAK5l0Uybx6YP&user=%7B%22id%22%3A1288791470%2C%22first_name%22%3A%22Nguy%E1%BB%85n%22%2C%22last_name%22%3A%22Hi%E1%BB%83n%22%2C%22username%22%3A%22nguyenhien29420%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1716282938&hash=71236a02b36bcb2d0cc4161ddec88fc78c4a89a7215859034e63a3815816bf49",
  },
});
