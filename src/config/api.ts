import axios from "axios";

// const tele = window.Telegram.WebApp;

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "telegram-data":
      "query_id=AAGuZdFMAAAAAK5l0Uy8Q8L3&user=%7B%22id%22%3A1288791470%2C%22first_name%22%3A%22Nguy%E1%BB%85n%22%2C%22last_name%22%3A%22Hi%E1%BB%83n%22%2C%22username%22%3A%22nguyenhien29420%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1714040445&hash=ccc4a90f15ca025e5be0f0f58837cc46458291e8f921c797906471dbc8ea3cd4",
  },
});
