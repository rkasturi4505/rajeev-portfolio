import { useEffect, useState } from "react";

import {
  getCertifications,
  addCertification,
  updateCertification,
  deleteCertification,
} from "../api/adminCertificationApi";

import { logActivity } from "../api/activityLogApi";

import ConfirmModal from "./ConfirmModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

import "./CertificationManagement.css";

interface Certification {
  id?: number;

  name: string;

  issuer: string;

  certificateUrl: string;
}

const emptyCertification: Certification = {
  name: "",
  issuer: "",
  certificateUrl: "",
};

function AdminCertificationManagement() {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const [filteredCertifications, setFilteredCertifications] = useState<
    Certification[]
  >([]);

  const [certification, setCertification] = useState<Certification>({
    ...emptyCertification,
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  /*
  ==========================================================
      MODALS
  ==========================================================
  */

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [deleteId, setDeleteId] = useState<number | null>(null);

  /*
  ==========================================================
      LOAD CERTIFICATIONS
  ==========================================================
  */

  const loadCertifications = async () => {
    try {
      setLoading(true);

      const response = await getCertifications();

      setCertifications(response.data);

      setFilteredCertifications(response.data);

      setError("");
    } catch (error) {
      console.error(error);

      setError("Unable to load certifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertifications();
  }, []);

  /*
  ==========================================================
      SEARCH
  ==========================================================
  */

  useEffect(() => {
    const filtered = certifications.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.issuer.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredCertifications(filtered);
  }, [search, certifications]);

  /*
  ==========================================================
      HANDLE CHANGE
  ==========================================================
  */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCertification((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  /*
  ==========================================================
      RESET FORM
  ==========================================================
  */

  const resetForm = () => {
    setCertification({
      ...emptyCertification,
    });

    setEditingId(null);
  };

  /*
  ==========================================================
      VALIDATION
  ==========================================================
  */

  const validateForm = () => {
    if (!certification.name.trim()) {
      setErrorMessage("Certification name is required.");

      setShowErrorModal(true);

      return false;
    }

    if (!certification.issuer.trim()) {
      setErrorMessage("Issuer name is required.");

      setShowErrorModal(true);

      return false;
    }

    return true;
  };

  /*
  ==========================================================
      SAVE / UPDATE
  ==========================================================
  */

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);

      if (editingId !== null) {
        await updateCertification(editingId, certification);

        await logActivity("Updated Certification");

        setSuccessMessage("Certification updated successfully.");
      } else {
        await addCertification(certification);

        await logActivity("Added Certification");

        setSuccessMessage("Certification added successfully.");
      }

      resetForm();

      setSearch("");

      await loadCertifications();

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);

      setErrorMessage("Unable to save certification.");

      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };
  /*
  ==========================================================
      EDIT
  ==========================================================
  */

  const handleEdit = (selectedCertification: Certification) => {
    setCertification({
      name: selectedCertification.name,

      issuer: selectedCertification.issuer,

      certificateUrl: selectedCertification.certificateUrl,
    });

    setEditingId(selectedCertification.id ?? null);

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  /*
  ==========================================================
      DELETE
  ==========================================================
  */

  const handleDelete = (id?: number) => {
    if (!id) return;

    setDeleteId(id);

    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteCertification(deleteId);

      await logActivity("Deleted Certification");

      setShowConfirmModal(false);

      setDeleteId(null);

      setSuccessMessage("Certification deleted successfully.");

      setShowSuccessModal(true);

      await loadCertifications();
    } catch (error) {
      console.error(error);

      setShowConfirmModal(false);

      setErrorMessage("Unable to delete certification.");

      setShowErrorModal(true);
    }
  };

  return (
    <div className="certification-management">
      {/* ================= FORM ================= */}

      <div className="certification-card">
        <div className="certification-title-row">
          <h2>
            {editingId !== null
              ? "✏ Edit Certification"
              : "🏆 Certification Management"}
          </h2>

          <span className={editingId !== null ? "edit-mode" : "add-mode"}>
            {editingId !== null ? "Editing Certification" : "New Certification"}
          </span>
        </div>

        <p className="certification-subtitle">
          Manage professional certifications displayed on your portfolio.
        </p>

        <div className="certification-grid">
          <input
            name="name"
            placeholder="Certification Name *"
            value={certification.name}
            onChange={handleChange}
          />

          <input
            name="issuer"
            placeholder="Issuer / Organization *"
            value={certification.issuer}
            onChange={handleChange}
          />

          <input
            name="certificateUrl"
            placeholder="Certificate URL"
            value={certification.certificateUrl}
            onChange={handleChange}
          />
        </div>

        <div className="button-group">
          <button
            className="save-certification-btn"
            disabled={saving}
            onClick={handleSave}
          >
            {saving
              ? "Saving..."
              : editingId !== null
                ? "💾 Update Certification"
                : "➕ Save Certification"}
          </button>

          {editingId !== null && (
            <button className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ================= LIST ================= */}

      <div className="certification-list-card">
        <div className="certification-header">
          <div>
            <h2>Certifications</h2>

            <p className="project-count">
              Showing {filteredCertifications.length} of {certifications.length}{" "}
              certifications
            </p>
          </div>

          <input
            className="search-certification"
            placeholder="🔍 Search certification..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>

            <p>Loading certifications...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h3>Unable to Load Certifications</h3>

            <p>{error}</p>

            <button
              className="save-certification-btn"
              onClick={loadCertifications}
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="certification-wrapper">
            <table className="certification-table">
              <thead>
                <tr>
                  <th>ID</th>

                  <th>Certification</th>

                  <th>Issuer</th>

                  <th>Certificate</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCertifications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="empty-row">
                      No Certifications Found
                    </td>
                  </tr>
                ) : (
                  filteredCertifications.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>

                      <td>{item.name}</td>

                      <td>{item.issuer}</td>

                      <td>
                        {item.certificateUrl ? (
                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Certificate
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= MODALS ================= */}

        <ConfirmModal
          isOpen={showConfirmModal}
          title="Delete Certification"
          message="Are you sure you want to delete this certification?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmModal(false)}
        />

        <SuccessModal
          isOpen={showSuccessModal}
          message={successMessage}
          onClose={() => setShowSuccessModal(false)}
        />

        <ErrorModal
          isOpen={showErrorModal}
          message={errorMessage}
          onClose={() => setShowErrorModal(false)}
        />
      </div>
    </div>
  );
}

export default AdminCertificationManagement;
