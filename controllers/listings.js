import { Listing } from "../models/listing.js";
import { Profile } from "../models/profile.js";

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const listing = await Listing.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { listings: listing } },
      { new: true }
    )
    listing.owner = profile
    res.status(201).json(listing)
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {


  } catch (err) {

  }
}

const index = async (req, res) => {
  try {


  } catch (err) {

  }
}

const show = async (req, res) => {
  try {


  } catch (err) {

  }
}

const addPhoto = async (req, res) => {
  try {


  } catch (err) {

  }
}

const deleteListing = async (req, res) => {
  try {


  } catch (err) {

  }
}


export {
  create,
  show,
  index,
  deleteListing as delete,
  addPhoto,
  update
}