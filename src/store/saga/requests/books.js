import axios from "axios";

export const getBooks = () => {
    axios.get('https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=gwwLGpJkZkSvDoI1efJ8gpKhLGtIL2Zc')
    // .then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // });
};