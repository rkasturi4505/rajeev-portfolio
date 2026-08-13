import { useEffect, useState } from "react";

import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../api/experienceApi";

import { logActivity } from "../api/activityLogApi";

import ConfirmModal from "./ConfirmModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

import "./ExperienceManagement.css";

interface Experience {
  id?: number;

  company: string;

  designation: string;

  duration: string;

  location: string;

  technologies: string;

  description: string;

  displayOrder: number;
}

const emptyExperience: Experience = {
  company: "",

  designation: "",

  duration: "",

  location: "",

  technologies: "",

  description: "",

  displayOrder: 1,
};

function ExperienceManagement() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(
    [],
  );

  const [experience, setExperience] = useState<Experience>(emptyExperience);

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
      LOAD EXPERIENCE
  ========================================================== */

  const loadExperiences = async () => {
    try {
      setLoading(true);

      const response = await getExperiences();

      setExperiences(response.data);

      setFilteredExperiences(response.data);

      setError("");
    } catch (error) {
      console.error(error);

      setError("Unable to load experiences.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  /* ==========================================================
      SEARCH
  ========================================================== */

  useEffect(() => {
    const filtered = experiences.filter((item) => {
      return (
        item.company.toLowerCase().includes(search.toLowerCase()) ||
        item.designation.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.technologies.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredExperiences(filtered);
  }, [search, experiences]);

  /* ==========================================================
      HANDLE CHANGE
  ========================================================== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setExperience((previous) => ({
      ...previous,

      [name]: name === "displayOrder" ? Number(value) : value,
    }));
  };

  /* ==========================================================
      RESET FORM
  ========================================================== */

  const resetForm = () => {
    setExperience(emptyExperience);

    setEditingId(null);
  };

  /* ==========================================================
      VALIDATION + SAVE
  ========================================================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !experience.company.trim() ||
      !experience.designation.trim() ||
      !experience.duration.trim()
    ) {
      setErrorMessage("Please fill all mandatory fields.");

      setShowErrorModal(true);

      return;
    }

    try {
      setSaving(true);

      if (editingId !== null) {
        await updateExperience(editingId, experience);

        await logActivity("Updated Experience");

        setSuccessMessage("Experience updated successfully.");
      } else {
        await addExperience(experience);

        await logActivity("Added Experience");

        setSuccessMessage("Experience added successfully.");
      }

      resetForm();

      await loadExperiences();

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);

      setErrorMessage("Unable to save experience.");

      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };

  /* ==========================================================
      EDIT EXPERIENCE
  ========================================================== */

  const handleEdit = (exp: Experience) => {
    setExperience({
      company: exp.company,

      designation: exp.designation,

      duration: exp.duration,

      location: exp.location,

      technologies: exp.technologies,

      description: exp.description,

      displayOrder: exp.displayOrder,
    });

    setEditingId(exp.id ?? null);

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  /* ==========================================================
      DELETE EXPERIENCE
  ========================================================== */

  const handleDelete = (id?: number) => {
    if (!id) return;

    setDeleteId(id);

    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteExperience(deleteId);

      await logActivity("Deleted Experience");

      setShowConfirmModal(false);

      setSuccessMessage("Experience deleted successfully.");

      setShowSuccessModal(true);

      await loadExperiences();
    } catch (error) {
      console.error(error);

      setShowConfirmModal(false);

      setErrorMessage("Unable to delete experience.");

      setShowErrorModal(true);
    }
  };

  return (
    <div className="experience-management">
      {/* PAGE HEADER */}

      <div className="management-header">
        <h2>Experience Management</h2>

        <p>Manage professional experience displayed on your portfolio.</p>
      </div>

      {/* EXPERIENCE FORM */}

      <div className="experience-card">
        <div className="experience-header-top">
          <div>
            <h2>
              {editingId !== null
                ? "✏ Edit Experience"
                : "💼 Add New Experience"}
            </h2>
          </div>

          <span className={editingId !== null ? "edit-mode" : "add-mode"}>
            {editingId !== null ? "Editing Experience" : "New Experience"}
          </span>
        </div>
        <form className="experience-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="company"
            placeholder="Company *"
            value={experience.company}
            onChange={handleChange}
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation *"
            value={experience.designation}
            onChange={handleChange}
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration *"
            value={experience.duration}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={experience.location}
            onChange={handleChange}
          />

          <input
            type="text"
            name="technologies"
            placeholder="Technologies"
            value={experience.technologies}
            onChange={handleChange}
          />

          <input
            type="number"
            name="displayOrder"
            placeholder="Display Order"
            min={1}
            value={experience.displayOrder}
            onChange={handleChange}
          />

          <textarea
            rows={5}
            name="description"
            placeholder="Experience Description"
            value={experience.description}
            onChange={handleChange}
          />

          <div className="button-group">
            <button type="submit" className="save-button" disabled={saving}>
              {saving
                ? "Saving..."
                : editingId !== null
                  ? "💾 Update Experience"
                  : "➕ Save Experience"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* EXPERIENCE LIST */}

      <div className="experience-list-card">
        <div className="experience-header">
          <div>
            <h2>Experiences</h2>

            <p className="experience-count">
              Showing {filteredExperiences.length} of {experiences.length}{" "}
              experiences
            </p>
          </div>

          <input
            className="search-experience"
            placeholder="🔍 Search experience..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>

            <p>Loading experiences...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h3>Unable to Load Experiences</h3>

            <p>{error}</p>

            <button className="save-button" onClick={loadExperiences}>
              Retry
            </button>
          </div>
        ) : (
          <div className="experience-wrapper">
            <table className="experience-table">
              <thead>
                <tr>
                  <th>Order</th>

                  <th>Company</th>

                  <th>Designation</th>

                  <th>Duration</th>

                  <th>Location</th>

                  <th>Technologies</th>

                  <th>Description</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredExperiences.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="no-data">
                      No Experience Found
                    </td>
                  </tr>
                ) : (
                  filteredExperiences.map((exp) => (
                    <tr key={exp.id}>
                      <td>{exp.displayOrder}</td>

                      <td>{exp.company}</td>

                      <td>{exp.designation}</td>

                      <td>{exp.duration}</td>

                      <td>{exp.location}</td>

                      <td>{exp.technologies}</td>

                      <td className="description-column">{exp.description}</td>

                      <td>
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(exp)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() => handleDelete(exp.id)}
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

        <ConfirmModal
          isOpen={showConfirmModal}
          title="Delete Experience"
          message="Are you sure you want to delete this experience?"
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

export default ExperienceManagement;
