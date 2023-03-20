import { SET_USER, SET_ROLE } from "./UserActionTypes";

const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ROLE:
      return { ...state, role: action.payload };
    default:
      return {};
  }
};

export default userReducer;
