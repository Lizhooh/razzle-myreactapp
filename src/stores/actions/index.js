import { createSlice } from 'redux-starter-kit';

const modal = createSlice({
    slice: 'index',
    initialState: {
        count: 1,
        list: [],
    },
    reducers: {
        update(state, { payload }) {
            return { ...state, ...payload };
        },
    }
});

export default modal.reducer;

export const actions = {
    ...modal.actions,
};

