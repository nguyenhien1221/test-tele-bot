import axios from "axios";

// const tele = window.Telegram.WebApp;

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "telegram-data":
      "query_id=AAGuZdFMAAAAAK5l0Uw9RDu1&user=%7B%22id%22%3A1288791470%2C%22first_name%22%3A%22Nguy%E1%BB%85n%22%2C%22last_name%22%3A%22Hi%E1%BB%83n%22%2C%22username%22%3A%22nguyenhien29420%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1716203221&hash=e3ee9be8af88ef0f7a7f91aecad18d3bca89278fd15f1f64acc5fd24acf7b683",
  },
});
