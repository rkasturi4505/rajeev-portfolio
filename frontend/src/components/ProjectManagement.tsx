import { useEffect, useState } from "react";

import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../api/adminProjectApi";

import "./ProjectManagement.css";

import ConfirmModal from "./ConfirmModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

interface Project {
  id?: number;

  projectName: string;

  organization: string;

  role: string;

  duration: string;

  domain: string;

  teamSize: string;

  technologies: string;

  description: string;
}

const emptyProject: Project = {
  projectName: "",

  organization: "",

  role: "",

  duration: "",

  domain: "",

  teamSize: "",

  technologies: "",

  description: "",
};

function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [project, setProject] = useState<Project>(emptyProject);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [error, setError] = useState("");

  /* ==========================================================
      LOAD PROJECTS
  ========================================================== */

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response = await getProjects();

      setProjects(response.data);

      setFilteredProjects(response.data);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  /* ==========================================================
      SEARCH FILTER
  ========================================================== */

  useEffect(() => {
    const text = search.toLowerCase();

    const result = projects.filter((item) => {
      return (
        (item.projectName ?? "").toLowerCase().includes(text) ||
        (item.organization ?? "").toLowerCase().includes(text) ||
        (item.role ?? "").toLowerCase().includes(text) ||
        (item.domain ?? "").toLowerCase().includes(text)
      );
    });

    setFilteredProjects(result);
  }, [search, projects]);

  /* ==========================================================
      FORM CHANGE
  ========================================================== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setProject((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  /* ==========================================================
      RESET FORM
  ========================================================== */

  const resetForm = () => {
    setProject(emptyProject);

    setEditingId(null);

    setError("");
  };

  /* ==========================================================
      SAVE PROJECT
  ========================================================== */

  const handleSave = async () => {
    if (
      !project.projectName.trim() ||
      !project.organization.trim() ||
      !project.role.trim() ||
      !project.duration.trim()
    ) {
      setErrorMessage("Please fill all mandatory fields.");

      setShowErrorModal(true);

      return;
    }

    try {
      setSaving(true);

      if (editingId !== null) {
        await updateProject(
          editingId,

          project,
        );

        setSuccessMessage("Project updated successfully.");
      } else {
        await addProject(project);

        setSuccessMessage("Project added successfully.");
      }

      resetForm();

      await loadProjects();

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);

      setErrorMessage("Unable to save project.");

      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };
  /* ==========================================================
      EDIT PROJECT
  ========================================================== */

  const handleEdit = (selectedProject: Project) => {
    setProject({
      projectName: selectedProject.projectName,

      organization: selectedProject.organization,

      role: selectedProject.role,

      duration: selectedProject.duration,

      domain: selectedProject.domain,

      teamSize: selectedProject.teamSize,

      technologies: selectedProject.technologies,

      description: selectedProject.description,
    });

    setEditingId(selectedProject.id ?? null);

      document
    .querySelector(".project-card")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
};

  /* ==========================================================
      DELETE PROJECT
  ========================================================== */

  const handleDelete = (id?: number) => {
    if (!id) return;

    setDeleteId(id);

    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteProject(deleteId);

      setShowConfirmModal(false);

      await loadProjects();

      setSuccessMessage("Project deleted successfully.");

      setShowSuccessModal(true);

      setDeleteId(null);
    } catch (error) {
      console.error(error);

      setShowConfirmModal(false);

      setErrorMessage("Unable to delete project.");

      setShowErrorModal(true);
    }
  };

  return (
    <div className="project-management">
      {/* PAGE HEADER */}

      <div className="management-header">
        <h2>Project Management</h2>

        <p>Manage portfolio projects displayed on your website.</p>
      </div>

      {/* PROJECT FORM */}

      <div className="project-card" id="project-form">
        <div className="project-title-row">
          <h2>
            {editingId !== null ? "✏ Edit Project" : "📁 Add New Project"}
          </h2>

          <span className={editingId !== null ? "edit-mode" : "add-mode"}>
            {editingId !== null ? "Editing Project" : "New Project"}
          </span>
        </div>

        <div className="project-grid">
          <input
            type="text"
            name="projectName"
            placeholder="Project Name *"
            value={project.projectName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="organization"
            placeholder="Organization *"
            value={project.organization}
            onChange={handleChange}
          />

          <input
            type="text"
            name="role"
            placeholder="Role *"
            value={project.role}
            onChange={handleChange}
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration *"
            value={project.duration}
            onChange={handleChange}
          />

          <input
            type="text"
            name="domain"
            placeholder="Domain"
            value={project.domain}
            onChange={handleChange}
          />

          <input
            type="text"
            name="teamSize"
            placeholder="Team Size"
            value={project.teamSize}
            onChange={handleChange}
          />
        </div>

        <input
          className="full-width-input"
          type="text"
          name="technologies"
          placeholder="Technologies Used"
          value={project.technologies}
          onChange={handleChange}
        />

        <textarea
          rows={5}
          name="description"
          placeholder="Project Description"
          value={project.description}
          onChange={handleChange}
        />

        <div className="project-action-row">
          <button
            className="save-project-btn"
            disabled={saving}
            onClick={handleSave}
          >
            {saving
              ? "Saving..."
              : editingId !== null
                ? "💾 Update Project"
                : "➕ Save Project"}
          </button>

          {editingId !== null && (
            <button className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* PROJECT LIST */}

      <div className="project-list-card">
        <div className="project-header">
          <div>
            <h2>Projects</h2>

            <p className="project-count">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          <input
            className="search-project"
            type="text"
            placeholder="🔍 Search project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>

            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h3>Unable to Load Projects</h3>

            <p>{error}</p>

            <button className="save-project-btn" onClick={loadProjects}>
              Retry
            </button>
          </div>
        ) : (
          <div className="project-wrapper project-table-container">
            <table className="project-table">
              <thead>
                <tr>
                  <th>ID</th>

                  <th>Project</th>

                  <th>Organization</th>

                  <th>Role</th>

                  <th>Duration</th>

                  <th>Domain</th>

                  <th>Team Size</th>

                  <th>Technologies</th>

                  <th>Description</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="empty-state">
                      No Projects Found
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>

                      <td>{item.projectName}</td>

                      <td>{item.organization}</td>

                      <td>{item.role}</td>

                      <td>{item.duration}</td>

                      <td>{item.domain}</td>

                      <td>{item.teamSize}</td>

                      <td>{item.technologies}</td>

                      <td className="description-column">{item.description}</td>

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
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Delete Project"
        message="Are you sure you want to delete this project?"
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

export default ProjectManagement;
