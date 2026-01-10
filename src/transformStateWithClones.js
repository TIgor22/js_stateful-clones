'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const arrStates = [];

  for (const action of actions) {
    const { type } = action;

    if (type === 'addProperties') {
      const { extraData } = action;

      Object.assign(copyState, extraData);

      const addState = { ...copyState };

      arrStates.push(addState);
    }

    if (type === 'removeProperties') {
      const { keysToRemove } = action;

      for (const key of keysToRemove) {
        delete copyState[key];
      }

      const removeState = { ...copyState };

      arrStates.push(removeState);
    }

    if (type === 'clear') {
      const keys = Object.keys(copyState);

      for (const key of keys) {
        delete copyState[key];
      }

      const clearState = { ...copyState };

      arrStates.push(clearState);
    }
  }

  return arrStates;
}

module.exports = transformStateWithClones;
