import { Dispatch } from "redux";
import { ERROR_REMOVE_INTERVAL } from "../constants/userManagement.constants";
import {
  DataActionTypes,
  LocationsType,
  User,
} from "../interfaces/userManagement.interface";
import {
  setLoadingState,
  addUsers,
  updateUserInRedux,
  setErrorInRedux,
  deleteUserFromRedux,
  setLocationInRedux,
} from "../reducer/actionCreator";
import {
  fetchUsers,
  deleteUser,
  updateUserDetails,
} from "../services/userManagement.service";

const handleErrorChange = (
  error: string,
  dispatch: Dispatch<DataActionTypes>,
) => {
  dispatch(setErrorInRedux(error));
  setTimeout(() => {
    dispatch(setErrorInRedux(""));
  }, ERROR_REMOVE_INTERVAL);
};

export const getUsersAction =
  () => async (dispatch: Dispatch<DataActionTypes>) => {
    try {
      const response = await fetchUsers();
      const data = await response.json();
      if (response?.ok) {
        dispatch(addUsers(data));
      } else {
        handleErrorChange(data, dispatch);
      }
    } catch {
      handleErrorChange("Failed to Fetch Users", dispatch);
    } finally {
      dispatch(setLoadingState({ loading: false }));
    }
  };

export const deleteUserAction =
  (userId: string) => async (dispatch: Dispatch<DataActionTypes>) => {
    try {
      dispatch(setLoadingState({ loading: true }));
      const response = await deleteUser(userId);
      const data = await response.json();

      if (response.ok) {
        dispatch(deleteUserFromRedux(userId));
      } else {
        handleErrorChange(data, dispatch);
      }
    } catch {
      handleErrorChange("Failed to delete user", dispatch);
    } finally {
      dispatch(setLoadingState({ loading: false }));
    }
  };

export const updateUserDetailsAction =
  (payload: User) => async (dispatch: Dispatch<DataActionTypes>) => {
    try {
      dispatch(setLoadingState({ loading: true, loadingIndex: payload?.id }));
      const response = await updateUserDetails(payload);
      const data = await response.json();
      if (response.ok) {
        dispatch(updateUserInRedux(payload));
      } else {
        handleErrorChange(data, dispatch);
      }
    } catch {
      handleErrorChange("Failed to update user location", dispatch);
    } finally {
      dispatch(setLoadingState({ loading: false }));
    }
  };

export const setLocationInReduxAction =
  (location: LocationsType) => (dispatch: Dispatch<DataActionTypes>) => {
    dispatch(setLocationInRedux(location));
  };
