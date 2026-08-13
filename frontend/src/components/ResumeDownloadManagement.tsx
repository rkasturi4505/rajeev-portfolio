import { useEffect, useState } from "react";

import { getResumeDownloads } from "../api/resumeDownloadApi";

import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

import "./ResumeDownloadManagement.css";

interface ResumeDownload {
  id: number;

  downloadedAt: string;
}

function ResumeDownloadManagement() {
  const [downloads, setDownloads] = useState<ResumeDownload[]>([]);

  const [filteredDownloads, setFilteredDownloads] = useState<ResumeDownload[]>(
    [],
  );

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  /*
  ==========================================================
      LOAD DOWNLOAD HISTORY
  ==========================================================
  */

  const loadDownloads = async () => {
    try {
      setLoading(true);

      const data = await getResumeDownloads();

      setDownloads(data);

      setFilteredDownloads(data);

      setError("");
    } catch (error) {
      console.error("Failed to load resume downloads:", error);

      setError("Unable to load resume download history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDownloads();
  }, []);

  /*
  ==========================================================
      SEARCH
  ==========================================================
  */

  useEffect(() => {
    const filtered = downloads.filter((item) => {
      const date = new Date(item.downloadedAt).toLocaleString().toLowerCase();

      return date.includes(search.toLowerCase());
    });

    setFilteredDownloads(filtered);
  }, [search, downloads]);

  /*
  ==========================================================
      REFRESH
  ==========================================================
  */

  const handleRefresh = async () => {
    try {
      await loadDownloads();

      setSuccessMessage("Resume download history refreshed.");

      setShowSuccessModal(true);
    } catch {
      setErrorMessage("Unable to refresh downloads.");

      setShowErrorModal(true);
    }
  };

  return (
    <section className="resume-download-management">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="section-header">
        <div>
          <h2>📥 Resume Download History</h2>

          <p>Track visitors who downloaded your resume.</p>
        </div>

        <button className="refresh-btn" onClick={handleRefresh}>
          🔄 Refresh
        </button>
      </div>

      {/* ======================================================
          SUMMARY CARD
      ====================================================== */}

      <div className="download-summary-card">
        <div className="summary-icon">📄</div>

        <div>
          <h3>Total Downloads</h3>

          <strong>{downloads.length}</strong>
        </div>
      </div>

      {/* ======================================================
          TABLE CARD
      ====================================================== */}

      <div className="resume-download-card">
        <div className="table-header">
          <div>
            <h3>Download Records</h3>

            <p>
              Showing {filteredDownloads.length} of {downloads.length} records
            </p>
          </div>

          <input
            className="download-search"
            placeholder="🔍 Search date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>

            <p>Loading resume downloads...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h3>Unable to Load Downloads</h3>

            <p>{error}</p>

            <button className="refresh-btn" onClick={loadDownloads}>
              Retry
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>

                  <th>Downloaded Date & Time</th>
                </tr>
              </thead>

              <tbody>
                {filteredDownloads.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="empty-row">
                      <h3>No Downloads Found</h3>

                      <p>Resume download records will appear here.</p>
                    </td>
                  </tr>
                ) : (
                  filteredDownloads.map((download) => (
                    <tr key={download.id}>
                      <td>{download.id}</td>

                      <td>
                        <span className="download-date">
                          {new Date(download.downloadedAt).toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ======================================================
          MODALS
      ====================================================== */}

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
    </section>
  );
}

export default ResumeDownloadManagement;
