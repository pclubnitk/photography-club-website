import { Outlet, useParams } from 'react-router';
import { useState } from 'react';
import Dropdown from '../../components/filtersort/dropdown';
import EventsThumb from '../../components/events/eventsThumb';
import ModularTabs from '../../components/modularTabs';
import { useEffect } from 'react';
import axios from 'axios';

function Events() {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [eventsToShow, setEventsToShow] = useState([]);
    const [events, setEvents] = useState([]);

    const API="http://localhost:1337/api/events";

    const getEvents = async () =>{
        try{
            const res=await axios.get(API);

        console.log(res.data.data);
        const events=[...res.data.data].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        setEvents(events);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        getEvents();
        
    }, []);


    const handleTabClick =  (tabId) => {
         setActiveTab(tabId);

        if (tabId === "all") {
             setEventsToShow(events);
        } else if (tabId === "upcoming") {
            const upcomingEvents = events.filter(event => new Date(event.dateTime) >= new Date());
            const sortedUpcomingEvents = [...upcomingEvents].sort((a,b) => new Date(a.dateTime) - new Date(b.dateTime));
            setEventsToShow(sortedUpcomingEvents);
        } else if (tabId === "pclub") {
            const pastEvents = events.filter(event => event.isPClubEvent);
             setEventsToShow(pastEvents);
        }
        else if (tabId === "nitkevents") {
            const nitkEvents = events.filter(event => !event.isPClubEvent);
            setEventsToShow(nitkEvents);
        }
    }

    useEffect(() => {
        handleTabClick(activeTab);
    }, [events]);
   

    // Reset tab to "upcoming" whenever the user switches categories
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setActiveTab('upcoming');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setActiveTab('upcoming');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const eventsToShow = useMemo(
        () => selectedCategory ? filterEvents(events, selectedCategory, activeTab) : [],
        [events, selectedCategory, activeTab]
    );

    // Render event detail page when navigated to /events/:id
    if (id) {
        return <Outlet />;
    }

    const categoryMeta = selectedCategory ? CATEGORY_META[selectedCategory] : null;

    return (
        <div className="max-w-container mx-auto px-container-px md:px-container-px-md py-10 md:py-12">

            {/* ── CATEGORY LISTING VIEW ── */}
            {selectedCategory ? (
                <>
                    {/* Back button */}
                    <button
                        type="button"
                        onClick={handleBackToCategories}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border-0 bg-transparent
                            px-0 py-1 text-quaternary hover:text-primary group focus:outline-none focus:ring-0
                            transition-colors duration-150"
                    >
                        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        All Events
                    </button>

                    {/* Header */}
                    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-y-4 px-4 text-center sm:px-6 lg:px-8">
                        <span className="w-auto rounded-full border-[1.2px] border-black px-8 py-3 text-center text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                            {categoryMeta.label}
                        </span>
                        <span className="max-w-2xl text-sm leading-6 text-quaternary sm:text-base">
                            {selectedCategory === 'PClub'
                                ? "Photography Club's own curated events — workshops, shoots, and festivals."
                                : "External and collaborative events covered by the Photography Club."}
                        </span>
                        <div className="mt-3">
                            <ModularTabs tabs={navItems} activeTab={activeTab} onTabClick={setActiveTab} />
                        </div>
                    </div>

                    {/* Event grid */}
                    <div className="mt-9 md:mt-11">
                        {eventsToShow.length > 0 ? (
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
                                {eventsToShow.map((event) => (
                                    <EventsThumb
                                        key={event.id}
                                        event={getCardEvent(event)}
                                        thinVariant={false}
                                        variant="grid"
                                    />
                                ))}
                            </div>
                        ) : (
                            /* Empty state */
                            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                                <span className="text-5xl">📷</span>
                                <p className="font-playfair text-2xl font-medium text-primary">
                                    No {TAB_LABEL[activeTab] ? `${TAB_LABEL[activeTab]} ` : ''}{categoryMeta.emptyPrefix} events found.
                                </p>
                                <p className="max-w-sm text-sm text-quaternary">
                                    {activeTab === 'upcoming'
                                        ? 'Check back soon — events are being planned.'
                                        : activeTab === 'past'
                                        ? 'No past events in this category yet.'
                                        : 'No events in this category yet.'}
                                </p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                /* ── CATEGORY SELECTOR VIEW ── */
                <>
                    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-y-4 px-4 text-center sm:px-6 lg:px-8">
                        <span className="w-auto rounded-full border-[1.2px] border-black px-8 py-3 text-center text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                            Club Events
                        </span>
                        <span className="max-w-2xl text-sm leading-6 text-quaternary sm:text-base">
                            Discover the events and moments we&apos;ve planned for our photography community.
                        </span>
                    </div>

                    <EventCategorySelector onSelect={handleSelectCategory} />
                </>
            )}
        </div>
    );
}

/*const events = [
    {
        id: "incident-24",
        title: "Incident '24",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        location: "Main Building, NITK",
        dateTime: "2026-01-01 10:00 AM",
        image: "https://img.freepik.com/free-photo/3d-modern-background-with-hot-pink-flowing-lines_1048-12263.jpg",
        thumbnailColor: "#E195AB"
    },
    {
        id: "engineer-24",
        title: "Engineer '24",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        location: "Main Building, NITK",
        dateTime: "2027-01-01 10:00 AM",
        image: "https://placehold.co/200x260", //optional
        thumbnailColor: "#DE3163"
    },
    {
        id: "photography-24",
        title: "Photography '24",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        location: "Main Building, NITK",
        dateTime: "2024-01-01 10:00 AM",
        image: "https://placehold.co/200x260",
        thumbnailColor: "#FFB4A2"
    },
    {
        id: "event-4",
        title: "Event 4 - No Image",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        location: "Main Building, NITK",
        dateTime: "2024-01-01 10:00 AM",
        image: null,
        thumbnailColor: "#FFB4A2"
    }
]
*/
const navItems = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'all', label: 'All' },
    { id: 'pclub', label: 'PClub' },
    {id: 'nitkevents', label: 'NITK Events'},
]



export default Events
