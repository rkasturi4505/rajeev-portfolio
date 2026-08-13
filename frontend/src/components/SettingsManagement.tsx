import { useEffect, useState } from "react";

import { getSettings, updateSettings, type Settings } from "../api/settingsApi";

import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

import "./SettingsManagement.css";

const emptySettings: Settings = {
  adminName: "",
  adminEmail: "",
  role: "",
  applicationName: "",
  backendTechnology: "",
  frontendTechnology: "",
};

function SettingsManagement() {
  const [settings, setSettings] = useState<Settings>(emptySettings);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);

  const [message, setMessage] = useState("");

  /*
  ==========================================================
      LOAD SETTINGS
  ==========================================================
  */

  const loadSettings = async () => {
    try {
      setLoading(true);

      const response = await getSettings();

      setSettings(response.data);
    } catch (error) {
      console.error("Failed to load settings:", error);

      setMessage("Unable to load settings.");

      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  /*
  ==========================================================
      HANDLE CHANGE
  ==========================================================
  */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSettings((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
  ==========================================================
      SAVE SETTINGS
  ==========================================================
  */

  const handleSave = async () => {
    if (!settings.id) {
      setMessage("Settings ID not available.");

      setShowErrorModal(true);

      return;
    }

    try {
      setSaving(true);

      await updateSettings(settings.id, settings);

      setMessage("Settings updated successfully.");

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Settings update failed:", error);

      setMessage("Unable to update settings.");

      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="settings-loading">Loading settings...</div>;
  }

  return (
    <section className="settings-management">
      <div className="settings-header">
        <div>
          <h2>⚙️ Settings Management</h2>

          <p>Manage portfolio administration settings.</p>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-grid">
          <div className="form-group">
            <label>Admin Name</label>

            <input
              name="adminName"
              value={settings.adminName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Admin Email</label>

            <input
              name="adminEmail"
              value={settings.adminEmail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Role</label>

            <input name="role" value={settings.role} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Application Name</label>

            <input
              name="applicationName"
              value={settings.applicationName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Backend Technology</label>

            <input
              name="backendTechnology"
              value={settings.backendTechnology}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Frontend Technology</label>

            <input
              name="frontendTechnology"
              value={settings.frontendTechnology}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="save-settings-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "💾 Save Settings"}
        </button>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        message={message}
        onClose={() => setShowSuccessModal(false)}
      />

      <ErrorModal
        isOpen={showErrorModal}
        message={message}
        onClose={() => setShowErrorModal(false)}
      />
    </section>
  );
}

export default SettingsManagement;
