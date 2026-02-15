import { Provider } from '../models/models.js';

// 1. Diiwaangelinta (Xallinta ciladda Postman-ka - image_2e7f46.png)
export const registerProvider = async (req, res) => {
    try {
        const newProvider = await Provider.create(req.body);
        res.status(201).json({ success: true, data: newProvider });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 2. Soo kicinta dhammaan (Xallinta: Nadheeryahan lama helin - image_2e12aa.png)
export const getProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        const formatted = providers.map(p => ({
            _id: p._id,
            name: p.fullName,
            service: p.serviceType,
            location: p.location || "Hargeisa",
            isAvailable: p.isAvailable,
            image: p.image || null
        }));
        res.json({ success: true, data: formatted });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Soo kicinta hal qof (Function-kan ayaa SyntaxError-ka xallinaya - image_2d932a.png)
export const getProviderById = async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) return res.status(404).json({ success: false, message: 'Lama helin' });
        res.json({ success: true, data: provider });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Cusboonaysiinta
export const updateProvider = async (req, res) => {
    try {
        const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: provider });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 5. Cusboonaysiinta Status-ka
export const updateStatus = async (req, res) => {
    try {
        const provider = await Provider.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json({ success: true, data: provider });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};