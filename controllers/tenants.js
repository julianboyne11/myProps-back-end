import { Tenant } from "../models/tenant.js";
import { Profile } from "../models/profile.js";
import { Listing } from "../models/listing.js";

const create = async (req, res) => {
  console.log("THIS IS REQ.BODY", req.body);
  try {
    req.body.manager = req.user.profile;
    const tenant = await Tenant.create(req.body);
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { tenants: tenant } },
      { new: true }
    );
    tenant.manager = profile;
    res.status(201).json(tenant);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const index = async (req, res) => {
  try {
    const tenants = await Tenant.find({})
      .populate("manager")
      .sort({ createdAt: "desc" });
    res.status(200).json(tenants);
  } catch (err) {
    res.status(500).json(err);
  }
};

const show = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id).populate("manager");
    res.status(200).json(tenant);
  } catch (err) {
    res.status(500).json(err);
  }
};

const update = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("manager");
    res.status(200).json(tenant);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    const profile = await Profile.findById(req.user.profile);
    profile.tenants.remove({ _id: req.params.id });
    await profile.save();
    res.status(200).json(tenant);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createComment = async (req, res) => {
  try {
    req.body.manager = req.user.profile;
    const tenant = await Tenant.findById(req.params.id);
    tenant.comments.push(req.body);
    await tenant.save();

    const newComment = tenant.comments[tenant.comments.length - 1];
    const profile = await Profile.findById(req.user.profile);
    newComment.manager = profile;
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { create, show, index, deleteTenant as delete, update, createComment };
