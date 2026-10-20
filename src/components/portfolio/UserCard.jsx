import React from "react";
import { Camera, Mail, Instagram } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

const UserCard = ({
  avatar,
  name,
  role,
  bio,
  mail,
  instagram,
  linkedin,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
      <div className="md:flex">

        {/* Left: Photographer Photo */}
        <div className="md:w-1/3 relative">
          <img
            src={avatar || "/placeholder-avatar.png"}
            alt={name || "Photographer"}
            className="w-full h-full object-cover min-h-[400px]"
          />
        </div>

        {/* Right: Photographer Details */}
        <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Camera className="h-8 w-8 text-gray-700" />

              <h1 className="text-4xl font-bold text-gray-900">
                {name || "Unknown Photographer"}
              </h1>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {role || "Photographer"}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                {bio || "No bio available for this photographer."}
              </p>

              <div className="space-y-3">

                {/* Email */}
                {mail && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="h-5 w-5" />
                    <span>{mail}</span>
                  </div>
                )}

                {/* Instagram */}
                {instagram && (
                  <a
                    href={`https://www.instagram.com/${instagram.replace(
                      /^@/,
                      ""
                    )}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span>
                      @{instagram.replace(/^@/, "")}
                    </span>
                  </a>
                )}

                {/* LinkedIn */}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-blue-700 transition-colors"
                  >
                    <FaLinkedin className="h-5 w-5" />

                    <span>
                      {name || "LinkedIn"}
                    </span>
                  </a>
                )}

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserCard;
