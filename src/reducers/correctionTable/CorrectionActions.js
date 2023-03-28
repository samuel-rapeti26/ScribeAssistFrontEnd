import { SET_CORRECTION_TABLE } from "./CorrectionActionTypes";

export const SetCorrectionTable = (table) => async (dispatch) => {
  try {
    dispatch({ type: SET_CORRECTION_TABLE, table });
  } catch (e) {}
};
