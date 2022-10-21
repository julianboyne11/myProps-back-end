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
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true })
    res.status(200).json(listing)
  } catch (err) {
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const listings = await Listing.find({})
      .sort({ createdAt: 'desc' })
    res.status(200).json(listings)
  } catch (err) {
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)

    res.status(200).json(listing)
  } catch (err) {
    res.status(500).json(err)
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