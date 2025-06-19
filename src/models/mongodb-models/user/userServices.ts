import User from "./user.mongodb-model";

export async function getAllUsersService() {
  const allUsers = await User.find();
  return allUsers;
}

export async function getUserByIdService(id: string) {
  const user = await User.findById(id);
  return user;
}

export async function createUserService(data: {
  user_name: string;
  user_email: string;
  user_password: string;
}) {
  const createdUser = new User(data);
  console.log(createdUser);
  return await createdUser.save();
}

export async function updateUserService(data: {
  id: string;
  name: string;
  email: string;
  password: string;
}) {
  const updatedUser = await User.updateOne(
    { _id: data.id },
    {
      $set: {
        user_name: data.name,
        user_email: data.email,
        user_password: data.password,
      },
    }
  );
  return updatedUser;
}

export async function deleteUserService(id: string) {
  const deletedUser = await User.deleteOne({ _id: id });

  return deletedUser;
}

export async function findUserByEmail(user_email: string) {
  console.log("findUser ", user_email);  
  const user = await User.findOne({ user_email: user_email });
  console.log("findUser ", user);
  return user;
}
