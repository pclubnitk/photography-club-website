import PropTypes from "prop-types";
import { CalendarDays, Clock, MapPin, UserRound } from "lucide-react";
import noiseImage from "../../../assets/images/noise.png";

function EventHero({ event }) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-secondary bg-complementSecondary">
      <div className="relative min-h-[300px] sm:min-h-[340px] md:min-h-[420px]">
        <div style={{ backgroundColor: event.thumbnailColor }} className="absolute inset-0">
          <img
            src={noiseImage}
            alt=""
            className="absolute inset-0 h-full w-full contrast-200 opacity-50 md:opacity-70 mix-blend-overlay pointer-events-none"
          />
        </div>
        <img
          src={event.bannerImage}
          alt={`${event.title} event banner`}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-[1] flex min-h-[300px] sm:min-h-[340px] md:min-h-[420px] flex-col justify-end gap-5 p-5 sm:p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              {event.category}
            </span>
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              {event.eventType}
            </span>
          </div>
          <div>
            <h1 className="font-playfair text-3xl font-medium leading-tight text-white sm:text-4xl md:text-[44px]">
              {event.title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm font-medium text-white/90 sm:text-base md:text-lg">{event.shortDescription}</p>
          </div>
          <div className="grid grid-cols-1 gap-3 text-sm font-medium text-white sm:grid-cols-2 lg:grid-cols-4">
            <span className="flex items-center gap-2"><CalendarDays size={18} />{event.date}</span>
            <span className="flex items-center gap-2"><Clock size={18} />{event.time}</span>
            <span className="flex items-center gap-2"><MapPin size={18} />{event.venue}</span>
            <span className="flex items-center gap-2"><UserRound size={18} />{event.organizer}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

EventHero.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventHero;
