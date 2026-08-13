import { useEffect, useState } from "react";

import {
  getVisitorSessions,
  deleteVisitorSession,
  searchVisitorSessions,
} from "../api/visitorSessionApi";

import "./VisitorSessionManagement.css";

interface VisitorSession {
  id: number;

  visitorName?: string | null;
  company?: string | null;
  email?: string | null;

  ipAddress?: string | null;

  browser?: string | null;
  operatingSystem?: string | null;
  deviceType?: string | null;

  country?: string | null;
  city?: string | null;

  pageVisited?: string | null;
  sessionDuration?: string | null;

  visitTime: string;
}

function VisitorSessionManagement() {
  const [sessions, setSessions] = useState<VisitorSession[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  // ==========================================================
  // LOAD VISITOR SESSIONS
  // ==========================================================

  const loadSessions = async () => {
    try {
      setLoading(true);

      const response = await getVisitorSessions();

      setSessions(response.data);

      setError("");
    } catch (error) {
      console.error(error);

      setError("Unable to load visitor sessions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearch = async () => {
    if (!search.trim()) {
      loadSessions();
      return;
    }

    try {
      setLoading(true);

      const response = await searchVisitorSessions(search);

      setSessions(response.data);

      setError("");
    } catch (error) {
      console.error(error);

      setError("Unable to search visitor sessions.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Delete this visitor record?");

    if (!confirmDelete) return;

    try {
      await deleteVisitorSession(id);

      await loadSessions();
    } catch (error) {
      console.error(error);

      setError("Unable to delete visitor record.");
    }
  };

  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <div className="visitor-session-management">
      {/* ==================================================
                HEADER
            ================================================== */}

      <div className="page-header">
        <div>
          <h2>👁 Visitor Sessions</h2>

          <p>Track portfolio visitors, devices and activity.</p>
        </div>

        <button
          className="refresh-btn"
          onClick={loadSessions}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      {/* ==================================================
                SEARCH
            ================================================== */}

      <div className="visitor-search-box">
        <div className="search-input-wrapper">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search visitor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>

        <button
          className="search-btn"
          onClick={handleSearch}
          disabled={loading}
        >
          Search
        </button>
      </div>

      {/* ==================================================
                SUMMARY
            ================================================== */}

      <div className="visitor-summary">
        <div className="visitor-summary-card">
          <div className="summary-icon">👥</div>

          <div>
            <span>Total Sessions</span>

            <strong>{sessions.length}</strong>
          </div>
        </div>

        <div className="visitor-summary-card">
          <div className="summary-icon">🌐</div>

          <div>
            <span>Visitor Activity</span>

            <strong>{sessions.length > 0 ? "Active" : "None"}</strong>
          </div>
        </div>
      </div>

      {/* ==================================================
                TABLE CARD
            ================================================== */}

      <div className="visitor-table-card">
        <div className="visitor-table-header">
          <div>
            <h3>Visitor Session Records</h3>

            <p>Detailed information about portfolio visitors.</p>
          </div>

          <span className="record-count">{sessions.length} Records</span>
        </div>

        {/* ==================================================
                    LOADING
                ================================================== */}

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>

            <p>Loading visitor sessions...</p>
          </div>
        ) : error ? (
          /* ==================================================
                       ERROR
                    ================================================== */

          <div className="error-container">
            <h3>Unable to Load Data</h3>

            <p>{error}</p>

            <button className="retry-btn" onClick={loadSessions}>
              Try Again
            </button>
          </div>
        ) : (
          /* ==================================================
                       TABLE
                    ================================================== */

          <div className="visitor-table-wrapper">
            <table className="visitor-table">
              <thead>
                <tr>
                  <th>ID</th>

                  <th>Visitor</th>

                  <th>Company</th>

                  <th>Device</th>

                  <th>Browser</th>

                  <th>OS</th>

                  <th>Page</th>

                  <th>Time</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {sessions.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="no-data">
                      <div className="empty-state">
                        <div className="empty-icon">👁</div>

                        <h3>No Visitor Records Found</h3>

                        <p>
                          Visitor sessions will appear here when users visit
                          your portfolio.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sessions.map((session) => (
                    <tr key={session.id}>
                      <td>
                        <span className="session-id">#{session.id}</span>
                      </td>

                      <td>
                        <span className="visitor-name">
                          {session.visitorName || "Anonymous"}
                        </span>
                      </td>

                      <td>{session.company || "-"}</td>

                      <td>
                        <span className="device-badge">
                          {session.deviceType || "-"}
                        </span>
                      </td>

                      <td>{session.browser || "-"}</td>

                      <td>{session.operatingSystem || "-"}</td>

                      <td>
                        <span className="page-value">
                          {session.pageVisited || "-"}
                        </span>
                      </td>

                      <td>
                        <span className="visit-time">
                          {new Date(session.visitTime).toLocaleString()}
                        </span>
                      </td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(session.id)}
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
    </div>
  );
}

export default VisitorSessionManagement;
