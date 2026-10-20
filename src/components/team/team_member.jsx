import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import PropTypes from "prop-types";

const getInstagramUrl = (username) =>
  username.startsWith("http")
    ? username
    : `https://www.instagram.com/${username.replace(/^@/, "")}/`;

export function TeamMember({ name, role, imageUrl, isHighlighted, instagram, linkedin }) {
  const socialLink = linkedin || instagram;
  const socialLabel = linkedin ? "LinkedIn" : "Instagram";

  return (
    <div
      className={`relative group transition-transform duration-300 ease-out hover:-translate-y-2 ${
        isHighlighted ? "rounded-2xl ring-2 ring-black ring-offset-4" : ""
      }`}
    >
      <div className="overflow-hidden rounded-2xl bg-gray-100 transition-shadow duration-300 ease-out group-hover:shadow-2xl">
        <img
          src={imageUrl}
          alt={`${name}, ${role}`}
          className="w-full aspect-square object-cover object-center"
        />
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-max">
        <div className={`rounded-full px-6 py-3 shadow-lg transition-shadow duration-300 group-hover:shadow-xl ${
          isHighlighted
            ? "border-2 border-black bg-white"
            : "border-[1.2px] border-black bg-white"
        }`}>
          <h3 className="text-gray-900 font-medium text-center">{name}</h3>
          <p className="text-gray-600 text-sm text-center">{role}</p>
        </div>
      </div>
      {socialLink && (
        <a
          href={linkedin || getInstagramUrl(instagram)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name}'s ${socialLabel}`}
          className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white text-gray-900 shadow-lg transition-transform duration-200 hover:scale-110"
        >
          {linkedin ? <FaLinkedinIn size={19} /> : <FaInstagram size={20} />}
        </a>
      )}
    </div>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  isHighlighted: PropTypes.bool,
  instagram: PropTypes.string,
  linkedin: PropTypes.string,
};
