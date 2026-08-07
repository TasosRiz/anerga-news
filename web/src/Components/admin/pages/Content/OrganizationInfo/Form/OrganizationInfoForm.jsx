import './OrganizationInfoForm.css'


const MuniciapalityInfoForm = ({
    info,
    saving = false,
    onSubmit,
    handleChange
}) => {
    return (
        <form className="organization-info-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label className="label-text">Όνομα εφαρμογής</label>
                <input
                    type="text"
                    name="app_name"
                    value={info.app_name}
                    onChange={handleChange}
                    placeholder="ServiceKit"
                    required
                />
            </div>

            <div className="form-group">
                <label className="label-text">Οργανισμός</label>
                <input
                    type="text"
                    name="organization_name"
                    value={info.organization_name}
                    onChange={handleChange}
                    placeholder="Your Organization"
                    required
                />
            </div>

            <div className="form-group">
                <label className="label-text">Πόλη</label>
                <input
                    type="text"
                    name="city"
                    value={info.city}
                    onChange={handleChange}
                    placeholder="Your City"
                    required
                />
            </div>

            <div className="form-group">
                <label className="label-text">Email</label>
                <input
                    type="email"
                    name="email"
                    value={info.email}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label className="label-text">Τηλέφωνο</label>
                <input
                    type="text"
                    name="phone"
                    value={info.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label className="label-text">Διεύθυνση</label>
                <input
                    type="text"
                    name="address"
                    value={info.address}
                    onChange={handleChange}
                />
            </div>

            <div className="organization-info-actions">
                <button type="submit" className="btn-action btn-save" disabled={saving}>
                    {saving ? "Αποθήκευση..." : "Αποθήκευση"}
                </button>
            </div>
        </form>
    );
}

export default MuniciapalityInfoForm;
