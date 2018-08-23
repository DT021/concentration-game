import reducer, { INIT_OPTIONS, initialState, SET_OPTIONS } from './options';

describe('options reducer', () => {
  beforeEach(() => {
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_OPTIONS', () => {
    const data = {
      cards: [{ discovered: false }],
      id: 'game-id'
    };
    const action = {
      type: SET_OPTIONS, payload: data
    };
    const result = reducer([], action);
    const expectedGame = { cards: data.cards, gameWon: false, id: "game-id", when: result.currentGame.when };
    const expectedPreviousGames = { [expectedGame.id]: expectedGame };

    expect(result.currentGame).toEqual(expectedGame);
    expect(result.previousGames).toEqual(expectedPreviousGames);
    expect(localStorage.setItem.mock.calls.length).toBe(2);
  });

  it('should handle INIT_OPTIONS', () => {
    const startAction = {
      type: INIT_OPTIONS
    };
    global.localStorage.getItem.mockReturnValueOnce(null).mockReturnValueOnce(null);
    expect(reducer([], startAction)).toEqual({ previousGames: {}, currentGame: null });
    expect(localStorage.getItem.mock.calls.length).toBe(2);
  });
});
