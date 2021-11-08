 import { takeEvery } from "@redux-saga/core/effects";
 import { GET_BOOKS } from "../types";
 import { handleGetBooks } from "./handlers/books";

 export default function* rootSaga() {
     yield takeEvery(GET_BOOKS, handleGetBooks);
 };