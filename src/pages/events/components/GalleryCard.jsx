import PropTypes from "prop-types";

function GalleryCard({ photo, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[12px] border border-secondary bg-complementPrimary text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={`Preview ${photo.caption} by ${photo.photographer}`}
    >
      <div className="relative h-[300px] w-full flex-none overflow-hidden rounded-t-[12px] bg-black/5 sm:h-[320px] xl:h-[340px]">
        <img
          src={photo.src}
          alt={photo.caption}
          className="block h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
          {photo.category}
        </span>
      </div>
      <div className="flex h-full flex-col justify-between p-4">
        <p className="font-medium">{photo.caption}</p>
        <div className="mt-3 flex items-center justify-between gap-3 text-sm text-quaternary">
          <span>{photo.photographer}</span>
          <span>{photo.uploadDate}</span>
        </div>
      </div>
    </button>
  );
}

GalleryCard.propTypes = {
  photo: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default GalleryCard;
