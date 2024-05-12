"use client";
import React, { useState } from "react";
import Image from "next/image";
import SignUpModal from "@/app/components/signupModal";
export default function Page() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      {/* Hero Section with background image and a vibrant call to action */}

      <div className="text-center py-24 hero-background  bg-[url('https://via.placeholder.com/1200x800')] bg-cover bg-center text-white relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold">
            Join the Sports Revolution in Saudi Arabia!
          </h1>
          <p className="text-xl mt-4">
            Your ultimate destination for all sports-related activities.
          </p>
          <button
            onClick={openModal}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700"
          >
            Sign Up Now!
          </button>
        </div>
      </div>

      {/* About Section with richer text content and improved spacing */}
      <section id="about" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-700 text-center">
            About Us
          </h2>
          <p className="mt-8 text-gray-800 text-lg leading-relaxed max-w-4xl mx-auto">
            The KSA Sport Events Platform is a vibrant and user-centric online
            portal dedicated to enriching the sports landscape in Saudi Arabia,
            offering a range of services from event information to ticket
            booking. With our commitment to providing seamless and informative
            experiences, we invite you to explore the dynamic world of sports.
          </p>
        </div>
      </section>

      {/* Features Section with Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              img: "https://via.placeholder.com/400x200",
              title: "Why Choose Us?",
              description:
                "Stand as a cornerstone in Saudi Arabia’s sports culture, offering tailored portals for sports enthusiasts.",
            },
            {
              img: "https://via.placeholder.com/400x200",
              title: "Stay Updated, Stay Ahead",
              description:
                "Detailed showcase of upcoming sports events and real-time updates on your beloved sports clubs.",
            },
            {
              img: "https://via.placeholder.com/400x200",
              title: "A Community for All",
              description:
                "Dynamic meeting place for fans, enhancing connections, managing events, and celebrating sports.",
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
              <Image
                src={feature.img}
                alt={feature.title}
                width={400}
                height={200}
                className="rounded-md"
              />
              <h2 className="text-2xl font-bold mt-4 text-blue-700">
                {feature.title}
              </h2>
              <p className="mt-4 text-gray-800">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section with enhanced layout */}
      <section id="services" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-700">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold text-green-700">
                Event Information
              </h3>
              <p className="text-gray-800">
                Get the latest updates on sports events, schedules, and
                locations all in one place.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold text-red-600">Ticket Booking</h3>
              <p className="text-gray-800">
                Easy and secure online ticket purchases for your favorite sports
                events.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold text-blue-700">
                Community Engagement
              </h3>
              <p className="text-gray-800">
                Join our community to connect with other sports enthusiasts and
                professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with a more interactive approach */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-700">
            Contact Us
          </h2>
          <p className="text-lg mt-4 text-gray-800 text-center">
            Have questions? Reach out to us through our online form, email, or
            phone.
          </p>
          <div className="flex justify-center mt-6">
            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="email"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-message"
                  >
                    Message
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-message"
                    placeholder="Enter your message here..."
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full px-3">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {isModalOpen && <SignUpModal onClose={closeModal} />}
      </section>
    </>
  );
}
