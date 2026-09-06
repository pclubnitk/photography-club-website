import { Outlet, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import EventsThumb from '../../components/events/eventsThumb';
import ModularTabs from '../../components/modularTabs';
import EventCategorySelector from './components/EventCategorySelector';
import { getEvents } from '../../services/eventsService';

const navItems = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'all', label: 'All' },
    { id: 'past', label: 'Past' },
];

const CATEGORY_META = {
    PClub: { label: 'PClub Events', emptyPrefix: 'PClub' },
    Others: { label: 'Others Events', emptyPrefix: 'Others' },
};

const TAB_LABEL = {
    upcoming: 'upcoming',
    all: '',
    past: 'past',
};

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

// Filter by Upcoming / All / Past status
const filterByTab = (events, activeTab) => {
    if (activeTab === 'all') return events;

    const now = new Date();
    return events.filter((event) => {
        const eventDate = getEventStartDate(event.dateTime);
        if (Number.isNaN(eventDate.getTime())) return activeTab === 'upcoming';
        return activeTab === 'upcoming' ? eventDate >= now : eventDate < now;
    });
};

// Scope to the selected category, then filter by tab
const filterEvents = (events, selectedCategory, activeTab) => {
    // Step 1: scope by category
    const byCategory = events.filter((event) =>
        selectedCategory === 'PClub'
            ? event.eventType === 'PClub'
            : event.eventType !== 'PClub'   // "Others" = every non-PClub type
    );

    // Step 2: apply Upcoming / All / Past on the scoped set
    return filterByTab(byCategory, activeTab);
};

function Events() {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [selectedCategory, setSelectedCategory] = useState(null);

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

export default Events;
