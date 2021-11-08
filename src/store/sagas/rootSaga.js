import { takeLatest } from 'redux-saga/effects'
import { GET_BOOKS } from '../types'
import { handleGetNotes } from './handler/books'

export default function* rootSaga() {
    yield takeLatest(GET_BOOKS, handleGetNotes)
}