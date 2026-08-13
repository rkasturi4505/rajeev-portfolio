import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../api/adminEducationApi";

import { logActivity } from "../api/activityLogApi";

import "./EducationManagement.css";

import ConfirmModal from "./ConfirmModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

interface Education {
  id?: number;

  degree: string;

  institution: string;

  specialization: string;

  duration: string;
}

const initialEducation: Education = {
  degree: "",

  institution: "",

  specialization: "",

  duration: "",
};

function EducationManagement() {
  const [educationList, setEducationList] = useState<Education[]>([]);

  const [filteredEducation, setFilteredEducation] = useState<Education[]>([]);

  const [education, setEducation] = useState<Education>(initialEducation);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  /* ==========================================================
      MODALS
  ========================================================== */

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [deleteId, setDeleteId] = useState<number | null>(null);

  /* ==========================================================
      LOAD EDUCATION
  ========================================================== */

  const loadEducation = async () => {
    try {
      setLoading(true);

      const response = await getEducation();

      setEducationList(response.data);

      setFilteredEducation(response.data);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Unable to load education details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducation();
  }, []);

  /* ==========================================================
      SEARCH
  ========================================================== */

  useEffect(() => {
    const filtered = educationList.filter((item) => {
      return (
        item.degree.toLowerCase().includes(search.toLowerCase()) ||
        item.institution.toLowerCase().includes(search.toLowerCase()) ||
        item.specialization.toLowerCase().includes(search.toLowerCase()) ||
        item.duration.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredEducation(filtered);
  }, [search, educationList]);

  /* ==========================================================
      FORM
  ========================================================== */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEducation((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  /* ==========================================================
      RESET
  ========================================================== */

  const resetForm = () => {
    setEducation(initialEducation);

    setEditingId(null);

    setError("");
  };

  /* ==========================================================
      SAVE / UPDATE
  ========================================================== */

  const handleSave = async () => {
    if (
      !education.degree.trim() ||
      !education.institution.trim() ||
      !education.specialization.trim() ||
      !education.duration.trim()
    ) {
      setErrorMessage("Please fill all mandatory fields.");

      setShowErrorModal(true);

      return;
    }

    try {
      setSaving(true);

      if (editingId !== null) {
        await updateEducation(editingId, education);

        await logActivity("Updated Education");

        setSuccessMessage("Education updated successfully.");
      } else {
        await addEducation(education);

        await logActivity("Added Education");

        setSuccessMessage("Education added successfully.");
      }

      resetForm();

      setSearch("");

      await loadEducation();

      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);

      setErrorMessage("Unable to save education.");

      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };

  /* ==========================================================
      EDIT
  ========================================================== */

  const handleEdit = (item: Education) => {
    setEducation({
      degree: item.degree,

      institution: item.institution,

      specialization: item.specialization,

      duration: item.duration,
    });

    setEditingId(item.id ?? null);

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  /* ==========================================================
      DELETE
  ========================================================== */

  const handleDelete = (id?: number) => {
    if (!id) return;

    setDeleteId(id);

    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteEducation(deleteId);

      await logActivity("Deleted Education");

      setShowConfirmModal(false);

      setDeleteId(null);

      setSearch("");

      await loadEducation();

      setSuccessMessage("Education deleted successfully.");

      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);

      setShowConfirmModal(false);

      setDeleteId(null);

      setErrorMessage("Unable to delete education.");

      setShowErrorModal(true);
    }
  };

  return (
    <div className="education-management">
      <motion.div
        className="education-card"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="education-heading">
        <div className="education-title-row">
          <h2>
            {editingId !== null
              ? "✏ Edit Education"
              : "🎓 Education Management"}
          </h2>

          <span className={editingId !== null ? "edit-mode" : "add-mode"}>
            {editingId !== null ? "Editing Education" : "New Education"}
          </span>
        </div>

        <p className="education-subtitle">
          Manage education details displayed on your portfolio.
        </p>
        </div>
        <div className="education-form">
          <div className="education-grid">
            <input
              name="degree"
              placeholder="Degree *"
              value={education.degree}
              onChange={handleChange}
            />

            <input
              name="institution"
              placeholder="Institution *"
              value={education.institution}
              onChange={handleChange}
            />

            <input
              name="specialization"
              placeholder="Specialization *"
              value={education.specialization}
              onChange={handleChange}
            />

            <input
              name="duration"
              placeholder="Duration *"
              value={education.duration}
              onChange={handleChange}
            />
          </div>

          <div className="save-section">
            <button
              className="save-education-btn"
              disabled={saving}
              onClick={handleSave}
            >
              {saving
                ? "Saving..."
                : editingId !== null
                  ? "💾 Update Education"
                  : "➕ Save Education"}
            </button>

            {editingId !== null && (
              <button className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </motion.div>
      <motion.div
        className="education-list-card"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        <div className="education-header">
          <div>
            <h2>Education</h2>

            <p className="education-count">
              Showing {filteredEducation.length} of {educationList.length}{" "}
              records
            </p>
          </div>

          <div className="search-wrapper">
            <input
              className="search-education"
              placeholder="🔍 Search education..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button className="clear-search" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>

            <p>Loading education...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h3>Unable to Load Education</h3>

            <p>{error}</p>

            <button className="save-education-btn" onClick={loadEducation}>
              Retry
            </button>
          </div>
        ) : (
          <div className="education-wrapper">
            <table className="education-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Degree</th>
                  <th>Institution</th>
                  <th>Specialization</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEducation.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="empty-row">
                      <h3>No Education Found</h3>

                      <p>
                        Try another search or create your first education
                        record.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredEducation.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05,
                      }}
                    >
                      <td>{item.id}</td>

                      <td>{item.degree}</td>

                      <td>{item.institution}</td>

                      <td>{item.specialization}</td>

                      <td>{item.duration}</td>

                      <td className="action-buttons">
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
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Delete Education"
        message="Are you sure you want to delete this education record?"
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
  );
}

export default EducationManagement;
