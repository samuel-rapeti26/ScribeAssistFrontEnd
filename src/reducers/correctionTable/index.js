import { SET_CORRECTION_TABLE } from "./CorrectionTableActionTypes";

const correctionTableReducer = (state, action) => {
  switch (action.type) {
    case SET_CORRECTION_TABLE:
      return { ...state, table: action.payload };
    default:
      return { table: [] };
  }
};

export default correctionTableReducer;
