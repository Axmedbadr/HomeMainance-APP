import mongoose from "mongoose";

const ServiceProviderSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    serviceType: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["pending", "approved", "blocked"], 
        default: "pending" 
    }
}, { timestamps: true });

// Kani waa saxitaanka kama dambaysta ah:
// Wuxuu hubinayaa haddii model-ka "Provider" uu jiro, haddii kale ayuu abuurayaa.
const ServiceProvider = mongoose.models.Provider || mongoose.model("Provider", ServiceProviderSchema);

export default ServiceProvider;