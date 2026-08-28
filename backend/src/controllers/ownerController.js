// Owner controller placeholder.
const Owner = require("../models/Owner");
const User = require("../models/User");

const getOwners = async (req, res, next) => {
  try {
    const owners = await Owner.findAll();

    res.json({
      success: true,
      data: owners
    });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (
  req,
  res,
  next
) => {
  try {
    const owner =
      await Owner.findByUserId(req.user.user_id);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner profile not found"
      });
    }

    const user = await User.findById(req.user.user_id);

    res.json({
      success: true,
      data: {
        ...owner,
        user_id: user?.user_id,
        full_name: user?.full_name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        role: user?.role,
        status: user?.status
      }
    });
  } catch (error) {
    next(error);
  }
};

const createOwner = async (
  req,
  res,
  next
) => {
  try {
    const owner = await Owner.create(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Owner profile created",
      data: owner
    });
  } catch (error) {
    next(error);
  }
};

const updateOwner = async (
  req,
  res,
  next
) => {
  try {
    const owner = await Owner.update(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Owner profile updated",
      data: owner
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOwners,
  getMyProfile,
  createOwner,
  updateOwner
};