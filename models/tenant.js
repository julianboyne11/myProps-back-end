import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    manager: { type: Schema.Types.ObjectId, ref: "Profile" },
  },
  {
    timestamps: true,
  }
);

const tenantSchema = new Schema(
  {
    manager: { type: Schema.Types.ObjectId, ref: "Profile" },
    name: { type: String, required: true },
    lease: { type: String, required: true },
    salary: {type: String},
    current: Boolean,
    listing: { type: Schema.Types.ObjectId, ref: "Listing" },
    comments: [commentSchema],
    contact: Number,
    jobs: [{type: String}],
  },
  {
    timestamps: true,
  }
);

const Tenant = mongoose.model("Tenant", tenantSchema);

export { Tenant };
