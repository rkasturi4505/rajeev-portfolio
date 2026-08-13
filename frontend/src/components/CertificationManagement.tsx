import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  getCertifications,
  addCertification,
  updateCertification,
  deleteCertification,
} from "../api/adminCertificationApi";

import { logActivity } from "../api/activityLogApi";

import { API_BASE_URL } from "../config/apiConfig";

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

function CertificationManagement() {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const [filteredCertifications, setFilteredCertifications] = useState<
    Certification[]
  >([]);

  const [certification, setCertification] =
    useState<Certification>(emptyCertification);

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
      INPUT CHANGE
  ==========================================================
  */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCertification((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  /*
  ==========================================================
      RESET FORM
  ==========================================================
  */

  const resetForm = () => {
    setCertification(emptyCertification);

    setEditingId(null);
  };

  /*
  ==========================================================
      VALIDATION
  ==========================================================
  */

  const validateForm = () => {
    if (!certification.name.trim()) {
      setErrorMessage("Certification Name is required.");

      setShowErrorModal(true);

      return false;
    }

    if (!certification.issuer.trim()) {
      setErrorMessage("Issuing Organization is required.");

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
    setCertification(selectedCertification);

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

      setSuccessMessage("Certification deleted successfully.");

      setShowSuccessModal(true);

      setSearch("");

      await loadCertifications();
    } catch (error) {
      console.error(error);

      setShowConfirmModal(false);

      setErrorMessage("Unable to delete certification.");

      setShowErrorModal(true);
    }
  };

  return (
    <motion.div
      className="certification-management"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <motion.div
        className="management-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Certification Management</h2>

        <p>Manage certifications displayed on your portfolio.</p>
      </motion.div>

      {/* ======================================================
          CERTIFICATION FORM
      ====================================================== */}

      <motion.div
        className="certification-card"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="certification-title-row">
          <h2>
            {editingId !== null
              ? "✏ Edit Certification"
              : "🏆 Add New Certification"}
          </h2>

          <span className={editingId !== null ? "edit-mode" : "add-mode"}>
            {editingId !== null ? "Editing Certification" : "New Certification"}
          </span>
        </div>

        <div className="certification-grid">
          <input
            type="text"
            name="name"
            placeholder="Certification Name *"
            value={certification.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="issuer"
            placeholder="Issuing Organization *"
            value={certification.issuer}
            onChange={handleChange}
          />
        </div>

        <input
          className="full-width-input"
          type="text"
          name="certificateUrl"
          placeholder="Certificate URL"
          value={certification.certificateUrl}
          onChange={handleChange}
        />

        <div className="certification-action-row">
          <motion.button
            className="save-certification-btn"
            disabled={saving}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
          >
            {saving
              ? "Saving..."
              : editingId !== null
                ? "💾 Update Certification"
                : "➕ Save Certification"}
          </motion.button>

          {editingId !== null && (
            <motion.button
              className="cancel-btn"
              whileHover={{ scale: 1.03 }}
              onClick={resetForm}
            >
              Cancel
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* ======================================================
          CERTIFICATION LIST
      ====================================================== */}

      <motion.div
        className="certification-list-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
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

                  <th>Action</th>
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
                  filteredCertifications.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.04,
                      }}
                    >
                      <td>{item.id}</td>

                      <td>{item.name}</td>

                      <td>{item.issuer}</td>

                      <td>
                        {item.certificateUrl ? (
                          <a
                            href={`${API_BASE_URL}${item.certificateUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="certificate-link"
                          >
                            View Certificate
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>
                        <motion.button
                          className="edit-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </motion.button>

                        <motion.button
                          className="delete-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

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
      </motion.div>
    </motion.div>
  );
}

export default CertificationManagement;
