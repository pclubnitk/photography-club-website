const mockEvents = [
  {
    id: "incident-24",
    title: "Incident '25",
    category: "Campus",
    date: "4th Mar 2025",
    dateTime: "2025-03-04T10:00:00/2025-03-08T11:00:00",
    time: "10:00 AM - 11:00 AM",
    venue: "Main Building, NITK",
    organizer: "Photography Club NITK",
    eventType: "PClub",
    registrationStatus: "Open",
    contactPerson: "TODO: Contact coordinator",
    bannerImage: "/photo-1.jpg",
    thumbnailColor: "#E195AB",
    shortDescription: "A campus-wide visual storytelling event for documenting the energy of Incident.",
    fullDescription:
      "Incident brings together music, culture, workshops, competitions, and the unmistakable campus rush. This event page gathers the Photography Club coverage, participant uploads, and selected visual stories from across the festival.",
    objectives: [
      "Document major moments from Incident with strong visual narratives.",
      "Invite student photographers to submit curated festival coverage.",
      "Build an accessible archive for club members and the campus community.",
    ],
    highlights: [
      "Live event coverage",
      "Student photo submissions",
      "Editorial selections",
      "Festival documentation",
    ],
    participants: "120+",
    photosUploaded: 36,
  },
  {
    id: "incident-26",
    title: "Incident '26",
    category: "Campus",
    date: "8th Mar 2026",
    dateTime: "2026-03-08T10:00:00/2026-03-12T11:00:00",
    time: "10:00 AM - 11:00 AM",
    venue: "Central Lawn, NITK",
    organizer: "Photography Club NITK",
    eventType: "PClub",
    registrationStatus: "Open",
    contactPerson: "Event Coordinator (TBD)",
    bannerImage: "/photo-2.jpg",
    thumbnailColor: "#2D72D9",
    shortDescription: "The next chapter of incident coverage, featuring student stories and festival photography.",
    fullDescription:
      "Incident '26 brings the club's photographic perspective to campus culture, performances, and behind-the-scenes moments. This page is dedicated to club coverage and the best submissions from the festival.",
    objectives: [
      "Capture compelling campus moments during Incident 2026.",
      "Encourage club members to submit vivid photo stories.",
      "Create a memorable collection of festival visuals.",
    ],
    highlights: [
      "Campus culture",
      "Student photographers",
      "Performance photography",
      "Visual storytelling",
    ],
    participants: "150+",
    photosUploaded: 48,
  },
  {
    id: "engineer-24",
    title: "Engineer '24",
    category: "Workshop",
    date: "1st Jan 2027",
    dateTime: "2027-01-01T10:00:00",
    time: "10:00 AM",
    venue: "Main Building, NITK",
    organizer: "Photography Club NITK",
    eventType: "External",
    registrationStatus: "Coming Soon",
    contactPerson: "TODO: Contact coordinator",
    bannerImage: "/photo-2.jpg",
    thumbnailColor: "#DE3163",
    shortDescription: "Technical fest coverage with documentary and editorial photography assignments.",
    fullDescription:
      "A mock related event entry prepared for future Strapi-backed navigation.",
    objectives: ["Document technical showcases", "Create editorial coverage"],
    highlights: ["Workshops", "Exhibitions"],
    participants: "80+",
    photosUploaded: 22,
  },
  {
    id: "photography-24",
    title: "Photography '24",
    category: "Competition",
    date: "1st Jan 2024",
    dateTime: "2024-01-01T10:00:00",
    time: "10:00 AM",
    venue: "Main Building, NITK",
    organizer: "Photography Club NITK",
    eventType: "PClub",
    registrationStatus: "Closed",
    contactPerson: "TODO: Contact coordinator",
    bannerImage: "/photo-3.jpg",
    thumbnailColor: "#FFB4A2",
    shortDescription: "A themed photography challenge for club members and campus photographers.",
    fullDescription:
      "A mock related event entry prepared for future Strapi-backed navigation.",
    objectives: ["Encourage theme-based shooting", "Celebrate student work"],
    highlights: ["Competition", "Gallery review"],
    participants: "60+",
    photosUploaded: 18,
  },
];

