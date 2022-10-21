import mongoose from "mongoose";

const Schema = mongoose.Schema

const listingSchema = new Schema(
  {
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
    pictures: {
      type: String,
      required: true, 
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
    tenant: { type: Schema.Types.ObjectId, ref: 'Tenant'}
  },
  {timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema)

export { Listing }