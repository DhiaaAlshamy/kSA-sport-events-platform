import React from "react";

export default function page() {
  return (
    <>
      <div class="text-center py-24 hero-background text-white">
        <h1 class="text-5xl font-bold">
          Join the Sports Revolution in Saudi Arabia!
        </h1>
        <p class="text-xl mt-4">
          Your ultimate destination for all sports-related activities.
        </p>
        <button class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
          Sign Up Now!
        </button>
      </div>

      <section id="about" class="bg-white py-12">
        <div class="text-center">
          <h2 class="text-3xl font-bold">About Us</h2>
          <p class="mt-4 max-w-4xl mx-auto">
            The KSA Sport Events Platform is a vibrant and user-centric online
            portal dedicated to enriching the sports landscape in Saudi Arabia,
            offering a range of services from event information to ticket
            booking.
          </p>
        </div>
      </section>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
        <div class="bg-white p-6 shadow-lg rounded-lg">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Dynamic Sports Events"
            class="rounded-md"
          />
          <h2 class="text-2xl font-bold mt-4">
            Why Choose KSA Sport Events Platform?
          </h2>
          <p class="mt-4">
            The KSA Sport Events Platform stands as a cornerstone in Saudi
            Arabia’s sports culture, offering a unique and comprehensive portal
            tailored for sports enthusiasts.
          </p>
        </div>
        <div class="bg-white p-6 shadow-lg rounded-lg">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Updated Schedules"
            class="rounded-md"
          />
          <h2 class="text-2xl font-bold mt-4">Stay Updated, Stay Ahead</h2>
          <p class="mt-4">
            Never miss out on any action with our detailed showcase of upcoming
            sports events. Follow your beloved sports clubs and stay in the loop
            with real-time updates.
          </p>
        </div>
        <div class="bg-white p-6 shadow-lg rounded-lg">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Community Engagement"
            class="rounded-md"
          />
          <h2 class="text-2xl font-bold mt-4">
            A Community for All Sports Lovers
          </h2>
          <p class="mt-4">
            Join a vibrant community of sports fans and industry professionals.
            The platform serves as a dynamic meeting place where fans can
            connect, manage events, and celebrate sports.
          </p>
        </div>
      </div>

      <section id="services" class="py-12 bg-gray-200">
        <div class="text-center">
          <h2 class="text-3xl font-bold">Our Services</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div class="bg-white p-6 shadow-lg rounded-lg">
              <h3 class="text-xl font-bold">Event Information</h3>
              <p>
                Get the latest updates on sports events, schedules, and
                locations all in one place.
              </p>
            </div>
            <div class="bg-white p-6 shadow-lg rounded-lg">
              <h3 class="text-xl font-bold">Ticket Booking</h3>
              <p>
                Easy and secure online ticket purchases for your favorite sports
                events.
              </p>
            </div>
            <div class="bg-white p-6 shadow-lg rounded-lg">
              <h3 class="text-xl font-bold">Community Engagement</h3>
              <p>
                Join our community to connect with other sports enthusiasts and
                professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="bg-white py-12">
        <div class="text-center">
          <h2 class="text-3xl font-bold">Contact Us</h2>
          <p class="mt-4">
            Have questions? Reach out to us through our online form, email, or
            phone.
          </p>
        </div>
      </section>
    </>
  );
}
