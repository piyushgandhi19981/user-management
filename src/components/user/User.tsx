import { useCallback, memo, FC } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import LocationSelect from "../locationSelect";
import InputLabel from "@mui/material/InputLabel";
import CloseIcon from "@mui/icons-material/Close";

import { User } from "../../interfaces/userManagement.interface";
import { AppState } from "../../reducer/reducers";
import {
  deleteUserAction,
  updateUserDetailsAction,
} from "../../actions/userManagement.actions";

import "./user.css";

interface UserItemProps {
  user: User;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
}

const UserItem: FC<UserItemProps> = ({ user, updateUser, deleteUser }) => {
  const date = new Date(user?.createdAt).toLocaleDateString();

  const userId = user?.id;

  const handleLocationChange = (updatedLocation: string) => {
    const payload = { ...user, location: updatedLocation };
    updateUser(payload);
  };

  const handleDelete = useCallback(() => {
    deleteUser(userId);
  }, [deleteUser, userId]);

  const renderDetailItem = useCallback((label: string, value: string) => {
    return (
      <div className="detail-item">
        <InputLabel>{label}</InputLabel>:<InputLabel>{value}</InputLabel>
      </div>
    );
  }, []);

  return (
    <div className="user-list-item">
      <div className="delete-user" onClick={handleDelete}>
        <CloseIcon />
      </div>
      <div className="user-detail-img-container">
        <img className="user-img" src={user?.avatar} alt={userId} />
        <div className="user-detail-container">
          {renderDetailItem("Name", user?.name)}
          {renderDetailItem("Hobby", user?.hobby)}
          {renderDetailItem("Created on", date)}
        </div>
      </div>
      <LocationSelect
        onChange={handleLocationChange}
        id={`${userId}_location`}
        value={user?.location}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  const userReduxData = state?.usersReducer || {};
  return {
    loading: userReduxData?.loading,
    loadingIndex: userReduxData?.loadingIndex,
  };
};

const mapDispatchToProps = {
  updateUser: updateUserDetailsAction,
  deleteUser: deleteUserAction,
};

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
)(UserItem);
