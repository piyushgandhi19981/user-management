import { REDUCER_ACTION_TYPES } from "../constants/userManagement.constants";
import {
  User,
  DataActionTypes,
  LoadingState,
  UsersListType,
  LocationsType,
} from "../interfaces/userManagement.interface";

export const addUsers = (payload: UsersListType): DataActionTypes => ({
  type: REDUCER_ACTION_TYPES.ADD_USERS,
  users: payload,
});

export const setLoadingState = (payload: LoadingState): DataActionTypes => ({
  type: REDUCER_ACTION_TYPES.UPDATE_LOADING_STATE,
  updatedLoadingState: payload,
});

export const deleteUserFromRedux = (userId: string): DataActionTypes => ({
  type: REDUCER_ACTION_TYPES.DELETE_USER,
  userId,
});

export const updateUserInRedux = (user: User): DataActionTypes => ({
  type: REDUCER_ACTION_TYPES.UPDATE_USER,
  updatedUser: user,
});

export const setErrorInRedux = (error: string): DataActionTypes => ({
  type: REDUCER_ACTION_TYPES.ADD_ERROR,
  error,
});

export const setLocationInRedux = (
  location: LocationsType,
): DataActionTypes => ({
  type: REDUCER_ACTION_TYPES.SET_LOCATION,
  updatedLocation: location,
});
