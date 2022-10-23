import { Listing } from "../models/listing.js";
import { Profile } from "../models/profile.js";
import { v2 as cloudinary } from "cloudinary";

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile;
    const listing = await Listing.create(req.body);
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { listings: listing } },
      { new: true }
    );
    listing.owner = profile;
    res.status(201).json(listing);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const update = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json(err);
  }
};

const index = async (req, res) => {
  try {
    const listings = await Listing.find({}).sort({ createdAt: "desc" });
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json(err);
  }
};

const show = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addPhoto = async (req, res) => {
  const imageFile = req.files.picture.path;
  Listing.findById(req.params.id)
    .then((listing) => {
      cloudinary.uploader.upload(imageFile);
    })
    .then((listing) => {
      listing.picture = image.url;
      listing.save().then((listing) => {
        res.status(201).json(listing.picture);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    const profile = await Profile.findById(req.user.profile);
    profile.listings.remove({ _id: req.params.id });
    await profile.save();
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { create, show, index, deleteListing as delete, addPhoto, update };
