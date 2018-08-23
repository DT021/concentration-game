import reducer, {SET_LEVELS} from './levels';

describe('levels reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle SET_LEVELS', () => {
    const data = ['hard'];
    const startAction = {
      type: SET_LEVELS, payload: data
    };
    expect(reducer([], startAction)).toEqual(data);
  });
});
