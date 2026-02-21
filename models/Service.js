import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: String
}, { timestamps: true });

// Waxaan u beddelnay 'export default' si uu 'import' ugu shaqeeyo
export default mongoose.model('Service', serviceSchema);