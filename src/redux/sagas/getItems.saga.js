import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


//SAGA GET
function* getItems() {
    try {
        const itemList = yield axios.get('/api/shelf')
        console.log('itemList', itemList)

        yield put({ type: 'SET_ITEMS', payload: itemList.data})
    }catch (error) {
        console.log('get request failed', error)
    }
}

//FOR ROOT SAGA
function* getItemSaga() {
    yield takeLatest('FETCH_ITEMS', getItems)
}

export default getItemSaga;