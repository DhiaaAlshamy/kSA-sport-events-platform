const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      {
        username: "AliAlAhmed",
        email: "ali@example.com",
        password: "pas",
        role: "Admin",
      },
      {
        username: "SaraAlFaisal",
        email: "sara@example.com",
        password: "pas",
        role: "Organizer",
      },
      {
        username: "MohamedAlSaud",
        email: "mohamed@example.com",
        password: "pas",
        role: "NormalUser",
      },
      {
        username: "LaylaAlGhamdi",
        email: "layla@example.com",
        password: "pas",
        role: "Organizer",
      },
      {
        username: "KhalidAlQahtani",
        email: "khalid@example.com",
        password: "pas",
        role: "NormalUser",
      },
    ],
  });

  // Seed Clubs
  const clubs = await prisma.club.createMany({
    data: [
      {
        name: "Al Hilal",
        description: "Top professional football club in Riyadh.",
        logoUrl: "https://example.com/alhilal.png",
        foundedDate: new Date("1957-10-16"),
      },
      {
        name: "Al Nassr",
        description: "Major football club based in Riyadh.",
        logoUrl: "https://example.com/alnassr.png",
        foundedDate: new Date("1955-08-24"),
      },
      {
        name: "Al Ahli",
        description:
          "Jeddah-based football club, one of the oldest in the league.",
        logoUrl: "https://example.com/alahli.png",
        foundedDate: new Date("1937-04-17"),
      },
      {
        name: "Al Ittihad",
        description:
          "Jeddah-based football club, known for its fervent fanbase.",
        logoUrl: "https://example.com/alittihad.png",
        foundedDate: new Date("1927-01-04"),
      },
      {
        name: "Ettifaq FC",
        description: "Dammam-based football club with a rich history.",
        logoUrl: "https://example.com/ettifaq.png",
        foundedDate: new Date("1945-09-12"),
      },
    ],
  });

  // Seed Events
  const events = await prisma.event.createMany({
    data: [
      {
        name: "Riyadh Marathon 2024",
        description: "Annual marathon in the heart of Saudi capital.",
        startDate: new Date("2024-03-25T07:00:00Z"),
        endDate: new Date("2024-03-25T11:00:00Z"),
        location: "Riyadh",
        organizerId: 2,
      },
      {
        name: "Jeddah Triathlon 2024",
        description: "Triathlon event covering swimming, cycling, and running.",
        startDate: new Date("2024-04-10T06:00:00Z"),
        endDate: new Date("2024-04-10T12:00:00Z"),
        location: "Jeddah",
        organizerId: 4,
      },
      {
        name: "Dammam Cycling Race",
        description: "Competitive cycling event through the streets of Dammam.",
        startDate: new Date("2024-05-05T07:00:00Z"),
        endDate: new Date("2024-05-05T10:00:00Z"),
        location: "Dammam",
        organizerId: 4,
      },
      {
        name: "Soccer Tournament 2024",
        description: "Youth soccer tournament across multiple cities.",
        startDate: new Date("2024-06-01T08:00:00Z"),
        endDate: new Date("2024-06-03T20:00:00Z"),
        location: "Various",
        organizerId: 2,
      },
      {
        name: "National Sports Day",
        description:
          "A day celebrating various sports activities and healthy living.",
        startDate: new Date("2024-02-06T08:00:00Z"),
        endDate: new Date("2024-02-06T18:00:00Z"),
        location: "Nationwide",
        organizerId: 1,
      },
    ],
  });

  // Seed Posts
  const posts = await prisma.post.createMany({
    data: [
      {
        userId: 1,
        content:
          "Excited for the upcoming Riyadh Marathon! Who else is joining?",
      },
      {
        userId: 2,
        content: "Here are some tips to prepare for your first triathlon.",
      },
      {
        userId: 3,
        content:
          "Can’t wait to see everyone at the Dammam Cycling Race this weekend!",
      },
      {
        userId: 4,
        content:
          "Youth Soccer Tournament is coming. Let’s bring our best game!",
      },
      {
        userId: 5,
        content:
          "Happy National Sports Day! Let’s get active and enjoy the day!",
      },
    ],
  });

  // Seed Comments
  const comments = await prisma.comment.createMany({
    data: [
      {
        userId: 5,
        postId: 1,
        content: "I am in! Been training for months now.",
      },
      { userId: 1, postId: 2, content: "Thanks for the tips, very helpful!" },
      { userId: 2, postId: 3, content: "Good luck to all participants!" },
      {
        userId: 3,
        postId: 4,
        content: "Looking forward to it, see you there!",
      },
      {
        userId: 4,
        postId: 5,
        content: "A great way to bring communities together!",
      },
    ],
  });

  // Seed Media
  const media = await prisma.media.createMany({
    data: [
      {
        type: "image",
        url: "https://example.com/media/marathon.jpg",
        postId: 1,
      },
      {
        type: "video",
        url: "https://example.com/media/triathlon.mp4",
        postId: 2,
      },
      {
        type: "image",
        url: "https://example.com/media/cycling.jpg",
        postId: 3,
      },
      { type: "image", url: "https://example.com/media/soccer.jpg", postId: 4 },
      {
        type: "video",
        url: "https://example.com/media/sportsday.mp4",
        postId: 5,
      },
    ],
  });

  // Seed Tickets
  const tickets = await prisma.ticket.createMany({
    data: [
      { eventId: 1, price: 50.0, seatNumber: "101", isAvailable: true },
      { eventId: 2, price: 75.0, seatNumber: "201", isAvailable: true },
      { eventId: 3, price: 60.0, seatNumber: "301", isAvailable: true },
      { eventId: 4, price: 45.0, seatNumber: "401", isAvailable: true },
      { eventId: 5, price: 30.0, seatNumber: "501", isAvailable: true },
    ],
  });

  // Seed Reviews
  const reviews = await prisma.review.createMany({
    data: [
      {
        userId: 1,
        eventId: 1,
        rating: 5,
        comment: "Fantastic event, well organized and a lot of fun!",
      },
      {
        userId: 2,
        eventId: 2,
        rating: 4,
        comment:
          "Great experience, but the registration process could be smoother.",
      },
      {
        userId: 3,
        eventId: 3,
        rating: 5,
        comment: "Loved the route and the crowd support!",
      },
      {
        userId: 4,
        eventId: 4,
        rating: 4,
        comment: "Good tournament, but needs more food vendors.",
      },
      {
        userId: 5,
        eventId: 5,
        rating: 5,
        comment: "A wonderful day celebrating sports in our community!",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
