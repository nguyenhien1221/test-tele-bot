import axios from "axios";

// const tele = window.Telegram.WebApp;

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "telegram-data":
      "query_id=AAGuZdFMAAAAAK5l0UxVQi-N&user=%7B%22id%22%3A1288791470%2C%22first_name%22%3A%22Nguy%E1%BB%85n%22%2C%22last_name%22%3A%22Hi%E1%BB%83n%22%2C%22username%22%3A%22nguyenhien29420%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1715250257&hash=10b5305d67d918ea22c8d32cc15b2db65d06627ae75ace895e0c188895f619e3",
  },
});
