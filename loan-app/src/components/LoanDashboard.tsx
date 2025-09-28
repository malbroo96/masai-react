import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import type { initialState } from "../store";
import type { LoanApplication } from "../features/loanSlice";
import { setApplications, setLoading, setError } from "../features/loanSlice";
import { fetchUserLoans } from "../firebase";
import "../styles/loan-dashboard.css";

export default function LoanDashboard() {
  const dispatch = useDispatch();
  const { applications, loading, error } = useSelector(
    (state: initialState) => state.loan
  );
  const { user } = useSelector((state: initialState) => state.auth);
  const [selectedApplication, setSelectedApplication] =
    useState<LoanApplication | null>(null);

  useEffect(() => {
    const loadLoans = async () => {
      if (!user) return;

      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const loans = await fetchUserLoans(user.uid);
        dispatch(setApplications(loans));
      } catch (err) {
        dispatch(setError((err as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadLoans();
  }, [dispatch, user]);

  // Filter applications by status
  const getApplicationsByStatus = (status: LoanApplication["status"]) => {
    return applications.filter((app) => app.status === status);
  };

  // Calculate progress percentage for an application
  const calculateProgress = (status: LoanApplication["status"]) => {
    const stages = ["draft", "submitted", "under-review", "approved"];
    const currentIndex = stages.indexOf(status);
    return ((currentIndex + 1) / stages.length) * 100;
  };

  const renderStatusBadge = (status: LoanApplication["status"]) => {
    return <span className={`status-badge status-${status}`}>{status}</span>;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Loan Management</h1>
      </div>

      {loading ? (
        <div className="dashboard-card">
          <p>Loading your applications...</p>
        </div>
      ) : error ? (
        <div className="dashboard-card error">
          <p>{error}</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {applications.length === 0 ? (
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">No Applications Yet</h3>
                <p>You haven't submitted any loan applications yet.</p>
              </div>
            </div>
          ) : (
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Loan Applications</h3>
                <p className="mt-1">
                  Track the status of your loan applications
                </p>
              </div>
              <div className="applications-list">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="application-item"
                    onClick={() => setSelectedApplication(app)}
                  >
                    <div className="application-info">
                      <h4>{app.personalInfo?.fullName}</h4>
                      <p>Amount: ${app.financialInfo?.loanAmount}</p>
                      <p>Purpose: {app.financialInfo?.loanPurpose}</p>
                    </div>
                    <div className="application-status">
                      {renderStatusBadge(app.status)}
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${calculateProgress(app.status)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="status-summary">
        <h2 className="summary-title">Application Status Summary</h2>
        <div className="status-list">
          {["draft", "submitted", "under-review", "approved", "rejected"].map(
            (status) => (
              <div key={status} className="status-item">
                <span className="status-label">{status}:</span>
                <span className="status-count">
                  {
                    getApplicationsByStatus(status as LoanApplication["status"])
                      .length
                  }
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Applications grid */}
      <div className="applications-grid">
        {applications.map((application) => (
          <div key={application.id} className="application-card">
            <div className="application-content">
              <div className="application-header">
                <div className="application-title">
                  <h3>
                    {application.personalInfo?.fullName ||
                      "Unnamed Application"}
                  </h3>
                  <p className="application-date">
                    Applied on{" "}
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {renderStatusBadge(application.status)}
              </div>

              {/* Progress bar */}
              <div className="progress-section">
                <div className="progress-header">
                  <div className="progress-label">
                    <span>Progress</span>
                  </div>
                  <div className="progress-percentage">
                    <span>{calculateProgress(application.status)}%</span>
                  </div>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${calculateProgress(application.status)}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Application details */}
              <div className="application-details">
                <dl className="details-grid">
                  <div className="detail-item">
                    <dt>Loan Amount</dt>
                    <dd>
                      ${application.financialInfo?.loanAmount.toLocaleString()}
                    </dd>
                  </div>
                  <div className="detail-item">
                    <dt>Term</dt>
                    <dd>{application.financialInfo?.loanTerm} months</dd>
                  </div>
                </dl>
              </div>

              {/* Documents status */}
              <div className="documents-section">
                <h4 className="documents-title">Documents</h4>
                <div className="documents-list">
                  {application.documents?.map((doc) => (
                    <div key={doc.id} className="document-item">
                      <span className="document-name">{doc.name}</span>
                      <span className={`document-status status-${doc.status}`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View details button */}
              <div className="action-section">
                <button
                  onClick={() => setSelectedApplication(application)}
                  className="btn btn-secondary"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application details modal */}
      {selectedApplication && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div
              className="modal-backdrop"
              onClick={() => setSelectedApplication(null)}
            ></div>

            <div className="modal-content">
              <div className="modal-body">
                <div className="modal-header">
                  <h3 className="modal-title">Application Details</h3>
                  <div className="modal-details">
                    <dl className="details-grid">
                      <div className="detail-item full-width">
                        <dt>Status</dt>
                        <dd>{renderStatusBadge(selectedApplication.status)}</dd>
                      </div>
                      <div className="detail-item full-width">
                        <dt>Full Name</dt>
                        <dd>{selectedApplication.personalInfo?.fullName}</dd>
                      </div>
                      <div className="detail-item">
                        <dt>Email</dt>
                        <dd>{selectedApplication.personalInfo?.email}</dd>
                      </div>
                      <div className="detail-item">
                        <dt>Phone</dt>
                        <dd>{selectedApplication.personalInfo?.phone}</dd>
                      </div>
                      {/* Add more details as needed */}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
