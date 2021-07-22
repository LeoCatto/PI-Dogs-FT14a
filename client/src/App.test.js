import rootReducer from './Reducers/index';

test('reducers', () => {
  let state;
  state = rootReducer(undefined, {});
  expect(state).toEqual({dogs:[],dogsDetail:[],temperaments:[],filtereddogs:[]});
});