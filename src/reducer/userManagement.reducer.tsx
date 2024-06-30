import {
  LOADING_ITEM_DEFAULT_INDEX,
  REDUCER_ACTION_TYPES,
} from "../constants/userManagement.constants";
import {
  getUpdatedUsersListOnDelete,
  getUpdatedUsersListOnUpdate,
} from "../helpers/userManagement.helpers";
import {
  DataActionTypes,
  ReduxState,
} from "../interfaces/userManagement.interface";

const initialState: ReduxState = {
  users: [],
  loading: true,
  loadingIndex: LOADING_ITEM_DEFAULT_INDEX,
  error: "",
  selectedLocation: [],
};

const userReducer = (
  state = initialState,
  action: DataActionTypes,
): ReduxState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.ADD_USERS:
      return {
        ...state,
        users: action.users,
      };
    case REDUCER_ACTION_TYPES.DELETE_USER:
      return {
        ...state,
        users: getUpdatedUsersListOnDelete(state.users, action.userId),
      };
    case REDUCER_ACTION_TYPES.UPDATE_LOADING_STATE:
      return {
        ...state,
        ...action.updatedLoadingState,
      };
    case REDUCER_ACTION_TYPES.ADD_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case REDUCER_ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        users: getUpdatedUsersListOnUpdate(state.users, action.updatedUser),
        loadingIndex: LOADING_ITEM_DEFAULT_INDEX,
      };
    case REDUCER_ACTION_TYPES.SET_LOCATION:
      return {
        ...state,
        selectedLocation: action.updatedLocation,
      };
    default:
      return state;
  }
};

export default userReducer;
