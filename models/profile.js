import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    name: String,
    photo: String,
    listings: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
    tenants: [{type: Schema.Types.ObjectId, ref: "Tenant"}]
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export { Profile };
