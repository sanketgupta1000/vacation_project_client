import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-fit flex flex-col">
      <main
        className="flex-1 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/id/24/2500')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-10 md:p-20 text-white flex flex-col items-center">
          <section className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Book Exchange
            </h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto">
              Share and borrow books with your community. Enjoy the pleasure of
              reading while saving resources.
            </p>
            <Link
              to="/signup"
              className="mt-6 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Get Started
            </Link>
          </section>

          <section className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How does it work?
            </h2>
            <p className="text-md md:text-lg">
              If you have any books that you are done reading, you can upload
              them on this site. People will send you requests to borrow your
              books. You can either approve them or reject them. If you approve
              the request, you both will have to meet up somewhere to hand over
              the book. The book receiver will receive an OTP on their email,
              which they will have to share with the book giver to confirm the
              transaction of the book. Once the transaction is complete, the
              user will have 30 days to read the book, after 30 days the user
              will have to follow the same handover procedure to return the
              book. As mentioned earlier, users will also be able to borrow
              other’s books. However, a user can request or borrow only a single
              book at a time.
            </p>
          </section>

          <section className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Use Book Exchange?
            </h2>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
              <div className="flex-1 bg-gray-800 bg-opacity-70 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">For the Readers</h3>
                <p>
                  Find incredible books just a step away from home. Simply
                  borrow your favourite reads from your neighbours!
                </p>
              </div>
              <div className="flex-1 bg-gray-800 bg-opacity-70 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">For the Lenders</h3>
                <p>
                  Share your books with your community and let others enjoy your
                  precious collection. You help save resources and make new
                  connections.
                </p>
              </div>
            </div>
          </section>

          <section className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Safety First
            </h2>
            <p className="text-md md:text-lg">
              Our platform is designed to be a safe community. We use
              verifications to ensure that both lenders and borrowers are
              trustworthy.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
