import { call, put } from 'redux-saga/effects';
import { setBooks } from '../../actions/booksActions';
import { getBooks } from '../requests/books';

export function* handleGetBooks() {
    try {
        const response = yield call(getBooks);

        console.log(response)
        yield put(setBooks(response.data.results))
    } catch (error) {
        console.log(error)
    }
}