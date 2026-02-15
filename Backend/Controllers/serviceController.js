import Service from '../models/Service.js';

// 1. Hel dhammaan adeegyada (Kani waa midka xogta u diraya Frontend-ka)
export const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Abuur adeeg cusub
export const createService = async (req, res) => {
    try {
        const newService = await Service.create(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 3. Hel hal adeeg
export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Adeegga lama helin" });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Wax ka beddelka adeegga
export const updateService = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Tiridda adeegga
export const deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Adeegga waa la tirtiray" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 6. Adeegyada uu leeyahay hal provider (Kani wuxuu xallinayaa qaladkii u dambeeyay)
export const getServicesByProvider = async (req, res) => {
    try {
        const services = await Service.find({ provider: req.params.providerId });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};