import { call, fork, put, take } from "redux-saga/effects";
import { loadImagesStats, setErrorStats, setImagesStats } from "../actions";
import { fetchStats } from "../api";
import { IMAGES } from "../constants";

function* handleStatsRequest(id) {
    for (let i = 0; i < 3; i++) {
        try {
            yield put(loadImagesStats(id));
            const res = yield call(fetchStats, id);
            yield put(setImagesStats(id, res.downloads.total));
            return true;
        } catch (e) {

        }
    }
    yield put(setErrorStats(id));
}

export default function* watchStatsRequest() {
    while (true) {
        const { images } = yield take(IMAGES.LOAD_SUCCESS);

        for (let i = 0; i < images.length; i++) {
            yield fork(handleStatsRequest, images[i].id);
        }
    }
}