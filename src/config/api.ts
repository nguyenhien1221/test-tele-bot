import axios from "axios";

const initData = sessionStorage.getItem("__telegram__initParams");
console.log(initData);

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "telegram-data":
      "query_id=AAGuZdFMAAAAAK5l0Uyq_k73&user=%7B%22id%22%3A1288791470%2C%22first_name%22%3A%22Nguy%E1%BB%85n%22%2C%22last_name%22%3A%22Hi%E1%BB%83n%22%2C%22username%22%3A%22nguyenhien29420%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1717384351&hash=fd3c4de247a93148d97a2a3e3657bfaf362f5a740891b5eb314924e942b4a8ca",
  },
});
