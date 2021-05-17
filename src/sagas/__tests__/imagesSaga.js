import { runSaga } from 'redux-saga';
import { getPage, handleImagesLoad } from '../imagesSaga';
import * as api from '../../api/index';
import { setError, setImages } from '../../actions';

test('selector gives back the page ', () => {
    const nextPage = 1;
    const state = { nextPage };
    const res = getPage(state);
    expect(res).toBe(nextPage);
});

test('should load images', async () => {
    const dispatchedActions = [];

    const mockImages = ['sds', 'dsdsv'];
    api.fetchImages = jest.fn(() => Promise.resolve(mockImages));

    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handleImagesLoad).done;

    expect(api.fetchImages.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setImages(mockImages));
});

test('should load error', async () => {
    const dispatchedActions = [];

    const error = 'something went wrong';
    api.fetchImages = jest.fn(() => Promise.reject(error));

    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handleImagesLoad).done;

    expect(api.fetchImages.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setError(error));
});