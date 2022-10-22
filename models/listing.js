import mongoose from "mongoose";

const Schema = mongoose.Schema

const workRequestSchema = new Schema(
  {
    category: {
      type: String
    },
    urgency: {
      type: Boolean
    },
    details: {
      type: String
    },
    resolution: {
      type: String,
      enum: ['Currently Working', 'Completed', 'Now Started']
    },
  },
  { timestamps: true }
)

const listingSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
    address: {
      type: String,
      required: true,
    },
    bedroom: {
      type: Number,
      enum: ['1', '2', '3', '4', '5', '6']
    },
    bathroom: {
      type: Number,
      enum: ['1', '1.5', '2', '2.5', '3', '3+']
    },
    picture: {
      type: String,
      // required: true, 
    },
    rent: {
      type: Number,
      required: true,
    },
    pets: {
      type: [String]
    },
    details: {
      type: String,
    },
    workRequest: [workRequestSchema],
    tenant: { type: Schema.Types.ObjectId, ref: 'Tenant' }
  },
  { timestamps: true }
)

const Listing = mongoose.model('Listing', listingSchema)

export { Listing }