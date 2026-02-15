import mongoose from "mongoose"; // Beddel 'require' una beddel 'import'

const ServiceProviderSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    serviceType: { type: String, required: true },

    profileImage: { type: String },
    documents: [{ type: String }],

    availability: { type: Boolean, default: true },

    status: {
      type: String,
      enum: ["pending", "approved", "blocked"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Beddel 'module.exports' una beddel 'export default'
const ServiceProvider = mongoose.model("ServiceProvider", ServiceProviderSchema);
export default ServiceProvider;