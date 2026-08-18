import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, ImagePlus, X } from "lucide-react";
import FilterBar from "./FilterBar";
import GalleryCard from "./GalleryCard";

function EventGallery({ photos, onUploadFirst }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const byFilter = photos.filter((photo) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Recent") return true;
      if (activeFilter === "Oldest") return true;
      if (activeFilter === "Popular") return true;
      return photo.category === activeFilter;
    });

    const bySearch = byFilter.filter((photo) =>
      [photo.caption, photo.photographer, photo.category].some((value) =>
        value.toLowerCase().includes(query)
      )
    );

    return [...bySearch].sort((a, b) => {
      if (activeFilter === "Popular" || sortBy === "liked") return b.likes - a.likes;
      if (activeFilter === "Oldest" || sortBy === "oldest") return new Date(a.uploadDate) - new Date(b.uploadDate);
      if (sortBy === "alphabetical") return a.caption.localeCompare(b.caption);
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    });
  }, [activeFilter, photos, searchQuery, sortBy]);

  const activePhoto = activeIndex !== null ? filteredPhotos[activeIndex] : null;

  useEffect(() => {
    if (!activePhoto) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % filteredPhotos.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + filteredPhotos.length) % filteredPhotos.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, filteredPhotos.length]);

  return (
    <section className="mx-auto w-full max-w-[1100px] rounded-[20px] border border-secondary/70 bg-complementPrimary/60 p-4 sm:p-6 overflow-x-hidden min-w-0">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-playfair text-3xl font-medium">Event Gallery</h2>
          <p className="text-sm text-quaternary">{filteredPhotos.length} photos shown</p>
        </div>
      </div>
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      {filteredPhotos.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
          {filteredPhotos.map((photo, index) => (
            <div key={photo.id} className="flex h-full">
              <GalleryCard photo={photo} onOpen={() => setActiveIndex(index)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center rounded-[16px] border border-dashed border-secondary bg-complementSecondary/70 p-8 text-center sm:p-10">
          <ImagePlus size={42} className="text-quaternary" />
          <p className="mt-4 text-xl font-bold">No photos uploaded yet.</p>
          <button
            type="button"
            onClick={onUploadFirst}
            className="mt-5 rounded-full bg-primary px-5 py-3 text-sm font-medium text-complementPrimary transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Upload First Photo
          </button>
        </div>
      )}

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white p-2 text-black focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close image preview"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex - 1 + filteredPhotos.length) % filteredPhotos.length)}
            className="absolute left-4 rounded-full bg-white p-2 text-black focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <figure className="max-w-5xl">
            <img src={activePhoto.src} alt={activePhoto.caption} className="max-h-[78vh] w-full rounded-[12px] object-contain" />
            <figcaption className="mt-4 rounded-[12px] bg-white p-4 text-black">
              <p className="font-bold">{activePhoto.caption}</p>
              <p className="text-sm text-gray-600">{activePhoto.photographer} | {activePhoto.uploadDate} | {activePhoto.category}</p>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex + 1) % filteredPhotos.length)}
            className="absolute right-4 rounded-full bg-white p-2 text-black focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}

EventGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  onUploadFirst: PropTypes.func.isRequired,
};

export default EventGallery;