const mockGallery = [
  {
    id: "g-1",
    src: "/photo-1.jpg",
    caption: "Main stage lights cutting through the festival crowd",
    photographer: "Aarav Menon",
    uploadDate: "5 Mar 2025",
    category: "PClub Photos",
    likes: 42,
    heightClass: "h-72",
  },
  {
    id: "g-2",
    src: "/photo-2.jpg",
    caption: "Quiet portrait near the old lecture hall",
    photographer: "Nisha Rao",
    uploadDate: "5 Mar 2025",
    category: "Portrait",
    likes: 35,
    heightClass: "h-56",
  },
  {
    id: "g-3",
    src: "/photo-3.jpg",
    caption: "Campus walkway after the evening rain",
    photographer: "Dev Shah",
    uploadDate: "6 Mar 2025",
    category: "Campus",
    likes: 51,
    heightClass: "h-80",
  },
  {
    id: "g-4",
    src: "/photo-1.jpg",
    caption: "Workshop hands-on session with vintage lenses",
    photographer: "Mira Iyer",
    uploadDate: "6 Mar 2025",
    category: "Workshop",
    likes: 28,
    heightClass: "h-60",
  },
  {
    id: "g-5",
    src: "/photo-2.jpg",
    caption: "Street-style frame outside the food court",
    photographer: "Kabir Joseph",
    uploadDate: "7 Mar 2025",
    category: "Street",
    likes: 47,
    heightClass: "h-72",
  },
  {
    id: "g-6",
    src: "/photo-3.jpg",
    caption: "Nature trail behind the guest house",
    photographer: "Ananya Prabhu",
    uploadDate: "7 Mar 2025",
    category: "Nature",
    likes: 39,
    heightClass: "h-64",
  },
  {
    id: "g-7",
    src: "/photo-1.jpg",
    caption: "Competition finalist frame from the night showcase",
    photographer: "Rohan Pai",
    uploadDate: "8 Mar 2025",
    category: "Competition",
    likes: 66,
    heightClass: "h-56",
  },
];

const mockComments = [
  { id: "c-1", name: "Priya S", text: "Loved the stage coverage. The colors feel exactly like Incident week." },
  { id: "c-2", name: "Rahul K", text: "The campus rain photo is such a clean frame." },
  { id: "c-3", name: "Meera J", text: "Waiting for more backstage portraits from day two." },
];

const mockStatistics = {
  photosUploaded: 36,
  photographers: 14,
  views: "2.4k",
  downloads: 128,
  likes: 308,
};

export async function getEvents() {
  // TODO: GET Events API
  // TODO: Replace with Strapi REST endpoint: GET /api/events?populate=*
  return mockEvents;
}

export async function getEventById(eventId) {
  // TODO: GET Event Details API
  // TODO: Replace with Strapi REST endpoint: GET /api/events/:id?populate=*
  return mockEvents.find((event) => event.id === eventId) || mockEvents[0];
}

export async function getGallery(eventId) {
  void eventId;
  // TODO: GET Event Gallery API
  // TODO: Fetch gallery images from backend
  // TODO: Fetch photographer details
  // TODO: Privacy settings API
  // TODO: Replace with Strapi REST endpoint: GET /api/event-photos?filters[event][id][$eq]=${eventId}&populate=*
  return mockGallery;
}

export async function uploadPhoto() {
  // TODO: POST Upload Image API
  // TODO: POST upload API
  // TODO: Replace with Strapi REST endpoint: POST /api/event-photos
  return { success: true };
}

export async function getCategories() {
  // TODO: GET Categories API
  // TODO: Replace with Strapi REST endpoint: GET /api/photo-categories
  return ["PClub Photos", "Competition", "Workshop", "Nature", "Portrait", "Street", "Campus"];
}

export async function getRelatedEvents(eventId) {
  // TODO: GET Related Events API
  // TODO: Replace with Strapi REST endpoint: GET /api/events?filters[id][$ne]=${eventId}&populate=*
  return mockEvents.filter((event) => event.id !== eventId).slice(0, 3);
}

export async function getComments() {
  // TODO: GET Comments API
  // TODO: Replace with Strapi REST endpoint: GET /api/comments?filters[event][id][$eq]=:eventId
  return mockComments;
}

export async function getStatistics() {
  // TODO: GET Statistics API
  // TODO: Replace with Strapi REST endpoint: GET /api/events/:id/statistics
  return mockStatistics;
}
