import { Listing } from "../models/listing.js";
import { Profile } from "../models/profile.js";
import { v2 as cloudinary } from 'cloudinary'
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
  const imageFile = req.files.picture.path
  Listing.findById(req.params.id)
    .then(listing => {
      cloudinary.uploader.upload(imageFile)
    })
    .then(listing => {
      listing.picture = image.url
      listing.save()
        .then(listing => {
          res.status(201).json(listing.picture)
        })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
}

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.listings.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(listing)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createWorkRequest = async (req, res) => {
  try {
    // sets the work request to who made it
    req.body.owner = req.user.profile
    const listing = await Listing.findById(req.params.id)
    listing.workRequests.push(req.body)
    await listing.save()

    // Find newly created comment
    // Not sure if we need this but I'll include it for now
    const newWorkRequest = listing.workRequests[listing.workRequests.length - 1]

    const profile = await Profile.findById(req.user.profile)
    newWorkRequest.owner = profile

    res.status(201).json(newWorkRequest)
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateWorkRequest = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
    const workRequest = listing.workRequests.id(req.params.workRequestId)
    console.log('req.body', req.body)
    for (let key in req.body) {
      if (req.body[key] !== '') workRequest[key] = req.body[key]
    }
    listing.save()
    console.log('updated', workRequest)
    res.status(201).json(workRequest)
  } catch (err) {
    res.status(500).json(err)
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
  updateWorkRequest
}