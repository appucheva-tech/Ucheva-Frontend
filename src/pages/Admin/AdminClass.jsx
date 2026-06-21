import React, { useState, useEffect } from "react";
import "./AdminClass.css";
import Ifeanacho from "../../assets/Ifeanacho.jpg";
import { apiClient } from "../../config/AxiosInstance";
import { useSelector } from "react-redux";

const AdminClass = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const token = useSelector((state) => state?.user?.token);

  const [teachers, setTeachers] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [formData, setFormData] = useState({
    className: "",
    amount: "",
    paymentOption: "",
    teacherId: "",
    numberOfInstallments: "",
  });

  const createClass = async () => {
    try {
      const payload = {
        className: formData.className,
        amount: Number(formData.amount),
        paymentOption: formData.paymentOption.trim().toLowerCase(),
        numberOfInstallments:
          formData.paymentOption === "installment"
            ? Number(formData.numberOfInstallments)
            : 4,
      };

      if (formData.teacherId) {
        payload.teacherId = formData.teacherId;
      }

      console.log("Payload:", payload);

      await apiClient.post("/class/create-class", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        className: "",
        amount: "",
        paymentOption: "",
        teacherId: "",
        numberOfInstallments: "",
      });

      setIsOpen(false);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  const classData = [];

  return (
    <>
      <div className="tableContainer">
        <div className="headerRow">
          <div>
            <h1 className="title">Class Management</h1>
            <p className="subtitle">
              Create classes, assign class teachers and manage class
              information.
            </p>
          </div>
          <button className="addClassBtn" onClick={() => setIsOpen(true)}>
            <span className="plusIcon">+</span> Add Class
          </button>
        </div>

        <div className="filterSection">
          <div className="filterGroup">
            <label className="filterLabel">Section</label>
            <div className="selectWrapper">
              <select className="selectInput" defaultValue="all">
                <option value="all">All Sections</option>
                <option value="">Nursery</option>
                <option value="">Primary</option>
                <option value="">Junior Secondary</option>
                <option value="">Senior Secondary</option>
              </select>
            </div>
          </div>
          <button className="resetBtn">
            <svg
              className="resetIcon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            Reset
          </button>
        </div>

        <div className="tableWrapper">
          <table className="classTable">
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Section</th>
                <th>Class Teacher</th>
                <th>Total Student</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((cls, index) => (
                <tr key={index}>
                  <td className="className textLink">{cls.name}</td>
                  <td className="sectionText">{cls.section}</td>
                  <td className="teacherText textLink">{cls.teacher}</td>
                  <td className="studentText textLink">{cls.students}</td>
                  <td>
                    <div className="actionButtons">
                      <button
                        className="editBtn"
                        onClick={() => setIsEditOpen(true)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        className="deleteBtn"
                        onClick={() => setIsDeleteOpen(true)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="paginationRow">
            <div className="paginationInfo">Showing pages of 1 to 7</div>

            <div className="paginationControls">
              <button className="arrowBtn" disabled>
                &lt;
              </button>
              <button className="pageBtn activePage">1</button>
              <button className="pageBtn">2</button>
              <button className="pageBtn">3</button>
              <span className="ellipsis">...</span>
              <button className="pageBtn">6</button>
              <button className="pageBtn">7</button>
              <button className="arrowBtn">&gt;</button>
            </div>

            <div className="rowsPerPageGroup">
              <span className="rowsLabel">Rows per page</span>
              <div className="rowsSelectWrapper">
                <select className="rowsSelect" defaultValue="10">
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <footer className="footerRow">
          <span className="copyrightText">
            ©️ 2026 Ucheva school operating management system . All right
            reserved.
          </span>
          <span className="supportText">
            Need help?{" "}
            <a href="#support" className="supportLink">
              Contact support
            </a>
          </span>
        </footer>
      </div>

      {isOpen && (
        <div className="modalOverlay" onClick={() => setIsOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h2>Add New Class</h2>
              <button className="closeBtn" onClick={() => setIsOpen(false)}>
                &times;
              </button>
            </div>
            <div className="modalBody">
              <div className="inputGroup">
                <label>Class Name</label>
                <input
                  type="text"
                  name="className"
                  placeholder="e.g. SS 1A"
                  value={formData.className}
                  onChange={handleChange}
                />
              </div>

              <div className="inputGroup">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter class fee"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="inputGroup">
                <label>Payment Option</label>

                <div className="modalSelectWrapper">
                  <select
                    name="paymentOption"
                    value={formData.paymentOption}
                    onChange={handleChange}
                  >
                    <option value="">Select Payment Option</option>

                    <option value="Full Payment">Full Payment</option>

                    <option value="Installment">Installment</option>
                  </select>
                </div>
              </div>

              {formData.paymentOption === "Installment" && (
                <>
                  <div className="inputGroup">
                    <label>Number Of Installments</label>

                    <div className="modalSelectWrapper">
                      <select
                        name="numberOfInstallments"
                        value={formData.numberOfInstallments}
                        onChange={handleChange}
                      >
                        <option value="">Select Number</option>

                        <option value="2">2</option>

                        <option value="3">3</option>

                        <option value="4">4</option>
                      </select>
                    </div>
                  </div>

                  {formData.numberOfInstallments && formData.amount && (
                    <span className="inputHelp">
                      Each installment: ₦
                      {(
                        Number(formData.amount) /
                        Number(formData.numberOfInstallments)
                      ).toLocaleString()}
                    </span>
                  )}
                </>
              )}

              <div className="inputGroup">
                <label>Assign Class Teacher</label>

                <div className="modalSelectWrapper">
                  <select
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleChange}
                  >
                    <option value="">Search and select a teacher</option>

                    {Array.isArray(teachers) &&
                      teachers.map((staff) => (
                        <option key={staff.id} value={staff.id}>
                          {staff.fullName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button className="createBtn" onClick={createClass}>
                Create Class
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="modalOverlay" onClick={() => setIsEditOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h2>Edit Class</h2>
              <button className="closeBtn" onClick={() => setIsEditOpen(false)}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ width: "18px", height: "18px" }}
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="modalBody">
              <div className="inputGroup">
                <label>Class Name</label>

                <input
                  type="text"
                  name="className"
                  placeholder="e.g SS 1A"
                  value={formData.className}
                  onChange={handleChange}
                />
              </div>

              <div className="inputGroup">
                <label>Amount</label>

                <input
                  type="number"
                  name="amount"
                  placeholder="Enter class fee"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="inputGroup">
                <label>Payment Option</label>

                <div className="modalSelectWrapper">
                  <select
                    name="paymentOption"
                    value={formData.paymentOption}
                    onChange={handleChange}
                  >
                    <option value="">Select Payment Option</option>

                    <option value="Full Payment">Full Payment</option>

                    <option value="Installment">Installment</option>
                  </select>
                </div>
              </div>

              {formData.paymentOption === "Installment" && (
                <>
                  <div className="inputGroup">
                    <label>Payment Option</label>

                    <div className="modalSelectWrapper">
                      <select
                        name="paymentOption"
                        value={formData.paymentOption}
                        onChange={handleChange}
                      >
                        <option value="">Select Payment Option</option>
                        <option value="full">Full Payment</option>
                        <option value="installment">Installment</option>
                      </select>
                    </div>
                  </div>

                  {formData.numberOfInstallments && formData.amount && (
                    <div className="inputHelp">
                      Each installment: ₦
                      {(
                        Number(formData.amount) /
                        Number(formData.numberOfInstallments)
                      ).toLocaleString()}
                    </div>
                  )}
                </>
              )}

              <div className="inputGroup">
                <label>Assign Class Teacher</label>

                <div className="modalSelectWrapper">
                  <select
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleChange}
                  >
                    <option value="">Search and select teacher</option>

                    {teachers.map((staff) => (
                      <option
                        key={staff.id || staff._id}
                        value={staff.id || staff._id}
                      >
                        {staff.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <button
                className="cancelBtn"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </button>
              <button className="saveChangesBtn">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="modalOverlay" onClick={() => setIsDeleteOpen(false)}>
          <div
            className="modalContent deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHeader">
              <h2>Delete Class</h2>
              <button
                className="closeBtn"
                onClick={() => setIsDeleteOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ width: "18px", height: "18px" }}
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="modalBody">
              <p className="deleteWarningText">
                Are you sure you want to delete this class? This action cannot
                be undone.
              </p>
            </div>
            <div className="modalFooter">
              <button
                className="cancelBtn"
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </button>
              <button className="confirmDeleteBtn">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminClass;
