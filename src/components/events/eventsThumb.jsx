import PropTypes from 'prop-types';
import { GrLocation } from "react-icons/gr";
import { MdEvent } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { navigateSmooth } from '../../utils/helperFunctions';

function EventsThumb({ event, isOnHomePage = false, thinVariant = false, variant = "scroll" }) {
    const navigate = useNavigate();

    const handleEventClick = () => {
        const fromPage = isOnHomePage ? 'home' : 'events';
        navigateSmooth(navigate, `/events/${event.EventId}`, fromPage);
    };
    let thumbnailColor = '#b92c2c';
    let imageUrl =null; // Use the event image if available, otherwise use the noise image
    if(event.EventId.startsWith("Inci")){
        thumbnailColor = "#E195AB";
        imageUrl="https://img.freepik.com/free-photo/3d-modern-background-with-hot-pink-flowing-lines_1048-12263.jpg";
    }
    else if(event.EventId.startsWith("PClub")){
        thumbnailColor = "#FFB4A2";
        imageUrl="https://placehold.co/200x260";
    }
    else if(event.EventId.startsWith("Engi")){
        thumbnailColor = "#DE3163";
        imageUrl="https://placehold.co/200x260";
    }
    
    

    const formatDateTime = (dateTimeStr) => {
        if (!dateTimeStr) return "Date to be announced";
        
        try {
            const dateString = dateTimeStr.split('/')[0];
            const date = new Date(dateString);
            
            if (isNaN(date.getTime())) {
                return "Date to be announced";
            }
            
            const day = date.getDate();
            const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 ? 0 : day % 10)];
            const month = date.toLocaleString('en-US', { month: 'short' });
            const year = date.getFullYear();
            const hours = date.getHours();
            const ampm = hours >= 12 ? 'pm' : 'am';
            const displayHours = hours % 12 || 12;

            return `${day}${suffix} ${month} ${year} | ${displayHours}${ampm}`;
        } catch {
            return "Date to be announced";
        }
    };

    return (
        <div
            onClick={handleEventClick}
            className={`group relative overflow-hidden rounded-[16px]
                border border-gray-200 shadow-md
                transition-all duration-300 ease-out
                hover:cursor-pointer hover:shadow-lg
                hover:-translate-y-2
                ${variant === "scroll"
                    ? "min-w-[250px] md:min-w-[460px] lg:min-w-[490px] lg:max-w-[80%]"
                    : "w-full"
                }
                h-auto flex flex-col`}
        >
            {/* Event Image - Large and Prominent */}
            <div className="relative w-full overflow-hidden bg-gray-100" style={{ height: '300px' }}>
                {event.image ? (
                    <img 
                        src={event.image} 
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
                )}
            </div>

            {/* Content container */}
            <div className="relative w-full h-full text-white text-[14px] font-medium flex flex-row">
                <div className="absolute inset-0 p-3 flex flex-col justify-between h-full z-10 md:relative">
                    {/* Title at the top */}
                    <div>
                        <p className="font-playfair text-[24px] md:text-[32px] font-medium leading-[1]">
                            {event.EventName}
                        </p>
                    </div>

                {/* Description */}
                <p className="line-clamp-2 text-sm md:text-base leading-6 text-quaternary">
                    {event.description}
                </p>

                {/* Event Details - Location and Date */}
                <div className="flex flex-col gap-2 text-xs md:text-sm font-medium text-quaternary pt-2">
                    <p className="flex items-center gap-2">
                        <GrLocation className="shrink-0 text-base text-primary" />
                        <span>{event.location}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <MdEvent className="shrink-0 text-base text-primary" />
                        <span>{formatDateTime(event.dateTime)}</span>
                    </p>
                </div>

                {/* Event Image (if available) */}
                {imageUrl && (
                    <div className={`relative object-cover object-center h-full
                        ${variant === "scroll" ? "md:w-[200px]" : "md:w-[280px]"}
                        w-full`}
                    >
                        <img src={imageUrl} alt={event.EventName}
                            className="absolute inset-0 w-full h-full object-cover rounded-[0_8px_8px_0]"
                        />
                        {/* Overlay To Tint Image */}
                        <div
                            style={{ background: `linear-gradient(to right, ${thumbnailColor}, transparent)` }}
                            className="absolute inset-0 w-full h-full opacity-80 rounded-[0_8px_8px_0]"
                        />
                        <div
                            style={{ background: `${thumbnailColor}` }}
                            className="absolute inset-0 w-full opacity-55 md:opacity-25 h-full rounded-[0_8px_8px_0]"
                        />
                        <div
                            className="absolute inset-0 bg-black opacity-30 md:hidden h-full w-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

EventsThumb.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        publishedAt: PropTypes.string,
        EventId: PropTypes.string.isRequired,
        EventName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        dateTime: PropTypes.string.isRequired,
        isPClubEvent: PropTypes.bool.isRequired,
    }).isRequired,
    isOnHomePage: PropTypes.bool,
    thinVariant: PropTypes.bool,
    variant: PropTypes.oneOf(['scroll', 'grid']),
};

export default EventsThumb;
