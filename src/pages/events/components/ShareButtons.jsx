import PropTypes from "prop-types";
import { Copy, Facebook, Instagram, MessageCircle } from "lucide-react";

function ShareButtons({ onCopy }) {
  const buttons = [
    { label: "Copy Link", icon: Copy, onClick: onCopy },
    { label: "WhatsApp", icon: MessageCircle },
    { label: "Instagram", icon: Instagram },
    { label: "Facebook", icon: Facebook },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {buttons.map(({ label, icon: Icon, onClick }) => (
        <button
          key={label}
          type="button"
          onClick={onClick}
          className="inline-flex items-center gap-2 rounded-full border border-secondary px-3 py-2 text-sm font-medium transition hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={label}
        >
          <Icon size={16} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

ShareButtons.propTypes = {
  onCopy: PropTypes.func.isRequired,
};

export default ShareButtons;
