import PropTypes from "prop-types";

function GalleryCard({ photo, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group mb-4 w-full break-inside-avoid overflow-hidden rounded-[12px] border border-secondary bg-complementPrimary text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={`Preview ${photo.caption} by ${photo.photographer}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={photo.src}
          alt={photo.caption}
          className={`w-full object-cover transition duration-300 group-hover:scale-105 ${photo.heightClass}`}
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
          {photo.category}
        </span>
      </div>
      <div className="p-4">
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
