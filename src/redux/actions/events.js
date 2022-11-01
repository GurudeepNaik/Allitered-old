import { ActionType } from "./../actions"

export default class EventsAction {

  static SetStarted = (payload) => {
    return (dispatch) => {
      dispatch({ type: ActionType.STARTED, payload: payload })
    }
  }

  static SetUserLevel = (payload) => {
    return (dispatch) => {
      dispatch({ type: ActionType.USERLEVEL, payload: payload })
    }
  }

  static SetUserPoints = (payload) => {
    return (dispatch) => {
      dispatch({ type: ActionType.USERPOINTS, payload: payload })
    }
  }

  static SetTempSavedPrompt = (payload) => {
    return (dispatch) => {
      dispatch({ type: ActionType.TEMPSAVEDPROMPT, payload: payload })
    }
  }

  static SetSavedPrompts = (payload) => {
    return (dispatch) => {
      dispatch({ type: ActionType.SAVEDPROMPTS, payload: payload })
    }
  }
}
