import { ActionType } from '../actions';

const initialState = {
  started: false,
  userLevel: 1,
  userPoints: 0,
  tempSavedPrompt: [],
  savedPrompts: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.STARTED:
      return { ...state, started: action.payload }
    case ActionType.USERLEVEL:
      return { ...state, userLevel: action.payload }
    case ActionType.USERPOINTS:
      return { ...state, userPoints: action.payload }
    case ActionType.TEMPSAVEDPROMPT:
      return { ...state, tempSavedPrompt: action.payload }
    case ActionType.SAVEDPROMPTS:
      return { ...state, savedPrompts: state.savedPrompts? [...state.savedPrompts, action.payload] : [action.payload] };
    default:
      return state;
  }
};
