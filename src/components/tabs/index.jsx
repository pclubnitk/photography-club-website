import { useContext, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TabContext } from "../../context/TabContext";

export default function Tabs() {
  const { navItems, activeItem, setActiveItem } = useContext(TabContext);
  const tabsRef = useRef(null);

  const scrollTabs = (direction) => {
    tabsRef.current?.scrollBy({
      left: direction * 180,
      behavior: "smooth",
    });
  };

  return (
    <nav className="flex w-full items-center px-2 sm:justify-center sm:px-4 lg:px-8">
      <button
        type="button"
        aria-label="Show previous member categories"
        onClick={() => scrollTabs(-1)}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:bg-gray-100 sm:hidden"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={tabsRef}
        className="mx-2 flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-none sm:flex-wrap sm:justify-center sm:overflow-visible"
      >
        {navItems.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActiveItem(item.name)}
            className={`shrink-0 cursor-pointer rounded-full border-[1.2px] px-4 py-2 text-sm font-bold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 sm:text-md lg:text-lg ${
              activeItem === item.name
                ? "border-black bg-gray-50 text-black shadow-sm"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Show next member categories"
        onClick={() => scrollTabs(1)}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:bg-gray-100 sm:hidden"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
}
