import axios from "axios";

export const getBooks = () => {
   return axios.get('https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=PGCZ6YuWC4Kz3ZoAI7GRKF4FSwr2TcEC')
}