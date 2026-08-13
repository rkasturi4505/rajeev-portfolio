import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import { getResumes, uploadResume, deleteResume } from "../api/resumeApi";

import { logActivity } from "../api/activityLogApi";

import { API_BASE_URL } from "../config/apiConfig";

import ConfirmModal from "./ConfirmModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

import "./ResumeManagement.css";

interface Resume {
  id: number;

  fileName: string;

  filePath: string;

  fileType: string;

  fileSize: number;
}

function ResumeManagement() {
  const [resumes, setResumes] = useState<Resume[]>([]);

  const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [search, setSearch] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [error, setError] = useState("");

  /*
  ==========================================================
      LOAD RESUMES
  ==========================================================
  */

  const loadResumes = async () => {
    try {
      setLoading(true);

      const response = await getResumes();

      setResumes(response.data);

      setFilteredResumes(response.data);

      setError("");
    } catch (error) {
      console.error(error);

      setError("Unable to load resumes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  /*
  ==========================================================
      SEARCH
  ==========================================================
  */

  useEffect(() => {
    const filtered = resumes.filter((resume) =>
      resume.fileName.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredResumes(filtered);
  }, [search, resumes]);

  /*
  ==========================================================
      FILE SELECT
  ==========================================================
  */

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    console.log("Selected file:", file);

    if (!file) return;

    if (file.type !== "application/pdf") {
      setErrorMessage("Only PDF files are allowed.");

      setShowErrorModal(true);

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size should be less than 5MB.");

      setShowErrorModal(true);

      return;
    }

    setSelectedFile(file);
  };

  /*
  ==========================================================
      UPLOAD RESUME
  ==========================================================
  */

  const handleUpload = async () => {
    console.log("Uploading file:", selectedFile);

    if (!selectedFile) {
      setErrorMessage("Please select a PDF resume.");

      setShowErrorModal(true);

      return;
    }

    try {
      setUploading(true);

      await uploadResume(selectedFile);

      await logActivity("Uploaded Resume");

      setSelectedFile(null);

      setSuccessMessage("Resume uploaded successfully.");

      setShowSuccessModal(true);

      await loadResumes();
    } catch (error) {
      console.error(error);

      setErrorMessage("Unable to upload resume.");

      setShowErrorModal(true);
    } finally {
      setUploading(false);
    }
  };

  /*
  ==========================================================
      DELETE
  ==========================================================
  */

  const handleDelete = (id: number) => {
    setDeleteId(id);

    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;

    try {
      await deleteResume(deleteId);

      await logActivity("Deleted Resume");

      setShowConfirmModal(false);

      setDeleteId(null);

      setSuccessMessage("Resume deleted successfully.");

      setShowSuccessModal(true);

      await loadResumes();
    } catch (error) {
      console.error(error);

      setShowConfirmModal(false);

      setErrorMessage("Unable to delete resume.");

      setShowErrorModal(true);
    }
  };

  return (
    <div className="resume-management">
      {/* ==========================================================
          HEADER
      ========================================================== */}

      <div className="resume-header">
        <div className="page-header">
          <h2>📄 Resume Management</h2>

          <p>Upload, update, and manage your latest resume.</p>
        </div>
      </div>

      {/* ==========================================================
          UPLOAD CARD
      ========================================================== */}

      <div className="resume-upload-card">
        <div className="upload-left">
          <input type="file" accept=".pdf" onChange={handleFileChange} />

          {selectedFile && (
            <div className="selected-file">
              <strong>Selected:</strong> {selectedFile.name}
              <button
                className="remove-file-btn"
                onClick={() => setSelectedFile(null)}
                type="button"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "⬆ Upload Resume"}
        </button>
      </div>

      {/* ==========================================================
          RESUME TABLE
      ========================================================== */}

      <div className="resume-table-card">
        <div className="resume-table-header">
          <div>
            <h3>Uploaded Resumes</h3>

            <p>
              Showing {filteredResumes.length} of {resumes.length} resume(s)
            </p>
          </div>

          <input
            className="resume-search"
            type="text"
            placeholder="🔍 Search Resume..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>

            <p>Loading resumes...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h3>Unable to Load Resumes</h3>

            <p>{error}</p>

            <button className="upload-btn" onClick={loadResumes}>
              Retry
            </button>
          </div>
        ) : (
          <div className="resume-wrapper">
            <table className="resume-table">
              <thead>
                <tr>
                  <th>ID</th>

                  <th>File Name</th>

                  <th>Type</th>

                  <th>Size (KB)</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredResumes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="no-data">
                      No Resume Uploaded
                    </td>
                  </tr>
                ) : (
                  filteredResumes.map((resume) => (
                    <tr key={resume.id}>
                      <td>{resume.id}</td>

                      <td>{resume.fileName}</td>

                      <td>{resume.fileType}</td>

                      <td>{(resume.fileSize / 1024).toFixed(2)}</td>

                      <td>
                        <a
                          href={`${API_BASE_URL}${resume.filePath}`}
                          target="_blank"
                          rel="noreferrer"
                          className="download-btn"
                        >
                          Download
                        </a>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(resume.id)}
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

      {/* ==========================================================
          MODALS
      ========================================================== */}

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Delete Resume"
        message="Are you sure you want to delete this resume?"
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

export default ResumeManagement;
