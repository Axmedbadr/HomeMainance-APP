import api from './api';

const bookingService = {
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  // Function-kan ku dar si Dashboard-ka iyo BookingPage ay u shaqeeyaan
  getMyBookings: async () => {
    const response = await api.get('/bookings/my-bookings');
    return response.data;
  }
};

// Hubi in labadan midkood uu jiro (waxaan kugula talinayaa labadaba si loo hubiyo)
export { bookingService }; 
export default bookingService;