import { Outlet, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import EventsThumb from '../../components/events/eventsThumb';
import ModularTabs from '../../components/modularTabs';
import { getEvents } from '../../services/eventsService';

const navItems = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'all', label: 'All' },
    { id: 'past', label: 'Past' },
];

const getEventStartDate = (dateTime) => {
    const startDate = dateTime?.split('/')[0];
    return new Date(startDate);
};

const getCardEvent = (event) => ({
    id: event.id,
    title: event.title,
    description: event.shortDescription || event.fullDescription || '',
    location: event.location || event.venue,
    dateTime: event.dateTime,
    image: event.image || event.bannerImage,
    thumbnailColor: event.thumbnailColor,
});

const filterEvents = (events, activeTab) => {
    if (activeTab === 'all') return events;

    const now = new Date();
    return events.filter((event) => {
        const eventDate = getEventStartDate(event.dateTime);
        if (Number.isNaN(eventDate.getTime())) return activeTab === 'upcoming';
        return activeTab === 'upcoming' ? eventDate >= now : eventDate < now;
    });
};

function Events() {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');

    useEffect(() => {
        let isMounted = true;

        async function loadEvents() {
            const eventList = await getEvents();
            if (isMounted) setEvents(eventList);
        }

        loadEvents();

        return () => {
            isMounted = false;
        };
    }, []);

    const eventsToShow = useMemo(
        () => filterEvents(events, activeTab),
        [events, activeTab]
    );

    if (id) {
        return <Outlet />
    }

    return (
        <div className="max-w-container mx-auto px-container-px md:px-container-px-md py-10 md:py-12">
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-y-4 px-4 text-center sm:px-6 lg:px-8">
                <span className="w-auto rounded-full border-[1.2px] border-black px-8 py-3 text-center text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                    Club Events
                </span>
                <span className="max-w-2xl text-sm leading-6 text-quaternary sm:text-base">
                    Discover the events and moments we&apos;ve planned for our photography community.
                </span>
                <div className="mt-3">
                    <ModularTabs tabs={navItems} activeTab={activeTab} onTabClick={setActiveTab} />
                </div>
            </div>

            <div className="mt-9 md:mt-11">
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
            </div>
        </div>
    )
}

export default Events
