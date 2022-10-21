import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  Listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }]
},
  {
    timestamps: true,
  })

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
