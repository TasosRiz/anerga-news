

import "./pages-layout.css";
import DashHeader from "../../../common/components/DashHeader/dash-header";

//  Επαναχρησιμοποιήσιμο layout για τις σελίδες του dashboard.

//  Περιλαμβάνει κοινό header, προαιρετική αναζήτηση,
//  notifications, actions και την κύρια περιοχή περιεχομένου.

const PagesLayout = ({
  title,
  children,
  showSearch = true,
  searchPlaceholder = "Search anything here...",
  searchValue = "",
  onSearchChange,
  showNotification = true,
  actions = null,
}) => {
  return (
    <div className="page-layout">
      {/*
       Κοινή επικεφαλίδα των dashboard σελίδων.
       Προσαρμόζεται μέσω των props ανάλογα με τις ανάγκες κάθε σελίδας. */}
      <DashHeader
        title={title}
        showSearch={showSearch}
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        showNotification={showNotification}
        actions={actions}
      />

      <div className="page-layout-content">{children}</div>
    </div>
  );
};

export default PagesLayout;