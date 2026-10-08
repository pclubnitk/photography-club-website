import { useNavigate } from "react-router-dom";
import { FiCamera, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { navigateSmooth } from "../../utils/helperFunctions";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigateSmooth(navigate, path);
  };

  const quickLinks = [
    { name: "Events", path: "/events" },
    { name: "Members", path: "/portfolio" },
    { name: "Blogs", path: "/blogs" },
    { name: "Photo Reel", path: "/photo-reels" },
  ];

  const resourceLinks = [
    { name: "Photography Tips", path: "/" },
    { name: "Equipment Guide", path: "/" },
    { name: "Join the Club", path: "/" },
    { name: "Contact Us", path: "/" },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-4 md:items-start">
          <div className="col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                <FiCamera size={21} />
              </span>
              <span className="font-playfair text-xl leading-tight">
                Photography Club NITK
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600">
              Capturing moments, creating memories, and fostering a community of
              passionate photographers.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">Quick Links</h3>
            <div className="flex flex-col items-start gap-3 text-sm text-gray-600">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.path)}
                  className="text-left transition-colors hover:text-primary focus:outline-none focus:text-primary"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">Resources</h3>
            <div className="flex flex-col items-start gap-3 text-sm text-gray-600">
              {resourceLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.path)}
                  className="text-left transition-colors hover:text-primary focus:outline-none focus:text-primary"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="YouTube"
              >
                <FiYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Photography Club NITK. All rights reserved.
          </p>
          <p className="text-center text-sm text-gray-600">
            Made by{" "}
            <a
              className="font-medium text-primary underline-offset-4 hover:underline"
              href="https://webclub.nitk.ac.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Enthusiasts&apos; Club NITK
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
