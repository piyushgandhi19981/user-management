import { useCallback, useEffect, useMemo, FC, memo } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import FormControl from "@mui/material/FormControl";

import UserItem from "../user";
import {
  getUsersAction,
  setLocationInReduxAction,
} from "../../actions/userManagement.actions";

import Loader from "../loader";
import LocationSelect from "../locationSelect/LocationSelect";

import {
  User,
  UsersListType,
  LocationsType,
} from "../../interfaces/userManagement.interface";
import { AppState } from "../../reducer/reducers";
import { getResolvedUsersBasedOnLocation } from "../../helpers/userManagement.helpers";
import { LOADING_ITEM_DEFAULT_INDEX } from "../../constants/userManagement.constants";

import "./userManagement.css";

interface UserManagementProps {
  users: UsersListType;
  loading: boolean;
  loadingIndex: string;
  error: string;
  location: LocationsType;
  setLocation: (updatedLocation: LocationsType) => void;
  getUsers: () => void;
}

const UserManagement: FC<UserManagementProps> = ({
  getUsers,
  users,
  loading,
  loadingIndex,
  location,
  setLocation,
  error,
}) => {
  useEffect(() => {
    getUsers();
  }, []);

  const shouldLoadMainPage = useMemo(
    () => loading && loadingIndex === LOADING_ITEM_DEFAULT_INDEX,
    [loadingIndex, loading],
  );

  const resolvedUsers = useMemo(
    () => getResolvedUsersBasedOnLocation(users, location),
    [users, location],
  );

  const renderUserDetails = useCallback(
    () => (
      <div
        className={`user-list-container ${loadingIndex !== LOADING_ITEM_DEFAULT_INDEX ? "disabled" : ""}`}
      >
        {resolvedUsers.map((user: User) => (
          <UserItem key={user?.id} user={user} />
        ))}
      </div>
    ),
    [resolvedUsers, loadingIndex],
  );

  const handleLocationChange = useCallback(
    (updatedLocation: LocationsType) => {
      setLocation(updatedLocation);
    },
    [setLocation],
  );

  const renderLocationSelect = useCallback(
    () => (
      <>
        <FormControl sx={{ m: 1, width: 300 }}>
          <LocationSelect
            isMulti
            value={location}
            id="select_location"
            onChange={handleLocationChange}
          />
        </FormControl>
      </>
    ),
    [location, handleLocationChange],
  );

  const renderBody = useCallback(
    () =>
      shouldLoadMainPage ? (
        <Loader />
      ) : (
        <>
          {renderLocationSelect()}
          {renderUserDetails()}
        </>
      ),
    [shouldLoadMainPage, renderLocationSelect, renderUserDetails],
  );

  const renderError = useCallback(
    () => error && <h4 className="error">{error}</h4>,
    [error],
  );

  return (
    <>
      <h2 className="header">User Management</h2>
      {renderError()}
      {renderBody()}
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  const userReduxData = state?.usersReducer || {};
  return {
    users: userReduxData?.users || [],
    loading: userReduxData?.loading,
    loadingIndex: userReduxData?.loadingIndex,
    location: userReduxData?.selectedLocation,
    error: userReduxData?.error,
  };
};

const mapDispatchToProps = {
  getUsers: getUsersAction,
  setLocation: setLocationInReduxAction,
};

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
)(UserManagement);
