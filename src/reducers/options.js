export const SET_OPTIONS = 'SET_OPTIONS';
export const INIT_OPTIONS = 'INIT_OPTIONS';

export const setOptions = options => ({ type: SET_OPTIONS, payload: options });
export const initOptions = () => ({ type: INIT_OPTIONS });

export const initialState = {
  currentGame: {},
  previousGames: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OPTIONS: {
      const gameWon = action.payload.cards.every(card => card.discovered);
      const when = new Date();
      const currentGame = { ...action.payload, gameWon, when: when.toLocaleString() };
      const previousGames = { ...state.previousGames, [currentGame.id]: currentGame };
      localStorage.setItem('previousGames', JSON.stringify(previousGames));
      localStorage.setItem('currentGame', JSON.stringify(currentGame));
      return { currentGame, previousGames };
    }
    case INIT_OPTIONS: {
      const games = JSON.parse(localStorage.getItem('previousGames')) || {};
      const current = JSON.parse(localStorage.getItem('currentGame'));
      return { previousGames: games, currentGame: current };
    }
    default:
      return state;
  }
}
