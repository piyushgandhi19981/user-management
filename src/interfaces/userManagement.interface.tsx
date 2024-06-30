import { REDUCER_ACTION_TYPES } from "../constants/userManagement.constants";

export interface User {
  createdAt: string;
  name: string;
  avatar: string;
  hobby: string;
  location: string;
  id: string;
}

export type UsersListType = [User] | [];
export type LocationsType = [string] | [];

export interface LoadingState {
  loading: boolean;
  loadingIndex?: string;
}

export interface ReduxState {
  users: UsersListType;
  loading: boolean;
  loadingIndex: string;
  error: string;
  selectedLocation: LocationsType;
}

interface FetchUserDataAction {
  type: typeof REDUCER_ACTION_TYPES.ADD_USERS;
  users: UsersListType;
}

interface UpdateDataAction {
  type: typeof REDUCER_ACTION_TYPES.UPDATE_USER;
  updatedUser: User;
}

interface DeleteUserAction {
  type: typeof REDUCER_ACTION_TYPES.DELETE_USER;
  userId: string;
}

interface SetLocationAction {
  type: typeof REDUCER_ACTION_TYPES.SET_LOCATION;
  updatedLocation: LocationsType;
}

interface SetErrorAction {
  type: typeof REDUCER_ACTION_TYPES.ADD_ERROR;
  error: string;
}

interface SetLoadingState {
  type: typeof REDUCER_ACTION_TYPES.UPDATE_LOADING_STATE;
  updatedLoadingState: LoadingState;
}

export type DataActionTypes =
  | FetchUserDataAction
  | UpdateDataAction
  | DeleteUserAction
  | SetLoadingState
  | SetLocationAction
  | SetErrorAction;
