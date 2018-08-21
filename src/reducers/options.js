export const SET_OPTIONS = 'SET_OPTIONS';

export const setOptions = (options) => ({ type: SET_OPTIONS, payload: levels });

export default (state = {}, action) => {
  switch (action.type) {
    case SET_OPTIONS:
      localStorage.setItem(options, JSON.stringify(action.payload));
      return { ...action.payload };
    default:
      return state;
  }
}
