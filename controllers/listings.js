import { Listing } from "../models/listing.js";
import { Profile } from "../models/profile.js";
import { v2 as cloudinary } from "cloudinary";

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile;
    console.log(req.body)
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
    const listings = await Listing.find({})
      .populate("tenants")
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

function addPhoto(req, res) {
  console.log(req.files, 'FILES')
  const imageFile = req.files.photo.path;
  console.log('HIT', imageFile)
  Listing.findById(req.params.id)
    .then((listing) => {
      console.log('LISTING', listing)
      cloudinary.uploader
        .upload(imageFile, { tags: `${req.user.email}` })
        .then((image) => {
          console.log(image, "IMAGE")
          listing.photo = image.url;
          listing.save().then((listing) => {
            res.status(201).json(listing.photo);
          });
        })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    console.log(listing)
    const profile = await Profile.findById(req.user.profile);
    console.log(profile)
    profile.listings.remove({ _id: req.params.id });
    await profile.save();
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createWorkRequest = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const listing = await Listing.findById(req.params.id)
    listing.workRequests.push(req.body)
    listing.save()
    const newWorkRequest = listing.workRequests[listing.workRequests.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newWorkRequest.owner = profile
    res.status(201).json(listing)
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateWorkRequest = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
    const workRequest = listing.workRequests.id(req.params.workRequestId)
    for (let key in req.body) {
      if (req.body[key] !== '') workRequest[key] = req.body[key]
    }
    listing.save()
    res.status(201).json(listing)
  } catch (err) {
    res.status(500).json(err);
  }
}

const addTenantToListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
    const newListing = listing.tenants.push(req.body.tenantId)
    listing.save()
    const populatedListing = await listing.populate("tenants")
    res.status(200).json(populatedListing)
  } catch (error) {
    res.status(500).json(error)
  }
}

const removeTenant = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
    const newListing = listing.tenants.splice(req.params.tenantId, 1)
    listing.save()
    console.log("tenants", listing);
    const populatedListing = await listing.populate("tenants")
    res.status(200).json(populatedListing)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  show,
  index,
  deleteListing as delete,
  addPhoto,
  update,
  createWorkRequest,
  updateWorkRequest,
  addTenantToListing,
  removeTenant
}
