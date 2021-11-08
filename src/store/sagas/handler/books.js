import { call, put } from 'redux-saga/effects';
import { setBooks } from '../../actions/booksActions';
import { getBooks } from '../requests/books';

export function* handleGetNotes () {
    try {
        const response = yield call(getBooks);

        yield put(setBooks(response.data))
    } catch (error) {
        console.log(error)
    }
}