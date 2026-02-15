import api from './api';

const providerService = {
    // 1. Soo kicinta dhammaan (Xallinta fariinta: Nadheeryahan lama helin)
    getAll: async () => {
        try {
            const response = await api.get('/providers');
            // Backend-kaagu wuxuu soo celiyaa { success: true, data: [...] }
            // Waa inaan u marnaa response.data.data si aan u helno liiska
            return response.data.data || response.data;
        } catch (error) {
            console.error("Error fetching providers:", error);
            return [];
        }
    },

    // 2. Diiwaangelinta (Register)
    register: async (providerData) => {
        const response = await api.post('/providers/register', providerData);
        return response.data;
    },

    // 3. Inta kale ee functions-ka
    getById: async (id) => {
        const response = await api.get(`/providers/${id}`);
        return response.data.data || response.data;
    }
};

// XALKA SYNTAX ERROR: Labadan dhoofinba waa muhiim
export { providerService };
export default providerService;