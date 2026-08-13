import { useEffect, useState } from "react";
import { getPortfolioViews } from "../api/portfolioViewApi";
import "./PortfolioViewManagement.css";

interface PortfolioView {
  id: number;
  viewedAt: string;
}

function PortfolioViewManagement() {
  const [views, setViews] = useState<PortfolioView[]>([]);
  const [filteredViews, setFilteredViews] = useState<PortfolioView[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const loadPortfolioViews = async () => {
    try {
      setLoading(true);

      const data = await getPortfolioViews();

      setViews(data);

      setFilteredViews(data);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Unable to load portfolio views.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolioViews();
  }, []);

  useEffect(() => {
    const filtered = views.filter((item) =>
      new Date(item.viewedAt)
        .toLocaleString()
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

    setFilteredViews(filtered);
  }, [search, views]);

  return (
    <div className="portfolio-view-management">
      <div className="portfolio-card">
        <div className="portfolio-header">
          <div>
            <h2>👀 Portfolio View History</h2>

            <p>
              Showing {filteredViews.length} of {views.length} portfolio view(s)
            </p>
          </div>

          <input
            className="portfolio-search"
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>

            <p>Loading portfolio views...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h3>Unable to Load Portfolio Views</h3>

            <p>{error}</p>

            <button className="retry-btn" onClick={loadPortfolioViews}>
              Retry
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Viewed At</th>
                </tr>
              </thead>

              <tbody>
                {filteredViews.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="empty-row">
                      No Portfolio Views Found
                    </td>
                  </tr>
                ) : (
                  filteredViews.map((view) => (
                    <tr key={view.id}>
                      <td>{view.id}</td>

                      <td>{new Date(view.viewedAt).toLocaleString()}</td>
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

export default PortfolioViewManagement;
