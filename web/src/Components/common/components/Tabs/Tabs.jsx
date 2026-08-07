import "./Tabs.css";

//  Επαναχρησιμοποιήσιμο component πλοήγησης με tabs.

//  Εμφανίζει δυναμικά τις διαθέσιμες επιλογές.
//  Επισημαίνει το ενεργό tab
//  Ενημερώνει το parent component όταν ο χρήστης αλλάζει επιλογή.
const Tabs = ({
    tabs = [],
    activeTab,
    onChange
}) => {

    return (
        <section className="tabs-section">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.value;

                return (
                    <button
                        key={tab.value}
                        type="button"
                        role="tab"
                        className={`tab ${isActive ? "active" : ""}`}
                        aria-selected={isActive}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => onChange?.(tab.value)}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </section>
    );
};

export default Tabs;