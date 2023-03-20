import { SET_CORRECTION_TABLE } from "./CorrectionTableActionTypes";

export const SetCorrectionTable = (table) => async (dispatch) => {
  try {
    dispatch({ type: SET_CORRECTION_TABLE, payload: table });
  } catch (e) {}
};
