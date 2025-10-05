import React, { useState } from 'react';
import bikeMaintenanceImage from '../images/extend1.avif';
import engineOilImage from '../images/engine_oil.jpg';
import brakeCheckImage from '../images/brakes.jpg';

// Define the type for the isExtended state keys
type BlogKey = 'extendLife' | 'engineOil' | 'brakeChecks';

const Blog = () => {
  const [isExtended, setIsExtended] = useState<{
    extendLife: boolean;
    engineOil: boolean;
    brakeChecks: boolean;
  }>({
    extendLife: false,
    engineOil: false,
    brakeChecks: false,
  });

  const toggleDescription = (blog: BlogKey) => {
    setIsExtended((prev) => ({
      ...prev,
      [blog]: !prev[blog],
    }));
  };

  return (
    <main className="bg-slate-800 pt-[60px] sm:pt-[90px] lg:pt-[120px] min-h-screen">
      <div className="p-8 bg-slate-800">
        {/* Title section with green lines */}
        <div className="flex flex-col items-center mb-12">
          <div className="h-1 w-16 bg-lime-500 rounded-full mb-2"></div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            <span className="text-blue-600">Latest</span>{' '}
            <span className="text-orange-600">Blogs</span>
          </h1>
          <div className="h-1 w-48 bg-lime-500 rounded-full mt-2"></div>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blog Post Card 1 */}
            <div className="bg-sky-100 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={bikeMaintenanceImage}
                alt="Person maintaining a motorcycle in a garage"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">How to Extend Your Bike's Life</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {isExtended.extendLife
                    ? 'Regular maintenance is key to a long and healthy life for your two-wheeler. Here are some simple tips to keep your bike in top condition. Start with routine oil changes to ensure the engine runs smoothly, check tire pressure monthly to avoid wear and tear, and inspect the chain for proper lubrication and tension. Additionally, clean your bike regularly to prevent rust and corrosion, especially after riding in wet conditions. Keep an eye on the brake pads and replace them when they show signs of thinning. By following these steps and scheduling professional check-ups every six months, you can significantly extend the lifespan of your bike and enjoy worry-free rides for years to come.'
                    : 'Regular maintenance is key to a long and healthy life for your two-wheeler. Here are some simple tips to keep your bike in top condition.'}
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDescription('extendLife');
                  }}
                  className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                >
                  {isExtended.extendLife ? 'Read Less' : 'Read More'}
                </a>
              </div>
            </div>

            {/* Blog Post Card 2 */}
            <div className="bg-sky-100 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={engineOilImage}
                alt="Hand pouring engine oil into a motorcycle"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Engine Oil: Your Bike's Lifeline</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {isExtended.engineOil
                    ? "Learn why the right engine oil and changing it on time can dramatically improve your bike's performance and longevity. Engine oil lubricates moving parts, reduces friction, and helps dissipate heat, preventing engine wear. Choosing the correct oil viscosity based on your bike’s manual is crucial, as is adhering to the recommended oil change intervals—typically every 3,000 to 5,000 kilometers or as advised by the manufacturer. Always use high-quality oil that meets your bike’s specifications to avoid sludge buildup. Regularly check the oil level with the dipstick and top it up if needed. Neglecting this vital component can lead to costly repairs, so make it a priority in your maintenance routine."
                    : "Learn why using the right engine oil and changing it on time can dramatically improve your bike's performance and longevity."}
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDescription('engineOil');
                  }}
                  className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                >
                  {isExtended.engineOil ? 'Read Less' : 'Read More'}
                </a>
              </div>
            </div>

            {/* Blog Post Card 3 */}
            <div className="bg-sky-100 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={brakeCheckImage}
                alt="Person inspecting the brake pads of a motorcycle"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">The Importance of Brake Checks</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {isExtended.brakeChecks
                    ? 'Your safety depends on your brakes. Find out how often you should check them and what to look for to ensure a safe ride. Brake checks should be performed every 2,000 to 3,000 kilometers or before long trips. Inspect the brake pads for wear—replace them if they are less than 1-2 mm thick. Check the brake fluid level and look for leaks or contamination; top up or flush the system with the recommended fluid if necessary. Listen for unusual noises like squealing or grinding, which indicate potential issues. Ensure the brake lever and pedal feel firm, not spongy. Regular maintenance by a professional can prevent accidents and keep you safe on the road.'
                    : 'Your safety depends on your brakes. Find out how often you should check them and what to look for to ensure a safe ride.'}
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDescription('brakeChecks');
                  }}
                  className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                >
                  {isExtended.brakeChecks ? 'Read Less' : 'Read More'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blog;
