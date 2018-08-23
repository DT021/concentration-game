import reducer from './root';

describe('root reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      levels: [],
      options: {
        currentGame: {},
        previousGames: {},
      }
    });
  });
});
