import { Tenant } from "../models/tenant.js"
import { Profile } from "../models/profile.js"
import { Listing } from "../models/listing.js"

const create = async (req ,res) => {
  try {
    req.body.manager = req.user.profile
    const tenant = await Tenant.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { tenants: tenant} },
      {new: true}
    )
    tenant.manager = profile
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
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

const deleteTenant = async (req, res) => {
  try {
    
    
  } catch (err) {
    
  }
}


export {
  create,
  show,
  index,
  deleteTenant as delete,
  update
}

