import { useState } from "react";
import PropTypes from "prop-types";
import coverImage from "./cover1.jpeg";

function StatCard({ label, value, highlight }) {
  return (
    <div>
      <div
        className={`font-playfair text-3xl md:text-4xl font-semibold ${
          highlight ? "text-red-500" : "text-primary"
        }`}
      >
        {value}
      </div>

      <div className="mt-2 text-sm uppercase tracking-widest text-tertiary">
        {label}
      </div>
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  highlight: PropTypes.bool,
};

StatCard.defaultProps = {
  highlight: false,
};

const clubStats = [
  { label: "Years", value: "20+", highlight: true },
  { label: "Members", value: "70+", highlight: true },
  { label: "Achievements", value: "12+", highlight: true },
  { label: "Events", value: "100+", highlight: true },
];

const achievements = [
  {
    title: "Expose – National Photography Contest",
    description:
      "Successfully organizes Expose, the national-level photography competition held during Incident, attracting photographers from across India.",
  },
  {
    title: "Official Event Coverage",
    description:
      "Documents major institute events, cultural festivals, technical fests, sports meets, and ceremonies throughout the academic year.",
  },
  {
    title: "Institute Publications",
    description:
      "Contributes photographs for official institute publications, magazines, brochures, and promotional material.",
  },
  {
    title: "Photography Workshops",
    description:
      "Conducts beginner and advanced workshops covering composition, lighting, editing, and storytelling.",
  },
  {
    title: "Campus Photowalks",
    description:
      "Organizes regular photowalks encouraging students to explore creativity and improve their photography skills.",
  },
  {
    title: "Creative Exhibitions",
    description:
      "Hosts exhibitions showcasing the best work of club members during festivals and campus events.",
  },
  {
    title: "Inter-College Collaborations",
    description:
      "Collaborates with photography clubs across institutions through competitions, exhibitions, and creative projects.",
  },
  {
    title: "Visual Archive of NITK",
    description:
      "Maintains a rich archive documenting the history, culture, and milestones of NITK Surathkal.",
  },
  {
    title: "Mentorship Program",
    description:
      "Experienced photographers mentor newcomers through portfolio reviews, editing sessions, and practical guidance.",
  },
  {
    title: "Award-Winning Entries",
    description:
      "Club members have earned recognition in numerous photography competitions at college and national levels.",
  },
  {
    title: "Digital Presence",
    description:
      "Creates engaging visual content for social media, reaching thousands of photography enthusiasts.",
  },
  {
    title: "Creative Community",
    description:
      "Provides an inclusive platform where students collaborate, innovate, and grow through visual storytelling.",
  },
];

function AboutUsPage() {
  const [showAll, setShowAll] = useState(false);

  const displayedAchievements = showAll
    ? achievements
    : achievements.slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[350px] md:min-h-[450px] flex items-center justify-center overflow-hidden text-center"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 w-full max-w-5xl px-6 sm:px-8 md:px-12">
          <p className="text-white uppercase text-sm font-semibold tracking-[0.25em]">
            About Us
          </p>

          <h1 className="font-playfair text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mt-5">
            The magic of moments,
            <br />
            preserved in pixels.
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-base sm:text-lg md:text-xl text-white/90 font-light leading-8">
            Photography Club NITK is a creative community dedicated to
            capturing stories, preserving memories, and inspiring
            photographers across the campus.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Who Are We */}
        <section className="mt-10 md:mt-14">
          <p className="text-tertiary uppercase text-sm font-semibold tracking-[0.2em]">
            Who Are We
          </p>

          <h2 className="font-playfair font-semibold text-primary text-3xl md:text-4xl lg:text-5xl leading-tight mt-4">
            A community built around the lens.
          </h2>

          <div className="max-w-5xl mt-8 text-base sm:text-lg leading-7 sm:leading-8 md:leading-9 text-primary font-light">
            <p>
              Established in{" "}
              <span className="font-medium text-red-500">2004</span>, the
              Photography Club of{" "}
              <span className="font-medium text-red-500">
                NITK Surathkal
              </span>{" "}
              is a student-run community dedicated to fostering creativity
              through photography and visual storytelling. Over the years, the
              club has grown into one of the institute&apos;s most active
              creative communities, bringing together students who share a
              passion for capturing moments, preserving memories, and
              documenting the vibrant life of the campus.
            </p>

            <p className="mt-8">
              Our objective is to encourage students of all skill levels to
              explore photography through workshops, photowalks, competitions,
              exhibitions, and collaborative projects. We actively document
              cultural festivals, technical events, sports meets, institute
              ceremonies, and everyday campus life, creating a{" "}
              <span className="font-medium text-red-500">
                lasting visual archive
              </span>{" "}
              for future generations of NITKians.
            </p>

            <p className="mt-8">
              Guided by our{" "}
              <span className="font-medium text-red-500">
                vision of inspiring creativity and excellence
              </span>
              , we strive to provide a dynamic platform where photographers
              can learn, experiment, and showcase their unique perspectives.
              Through photography, we aim to capture and celebrate the spirit,
              diversity, energy, and unforgettable moments that define life at
              NITK, preserving memories that continue to inspire and connect
              our community for years to come.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-10 md:mt-14">
          <p className="text-tertiary uppercase text-sm font-semibold tracking-[0.2em]">
            Statistics
          </p>

          <h2 className="font-playfair font-semibold text-primary text-2xl md:text-3xl lg:text-4xl leading-tight mt-4">
            Club Statistics
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
            {clubStats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                highlight={stat.highlight}
              />
            ))}
          </div>
        </section>
<br></br>
<br></br>
        {/* Achievements */}
        {/* <section className="mt-10 md:mt-14 pb-20 md:pb-28">
          <p className="text-tertiary uppercase text-sm font-semibold tracking-[0.2em]">
            Achievements
          </p>

          <h2 className="font-playfair font-semibold text-primary text-2xl md:text-3xl lg:text-4xl leading-tight mt-4">
            What We Have Achieved
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 mt-10">
            {displayedAchievements.map((achievement) => (
              <div
                key={achievement.title}
                className="rounded-2xl border border-secondary/20 p-6 md:p-7 hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg md:text-xl font-semibold text-primary leading-snug">
                  {achievement.title}
                </h3>

                <p className="mt-4 text-primary font-light leading-7">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-10 mx-auto block rounded-full border border-primary px-6 py-3 text-primary hover:bg-primary hover:text-white transition"
          >
            {showAll ? "Show Less" : "View All Achievements"}
          </button>
        </section> */}
      </div>
    </main>
  );
}

export default AboutUsPage;