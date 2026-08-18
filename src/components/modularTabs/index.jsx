import PropTypes from 'prop-types';

function ModularTabs({ tabs, activeTab, onTabClick }) {
    return (
        <div className="flex flex-row gap-2 rounded-full border border-secondary bg-complementPrimary/70 p-1 shadow-sm">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabClick(tab.id)}
                    className={`rounded-full px-5 py-2 text-[14px] font-semibold
                        transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/40
                        ${activeTab === tab.id
                            ? 'bg-primary text-complementPrimary shadow-sm'
                            : 'text-quaternary hover:bg-complementSecondary hover:text-primary'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

ModularTabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    activeTab: PropTypes.string.isRequired,
    onTabClick: PropTypes.func.isRequired,
};

export default ModularTabs;
