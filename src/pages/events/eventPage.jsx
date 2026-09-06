import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { navigateSmooth } from "../../utils/helperFunctions";
import { getEventById, getGallery, getRelatedEvents } from "../../services/eventsService";
// CommentSection removed from page
import EventGallery from "./components/EventGallery";
import EventHero from "./components/EventHero";
import EventInfoCard from "./components/EventInfoCard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import RelatedEvents from "./components/RelatedEvents";
import ShareButtons from "./components/ShareButtons";

function EventPage() {
  const { id } = useParams();
  const eventId = id;
  const navigate = useNavigate();
  const location = useLocation();
  const detailsRef = useRef(null);
  const [pageData, setPageData] = useState({
    event: null,
    gallery: [],
    relatedEvents: [],
  });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const isFromHome = location.state?.from === "home";
  const path = isFromHome ? "/" : "/events";

  useEffect(() => {
    let isMounted = true;

    async function loadEventDetails() {
      setLoading(true);
      // TODO: GET Event Details API
      // TODO: GET Event Gallery API
      // TODO: GET Related Events API
      const [event, gallery, relatedEvents] = await Promise.all([
        getEventById(eventId),
        getGallery(eventId),
        getRelatedEvents(eventId),
      ]);

      if (isMounted) {
        setPageData({ event, gallery, relatedEvents });
        setLoading(false);
      }
    }

    loadEventDetails();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(timeout);
  }, [toast]);

  const backToPrevious = () => {
    const scrollPositionY = sessionStorage.getItem("scrollPositionY");
    navigateSmooth(navigate, path, "", parseInt(scrollPositionY || 0));
    if (scrollPositionY) sessionStorage.removeItem("scrollPositionY");
  };

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  const { event, gallery, relatedEvents } = pageData;

  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 py-8 sm:px-8 lg:px-12">
      <button
        onClick={backToPrevious}
        className="mb-8 inline-flex items-center rounded-full border-0 bg-transparent px-0 py-1 text-quaternary hover:text-primary group focus:outline-none focus:ring-0"
      >
        <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
        {isFromHome ? "Go Back" : "All Events"}
      </button>

      <EventHero event={event} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <section className="lg:col-span-2 w-full rounded-[20px] border border-secondary bg-complementPrimary p-5 sm:p-6 lg:p-7 font-sans">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-playfair text-3xl font-medium">About Event</h2>
            <button
              type="button"
              onClick={scrollToDetails}
              className="rounded-full border border-secondary px-4 py-2 text-sm font-medium text-primary transition hover:border-primary hover:bg-complementSecondary"
            >
              View event details
            </button>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
            <div>
              <p className="text-quaternary">{event.fullDescription}</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-lg font-bold">Objectives</h3>
                  <ul className="flex list-disc flex-col gap-2 pl-5 text-quaternary">
                    {event.objectives.map((objective) => (
                      <li key={objective}>{objective}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-bold">Event Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.highlights.map((highlight) => (
                      <span key={highlight} className="rounded-full bg-complementSecondary px-4 py-2 text-sm font-medium">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 grid grid-cols-1 gap-3">
                    <div className="rounded-[12px] bg-complementSecondary p-4">
                      <p className="text-2xl font-bold">{gallery.length}</p>
                      <p className="text-sm text-quaternary">Photos Uploaded</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div ref={detailsRef} className="flex flex-col gap-6 lg:pl-6">
              <div className="flex justify-end">
                <ShareButtons />
              </div>
              <EventInfoCard event={event} />
            </div>
          </div>
        </section>

        <section className="lg:col-span-2 w-full rounded-[24px] border border-secondary bg-complementPrimary/70 p-4 shadow-sm sm:p-6 lg:p-7">
          <EventGallery photos={gallery} />
          {/* UPLOAD SECTION TEMPORARILY DISABLED — uncomment to restore
          <div ref={uploadRef} className="mt-8 border-t border-secondary/80 pt-8">
            <UploadSection event={event} categories={categories} onSuccess={setToast} />
          </div>
          */}
        </section>

        <main className="flex flex-col gap-8 lg:col-span-2">
          <RelatedEvents events={relatedEvents} />
        </main>
      </div>

      {toast && (
        <div
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-complementPrimary shadow-lg"
          role="status"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

export default EventPage;
