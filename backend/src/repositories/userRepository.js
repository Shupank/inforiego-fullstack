// src/repositories/userRepository.js
import User from "../models/userModel.js";

const getById = async (userId) => {
  return await User.findById(userId).select("-password").lean();
};

export default { getById };