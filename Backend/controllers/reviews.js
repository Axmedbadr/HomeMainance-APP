import { Review } from '../models/models.js';

// 1. CREATE REVIEW (Marka macmiilku faallo qorayo)
export const createReview = async (req, res) => {
  try {
    const { service, serviceProvider, rating, comment } = req.body;

    const review = await Review.create({
      user: req.user._id, // Waxaan ka soo qaadeynaa protect middleware (Amni ahaan)
      service,
      serviceProvider,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 2. GET REVIEWS BY SERVICE
export const getReviewsByService = async (req, res, next) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .populate('user', 'name'); // Si loo arko qofka qoray magaciisa
    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

// 3. GET REVIEWS BY PROVIDER (Si Nasir loogu arko faallooyinka loo qoray)
export const getReviewsByProvider = async (req, res, next) => {
  try {
    const reviews = await Review.find({ serviceProvider: req.params.providerId })
      .populate('user', 'name');
    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

// 4. DELETE REVIEW
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review-gan lama helin' });
    }
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};