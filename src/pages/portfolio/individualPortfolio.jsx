import { useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhotoGrid from "../../components/portfolio/PhotoGrid";
import UserCard from "../../components/portfolio/UserCard";
import { TabContext } from "../../context/TabContext";
import { navigateSmooth } from "../../utils/helperFunctions";
import { getProfilePosition } from "../../utils/candidateRoles";

const IndividualPortfolio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { candidates } = useContext(TabContext);

  const photographer =
    location.state?.photographer ||
    candidates.find((candidate) => candidate.id === id);

  const backToPrevious = () => {
    const scrollPositionY = sessionStorage.getItem("scrollPositionY");

    navigateSmooth(
      navigate,
      "/portfolio/",
      "",
      parseInt(scrollPositionY || 0),
    );

    if (scrollPositionY) {
      sessionStorage.removeItem("scrollPositionY");
    }
  };

  if (!photographer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Photographer Not Found
          </h1>

          <p className="text-gray-600 mb-8">
            The photographer you are looking for does not exist.
          </p>

          <button
            onClick={backToPrevious}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <button
          onClick={backToPrevious}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Team
        </button>

        <UserCard
          avatar={photographer.avatar}
          role={getProfilePosition(photographer)}
          name={photographer.name}
          bio={photographer.bio}
          mail={photographer.mail}
          instagram={photographer.instagram}
          linkedin={photographer.linkedin}
          core={photographer.core}
        />

        <PhotoGrid photographer={photographer} />
      </div>
    </div>
  );
};

export default IndividualPortfolio;
