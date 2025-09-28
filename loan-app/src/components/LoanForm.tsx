import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { initialState } from "../store";
import "../styles/loan-form.css";
import {
  initializeApplication,
  updatePersonalInfo,
  updateFinancialInfo,
  addDocument,
  submitApplication,
  setCurrentStep,
  type LoanApplication,
} from "../features/loanSlice";

import { saveLoanApplication } from "../firebase";

const steps = [
  "Personal Information",
  "Financial Details",
  "Document Upload",
  "Review",
];

export default function LoanForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: initialState) => state.auth);
  const { currentStep, currentApplication } = useSelector(
    (state: initialState) => state.loan
  );

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
  });

  const [financialInfo, setFinancialInfo] = useState({
    employmentStatus: "",
    monthlyIncome: 0,
    loanAmount: 0,
    loanPurpose: "",
    loanTerm: 12,
  });

  const [documents, setDocuments] = useState<LoanApplication["documents"]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user && !currentApplication) {
      dispatch(initializeApplication({ userId: user.uid }));
    }
  }, [dispatch, user, currentApplication]);

  const validatePersonalInfo = () => {
    const newErrors: { [key: string]: string } = {};
    if (!personalInfo.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!personalInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Valid email is required";
    }
    if (!personalInfo.phone.match(/^\d{10}$/)) {
      newErrors.phone = "Valid 10-digit phone number is required";
    }
    if (!personalInfo.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!personalInfo.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFinancialInfo = () => {
    const newErrors: { [key: string]: string } = {};
    if (!financialInfo.employmentStatus) {
      newErrors.employmentStatus = "Employment status is required";
    }
    if (financialInfo.monthlyIncome <= 0) {
      newErrors.monthlyIncome = "Monthly income must be greater than 0";
    }
    if (financialInfo.loanAmount <= 0) {
      newErrors.loanAmount = "Loan amount must be greater than 0";
    }
    if (!financialInfo.loanPurpose.trim()) {
      newErrors.loanPurpose = "Loan purpose is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validatePersonalInfo();
        if (isValid) {
          dispatch(updatePersonalInfo(personalInfo));
        }
        break;
      case 2:
        isValid = validateFinancialInfo();
        if (isValid) {
          dispatch(updateFinancialInfo(financialInfo));
        }
        break;
      case 3:
        isValid = documents.length > 0;
        if (isValid) {
          documents.forEach((doc) => dispatch(addDocument(doc)));
        } else {
          setErrors({ documents: "At least one document is required" });
        }
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      dispatch(setCurrentStep(currentStep + 1));
    }
  };

  const handleBack = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  const handleSubmit = async () => {
    try {
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const loanData = {
        userId: user.uid,
        personalInfo,
        financialInfo,
        documents,
      };

      await saveLoanApplication(loanData);
      dispatch(submitApplication());
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting loan application:", error);
      // You might want to show an error message to the user here
    }
  };

  const renderProgressBar = () => {
    return (
      <div className="progress-bar">
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`progress-step ${
                currentStep >= index + 1 ? "active" : ""
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="progress-bar-container">
          {steps.map((_, index) => (
            <div
              key={index}
              className="progress-bar-fill"
              style={{
                width: `${100 / steps.length}%`,
                marginLeft: `${(index * 100) / steps.length}%`,
                display: currentStep >= index + 1 ? "block" : "none",
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={personalInfo.fullName}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, fullName: e.target.value })
                }
                className={errors.fullName ? "form-input-error" : ""}
              />
              {errors.fullName && (
                <p className="form-error">{errors.fullName}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, email: e.target.value })
                }
                className={errors.email ? "form-input-error" : ""}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={personalInfo.phone}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, phone: e.target.value })
                }
                className={errors.phone ? "form-input-error" : ""}
              />
              {errors.phone && <p className="form-error">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                value={personalInfo.dateOfBirth}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    dateOfBirth: e.target.value,
                  })
                }
                className={errors.dateOfBirth ? "form-input-error" : ""}
              />
              {errors.dateOfBirth && (
                <p className="form-error">{errors.dateOfBirth}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                value={personalInfo.address}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, address: e.target.value })
                }
                rows={3}
                className={errors.address ? "form-input-error" : ""}
              />
              {errors.address && <p className="form-error">{errors.address}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="employmentStatus">Employment Status</label>
              <select
                id="employmentStatus"
                value={financialInfo.employmentStatus}
                onChange={(e) =>
                  setFinancialInfo({
                    ...financialInfo,
                    employmentStatus: e.target.value,
                  })
                }
                className={errors.employmentStatus ? "form-input-error" : ""}
              >
                <option value="">Select status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="business-owner">Business Owner</option>
                <option value="retired">Retired</option>
              </select>
              {errors.employmentStatus && (
                <p className="form-error">{errors.employmentStatus}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="monthlyIncome">Monthly Income</label>
              <div className="input-with-prefix">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  id="monthlyIncome"
                  value={financialInfo.monthlyIncome}
                  onChange={(e) =>
                    setFinancialInfo({
                      ...financialInfo,
                      monthlyIncome: +e.target.value,
                    })
                  }
                  className={errors.monthlyIncome ? "form-input-error" : ""}
                />
              </div>
              {errors.monthlyIncome && (
                <p className="form-error">{errors.monthlyIncome}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="loanAmount">Loan Amount</label>
              <div className="input-with-prefix">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  id="loanAmount"
                  value={financialInfo.loanAmount}
                  onChange={(e) =>
                    setFinancialInfo({
                      ...financialInfo,
                      loanAmount: +e.target.value,
                    })
                  }
                  className={errors.loanAmount ? "form-input-error" : ""}
                />
              </div>
              {errors.loanAmount && (
                <p className="form-error">{errors.loanAmount}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="loanPurpose">Loan Purpose</label>
              <select
                id="loanPurpose"
                value={financialInfo.loanPurpose}
                onChange={(e) =>
                  setFinancialInfo({
                    ...financialInfo,
                    loanPurpose: e.target.value,
                  })
                }
                className={errors.loanPurpose ? "form-input-error" : ""}
              >
                <option value="">Select purpose</option>
                <option value="home">Home Purchase</option>
                <option value="car">Vehicle Purchase</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="personal">Personal</option>
              </select>
              {errors.loanPurpose && (
                <p className="form-error">{errors.loanPurpose}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="loanTerm">Loan Term (months)</label>
              <select
                id="loanTerm"
                value={financialInfo.loanTerm}
                onChange={(e) =>
                  setFinancialInfo({
                    ...financialInfo,
                    loanTerm: +e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
                <option value="48">48 months</option>
                <option value="60">60 months</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="upload-area">
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setDocuments([
                      ...documents,
                      {
                        id: crypto.randomUUID(),
                        name: file.name,
                        status: "pending",
                        url: URL.createObjectURL(file),
                      },
                    ]);
                  }
                }}
                multiple
              />
              <label htmlFor="fileUpload">
                <svg
                  className="upload-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="upload-title">Upload documents</span>
                <span className="upload-subtitle">
                  Drag and drop or click to select files
                </span>
              </label>
            </div>

            {documents.length > 0 && (
              <div className="document-list">
                <h4>Uploaded Documents</h4>
                <ul>
                  {documents.map((doc) => (
                    <li key={doc.id} className="document-item">
                      <div className="document-name">
                        <svg
                          className="document-icon"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{doc.name}</span>
                      </div>
                      <div>
                        <span
                          className={`document-status status-${doc.status}`}
                        >
                          {doc.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {errors.documents && (
              <p className="form-error">{errors.documents}</p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Application Summary
                </h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Full Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {personalInfo.fullName}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {personalInfo.email}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {personalInfo.phone}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {personalInfo.dateOfBirth}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {personalInfo.address}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Employment Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {financialInfo.employmentStatus}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Monthly Income
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      ${financialInfo.monthlyIncome.toLocaleString()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Loan Amount
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      ${financialInfo.loanAmount.toLocaleString()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Loan Term
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {financialInfo.loanTerm} months
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Documents
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {documents.length} document(s) uploaded
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <h2>Loan Application</h2>

        {renderProgressBar()}

        <form onSubmit={(e) => e.preventDefault()}>
          {renderStepContent()}

          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
            )}

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="ml-auto bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
