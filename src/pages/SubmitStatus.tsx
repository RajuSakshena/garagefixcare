import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const SubmitStatus = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');

  const isSuccess = status === 'success';

  return (
    <>
      <SEOHelmet 
        title={isSuccess ? "Booking Submitted" : "Submission Failed"}
        description={isSuccess ? "Your service booking was successfully submitted." : "There was an issue submitting your service booking. Please try again."}
      />
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          {isSuccess ? (
            <div className="text-green-500 mb-4">
              <CheckCircle size={64} className="mx-auto" />
            </div>
          ) : (
            <div className="text-red-500 mb-4">
              <XCircle size={64} className="mx-auto" />
            </div>
          )}
          
          <h1 className={`text-3xl font-bold mb-2 ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
            {isSuccess ? 'Your Application Submitted!' : 'Submission Failed'}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {isSuccess
              ? "Please wait for 15 minutes. We'll contact you shortly to confirm your booking."
              : "Your application was not submitted. Please try again."}
          </p>

          {/* ✅ Fixed: React Router navigation instead of <a href> */}
          <Link 
            to="/book" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go Back to Booking Page
          </Link>
        </div>
      </div>
    </>
  );
};

export default SubmitStatus;
