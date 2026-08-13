import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} from "../api/adminSkillApi";

import { logActivity } from "../api/activityLogApi";

import ConfirmModal from "./ConfirmModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

import "./SkillManagement.css";

interface Skill {
  id?: number;

  skillName: string;

  skillLevel: string;

  displayOrder: number;
}

const emptySkill: Skill = {
  skillName: "",

  skillLevel: "Intermediate",

  displayOrder: 1,
};

function SkillManagement() {
  const [skills, setSkills] = useState<Skill[]>([]);

  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);

  const [skill, setSkill] = useState<Skill>(emptySkill);

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
      AUTOCOMPLETE
  ==========================================================
  */

  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  /*
  ==========================================================
      LOAD SKILLS
  ==========================================================
  */

  const loadSkills = async () => {
    try {
      setLoading(true);

      const response = await getSkills();

      setSkills(response.data);

      setFilteredSkills(response.data);

      setSkillSuggestions(response.data.map((item: Skill) => item.skillName));

      setError("");
    } catch (error) {
      console.error(error);

      setError("Unable to load skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  /*
  ==========================================================
      SEARCH FILTER
  ==========================================================
  */

  useEffect(() => {
    const filtered = skills.filter(
      (item) =>
        item.skillName.toLowerCase().includes(search.toLowerCase()) ||
        item.skillLevel.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredSkills(filtered);
  }, [search, skills]);

  /*
  ==========================================================
      INPUT CHANGE
  ==========================================================
  */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setSkill((previous) => ({
      ...previous,

      [name]: name === "displayOrder" ? Number(value) : value,
    }));
  };

  /*
  ==========================================================
      RESET FORM
  ==========================================================
  */

  const resetForm = () => {
    setSkill(emptySkill);

    setEditingId(null);

    setShowSuggestions(false);
  };

  /*
  ==========================================================
      VALIDATION
  ==========================================================
  */

  const validateForm = () => {
    if (!skill.skillName.trim()) {
      setErrorMessage("Skill Name is required.");

      setShowErrorModal(true);

      return false;
    }

    const duplicate = skills.some(
      (item) =>
        item.skillName.toLowerCase() === skill.skillName.toLowerCase() &&
        item.id !== editingId,
    );

    if (duplicate) {
      setErrorMessage("Skill already exists.");

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
        await updateSkill(editingId, skill);

        await logActivity("Updated Skill");

        setSuccessMessage("Skill updated successfully.");
      } else {
        await addSkill(skill);

        await logActivity("Added Skill");

        setSuccessMessage("Skill added successfully.");
      }

      resetForm();

      setSearch("");

      await loadSkills();

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);

      setErrorMessage("Unable to save skill.");

      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };
  /*
==========================================================
    EDIT SKILL
==========================================================
*/

  const handleEdit = (selectedSkill: Skill) => {
    setSkill({
      skillName: selectedSkill.skillName,

      skillLevel: selectedSkill.skillLevel,

      displayOrder: selectedSkill.displayOrder,
    });

    setEditingId(selectedSkill.id ?? null);

    setShowSuggestions(false);

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  /*
==========================================================
    DELETE SKILL
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
      await deleteSkill(deleteId);

      await logActivity("Deleted Skill");

      setShowConfirmModal(false);

      setSuccessMessage("Skill deleted successfully.");

      setShowSuccessModal(true);

      setSearch("");

      await loadSkills();
    } catch (error) {
      console.error(error);

      setShowConfirmModal(false);

      setErrorMessage("Unable to delete skill.");

      setShowErrorModal(true);
    }
  };

  return (
    <motion.div
      className="skill-management"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      {/* ======================================================
      PAGE HEADER
====================================================== */}

      <motion.div
        className="management-header"
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <h2>Skills Management</h2>

        <p>Manage technical skills displayed on your portfolio.</p>
      </motion.div>

      {/* ======================================================
      SKILL FORM CARD
====================================================== */}

      <motion.div
        className="skill-card"
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.35,
        }}
      >
        <div className="skill-title-row">
          <h2>{editingId !== null ? "✏ Edit Skill" : "🚀 Add New Skill"}</h2>

          <span className={editingId !== null ? "edit-mode" : "add-mode"}>
            {editingId !== null ? "Editing Skill" : "New Skill"}
          </span>
        </div>

        <div className="skill-grid">
          {/* Skill Name */}

          <div className="skill-autocomplete">
            <input
              name="skillName"
              placeholder="Skill Name *"
              value={skill.skillName}
              onChange={(e) => {
                handleChange(e);

                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />

            {showSuggestions && skill.skillName && (
              <motion.div
                className="suggestion-box"
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                {skillSuggestions

                  .filter((item) =>
                    item
                      .toLowerCase()
                      .startsWith(skill.skillName.toLowerCase()),
                  )

                  .map((item, index) => (
                    <motion.div
                      key={index}
                      className="suggestion-item"
                      whileHover={{
                        x: 5,
                      }}
                      onClick={() => {
                        setSkill({
                          ...skill,

                          skillName: item,
                        });

                        setShowSuggestions(false);
                      }}
                    >
                      {item}
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </div>

          {/* Level */}

          <select
            name="skillLevel"
            value={skill.skillLevel}
            onChange={handleChange}
          >
            <option>Beginner</option>

            <option>Intermediate</option>

            <option>Advanced</option>

            <option>Expert</option>
          </select>

          {/* Order */}

          <input
            type="number"
            name="displayOrder"
            placeholder="Display Order"
            value={skill.displayOrder}
            onChange={handleChange}
          />
        </div>

        {/* ACTION BUTTONS */}

        <div className="skill-action-row">
          <motion.button
            className="save-skill-btn"
            disabled={saving || !skill.skillName.trim()}
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={handleSave}
          >
            {saving
              ? "Saving..."
              : editingId !== null
                ? "💾 Update Skill"
                : "➕ Save Skill"}
          </motion.button>

          {editingId !== null && (
            <motion.button
              className="cancel-btn"
              whileHover={{
                scale: 1.03,
              }}
              onClick={resetForm}
            >
              Cancel
            </motion.button>
          )}
        </div>
      </motion.div>
      {/* ======================================================
      SKILL LIST CARD
====================================================== */}

      <motion.div
        className="skill-list-card"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          delay: 0.15,
        }}
      >
        <div className="skill-header">
          <div>
            <h2>Skills</h2>

            <p className="project-count">
              Showing {filteredSkills.length} of {skills.length} skills
            </p>
          </div>

          <input
            className="search-skill"
            placeholder="🔍 Search skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LOADING */}

        {loading ? (
          <motion.div
            className="loading-container"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <div className="loader"></div>

            <p>Loading skills...</p>
          </motion.div>
        ) : /* ERROR */

        error ? (
          <motion.div
            className="error-container"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <h3>Unable to Load Skills</h3>

            <p>{error}</p>

            <motion.button
              className="save-skill-btn"
              whileHover={{
                scale: 1.05,
              }}
              onClick={loadSkills}
            >
              Retry
            </motion.button>
          </motion.div>
        ) : (
          /* TABLE */

          <div className="skill-table-wrapper">
            <table className="skill-table">
              <thead>
                <tr>
                  <th>ID</th>

                  <th>Skill</th>

                  <th>Level</th>

                  <th>Order</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredSkills.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="empty-row">
                      No Skills Found
                    </td>
                  </tr>
                ) : (
                  filteredSkills.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.04,
                      }}
                    >
                      <td>{item.id}</td>

                      <td>{item.skillName}</td>

                      <td>
                        <span
                          className={`skill-level ${item.skillLevel.toLowerCase()}`}
                        >
                          {item.skillLevel}
                        </span>
                      </td>

                      <td>{item.displayOrder}</td>

                      <td>
                        <motion.button
                          className="edit-btn"
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </motion.button>

                        <motion.button
                          className="delete-btn"
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
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

        {/* ======================================================
      MODALS
====================================================== */}

        <ConfirmModal
          isOpen={showConfirmModal}
          title="Delete Skill"
          message="Are you sure you want to delete this skill?"
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

export default SkillManagement;
