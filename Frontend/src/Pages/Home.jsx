import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-3">
            Find Trusted Home Service Professionals
          </h1>
          <p className="text-xl mb-4 max-w-2xl mx-auto">
            Book qualified professionals for all your home maintenance needs. 
            Quick, reliable, and hassle-free.
          </p>
          <Link
            to="/register"
            className="btn btn-white btn-lg"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 text-center mb-4">
              <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-bold mb-2">Wide Range of Services</h3>
              <p className="text-secondary">
                From plumbing to electrical, we've got you covered.
              </p>
            </div>

            <div className="col-md-3 text-center mb-4">
              <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-bold mb-2">Vetted Professionals</h3>
              <p className="text-secondary">
                All providers are background-checked and verified.
              </p>
            </div>

            <div className="col-md-3 text-center mb-4">
              <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-bold mb-2">Easy Booking</h3>
              <p className="text-secondary">
                Schedule appointments in minutes with our simple interface.
              </p>
            </div>

            <div className="col-md-3 text-center mb-4">
              <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-bold mb-2">Quality Guaranteed</h3>
              <p className="text-secondary">
                Rate your experience and help us maintain high standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Fix Your Home?</h2>
          <p className="text-xl mb-4 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their home maintenance needs.
          </p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Link to="/register" className="btn btn-primary btn-lg">
              Sign Up as Customer
            </Link>
            <Link to="/provider/register" className="btn btn-success btn-lg">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;