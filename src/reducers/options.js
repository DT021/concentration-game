const initialState = {
  options: {
    difficulty: 'easy',
    // ... other stuff
  }
};

export default (state = initialState, action) => {
  return state;

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
