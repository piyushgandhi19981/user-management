import {
  User,
  UsersListType,
  LocationsType,
} from "../interfaces/userManagement.interface";

export const getUpdatedUsersListOnUpdate = (
  users: UsersListType,
  updatedUser: User,
) =>
  users.map((user) => {
    const userId = user?.id;
    if (userId === updatedUser?.id) {
      return updatedUser;
    }
    return user;
  });

export const getUpdatedUsersListOnDelete = (
  users: UsersListType,
  userId: string,
) => users.filter((user) => user?.id !== userId);

export const getResolvedUsersBasedOnLocation = (
  users: UsersListType,
  location: LocationsType,
) => {
  if (!location?.length) return users;
  const locationSet = new Set(location);
  return users.filter((user) => locationSet.has(user?.location));
};
