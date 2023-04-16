import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* addItem(action) {
    try {
        console.log('Inside of AddItem Generator function', action)
        // Post request to add an additional item.
        yield axios.post('/api/shelf', action.payload);

        // Call the GET generator to get the new list of items.
        yield put({ type: 'FETCH_ITEMS', payload: action.payload });

    } catch (error) {
        console.log('Error with adding a new item', error);
    }
}

function* addItemSaga() {
    yield takeLatest('ADD_ITEM', addItem);
}

export default addItemSaga;