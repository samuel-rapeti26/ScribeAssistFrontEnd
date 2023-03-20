import { SET_USER, SET_ROLE } from "./UserActionTypes";

export const SetUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: SET_USER, payload: user });
  } catch (e) {}
};

export const SetRole = (role) => async (dispatch) => {
  try {
    dispatch({ type: SET_ROLE, payload: role });
  } catch (e) {}
};
