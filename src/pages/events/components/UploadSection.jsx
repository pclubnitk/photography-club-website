import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ImageUp, Trash2 } from "lucide-react";
import { uploadPhoto } from "../../../services/eventsService";

function UploadSection({ event, categories, onSuccess }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const CATEGORY_OPTIONS = [
    "All",
    "PClub Photos",
    "Campus",
    "Events",
    "Nature",
    "Portrait",
    "Others",
  ];

  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);

  const previews = useMemo(
    () => selectedFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [selectedFiles]
  );

  useEffect(() => {
    return () => previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }, [previews]);

  const addFiles = (files) => {
    setSelectedFiles((current) => [...current, ...Array.from(files)]);
  };

  const handleSubmit = async (eventSubmit) => {
    eventSubmit.preventDefault();
    // TODO: POST Upload Image API
    await uploadPhoto();
    setSelectedFiles([]);
    setCaption("");
    onSuccess("Photo upload saved as a mock success.");
  };

  return (
    <section className="rounded-[20px] border border-secondary/70 bg-complementSecondary/60 p-4 sm:p-6" id="upload-photos">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-playfair text-3xl font-medium">Upload Photos</h2>
          <p className="text-sm text-quaternary">PNG, JPG, JPEG supported. Maximum file size: TODO placeholder.</p>
        </div>
        <span className="rounded-full bg-complementSecondary px-4 py-2 text-sm font-medium">
          {selectedFiles.length} selected
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-start">
        <label
          className="flex min-h-[240px] sm:min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-secondary bg-complementPrimary/80 p-8 text-center transition hover:border-primary hover:bg-complementPrimary focus-within:ring-2 focus-within:ring-primary"
          onDragOver={(eventDrag) => eventDrag.preventDefault()}
          onDrop={(eventDrop) => {
            eventDrop.preventDefault();
            addFiles(eventDrop.dataTransfer.files);
          }}
        >
          <ImageUp size={44} className="text-quaternary" />
          <span className="mt-4 text-lg font-bold">Drag and drop photos here</span>
          <span className="mt-2 text-sm text-quaternary">or choose multiple images from your device</span>
          <span className="mt-5 rounded-full bg-primary px-5 py-3 text-sm font-medium text-complementPrimary">
            Post
          </span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            multiple
            className="sr-only"
            onChange={(eventChange) => addFiles(eventChange.target.files)}
            aria-label="Select event photos"
          />
        </label>

        <div className="flex flex-col gap-4 rounded-[16px] border border-secondary/70 bg-complementPrimary/70 p-4 sm:p-5">
          <label className="text-sm font-bold">
            Caption
            <textarea
              value={caption}
              onChange={(eventChange) => setCaption(eventChange.target.value)}
              className="mt-2 min-h-24 w-full rounded-[12px] border border-secondary bg-complementPrimary p-3 font-normal focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Add a short caption"
            />
          </label>
          <label className="text-sm font-bold">
            Category
            <select
              value={category}
              onChange={(eventChange) => setCategory(eventChange.target.value)}
              className="mt-2 w-full rounded-full border border-secondary bg-complementPrimary px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-bold">
            Event
            <input
              value={event.title}
              readOnly
              className="mt-2 w-full rounded-full border border-secondary bg-complementSecondary px-4 py-3 font-normal"
            />
          </label>
          <button
            type="submit"
            disabled={selectedFiles.length === 0}
            className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-complementPrimary transition disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Post
          </button>
        </div>
      </form>

      {previews.length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {previews.map((preview, index) => (
            <div key={`${preview.file.name}-${index}`} className="relative overflow-hidden rounded-[12px] border border-secondary">
              <img src={preview.url} alt={`Selected preview ${index + 1}`} className="h-36 w-full object-cover" />
              <button
                type="button"
                onClick={() => setSelectedFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))}
                className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={`Remove ${preview.file.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

UploadSection.propTypes = {
  event: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default UploadSection;
