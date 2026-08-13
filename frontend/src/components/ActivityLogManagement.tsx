import { useEffect, useState } from "react";

import { getActivityLogs } from "../api/activityLogApi";

import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

import "./ActivityLogManagement.css";

interface ActivityLog {
  id: number;

  activity: string;

  activityTime: string;
}

function ActivityLogManagement() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  /*
  ==========================================================
      LOAD ACTIVITY LOGS
  ==========================================================
  */

  const loadActivityLogs = async () => {
    try {
      setLoading(true);

      const data = await getActivityLogs();

      setLogs(data);

      setFilteredLogs(data);

      setError("");
    } catch (error) {
      console.error("Failed to load activity logs:", error);

      setError("Unable to load activity logs.");

      setErrorMessage("Unable to load activity logs.");

      setShowErrorModal(true);

      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadActivityLogs();
  }, []);

  /*
  ==========================================================
      SEARCH
  ==========================================================
  */

  useEffect(() => {
    const filtered = logs.filter((item) => {
      const date = new Date(item.activityTime).toLocaleString().toLowerCase();

      return (
        item.activity.toLowerCase().includes(search.toLowerCase()) ||
        date.includes(search.toLowerCase())
      );
    });

    setFilteredLogs(filtered);
  }, [search, logs]);

  /*
  ==========================================================
      REFRESH
  ==========================================================
  */

  const handleRefresh = async () => {
  try {
    setRefreshing(true);

    await loadActivityLogs();

    setSuccessMessage("Activity logs refreshed successfully.");

    setShowSuccessModal(true);
  } catch (error) {
    console.error(error);

    setErrorMessage("Unable to refresh activity logs.");

    setShowErrorModal(true);
  } finally {
    setRefreshing(false);
  }
};
  return (
    <section className="activity-log-management">
      {/* HEADER */}

      <div className="section-header">
        <div>
          <h2>📋 Activity Logs</h2>

          <p>Track administrator activities performed in the dashboard.</p>
        </div>

        <button className="refresh-btn" onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {/* SUMMARY CARD */}

      <div className="activity-summary-card">
        <div className="summary-icon">📝</div>

        <div>
          <h3>Total Activities</h3>

          <strong>{logs.length}</strong>
        </div>
      </div>

      {/* TABLE CARD */}

      <div className="activity-table-card">
        <div className="table-header">
          <div>
            <h3>Activity History</h3>

            <p>
              Showing {filteredLogs.length} of {logs.length} records
            </p>
          </div>

          <input
            className="activity-search"
            placeholder="🔍 Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>

            <p>Loading activity logs...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h3>Unable to Load Activity Logs</h3>

            <p>{error}</p>

            <button className="refresh-btn" onClick={loadActivityLogs}>
              Retry
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>

                  <th>Activity</th>

                  <th>Date & Time</th>
                </tr>
              </thead>

              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="empty-row">
                      <h3>No Activity Found</h3>

                      <p>Administrator actions will appear here.</p>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>

                      <td>
                        <span className="activity-name">{log.activity}</span>
                      </td>

                      <td>
                        <span className="activity-date">
                          {new Date(log.activityTime).toLocaleString()}
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

      {/* MODALS */}

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

export default ActivityLogManagement;
