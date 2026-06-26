import React, { useEffect, useState } from "react";
import "./Score.css";
import { apiClient } from "../../../../config/AxiosInstance";

const Score = () => {
  const [subjects, setSubjects] = useState([]);
  const [groupedSubjects, setGroupedSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState({});
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [selectedSubjectEntries, setSelectedSubjectEntries] = useState([]);

  useEffect(() => {
    getSubjects();
  }, []);

  // =========================
  // FETCH SUBJECTS
  // =========================
  const getSubjects = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/subjectteacher/get-all-subjects");
      const data = res.data.subjects;
      setSubjects(data);
      
      // Group subjects by name
      const grouped = groupSubjectsByName(data);
      setGroupedSubjects(grouped);
      
      // Auto-expand first subject
      if (grouped.length > 0) {
        setExpandedSubjects({ [grouped[0].subjectName]: true });
        // Auto-select first subject's classes
        handleSubjectSelect(grouped[0]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GROUP SUBJECTS BY NAME
  // =========================
  const groupSubjectsByName = (subjectsArray) => {
    const grouped = {};
    
    subjectsArray.forEach(subject => {
      if (!grouped[subject.subjectName]) {
        grouped[subject.subjectName] = {
          subjectName: subject.subjectName,
          entries: []
        };
      }
      grouped[subject.subjectName].entries.push({
        id: subject.id,
        classId: subject.classId,
        applicableClasses: subject.applicableClasses || [],
        staffId: subject.staffId
      });
    });
    
    return Object.values(grouped);
  };

  // =========================
  // HANDLE SUBJECT SELECT
  // =========================
  const handleSubjectSelect = (groupedSubject) => {
    setSelectedSubject(groupedSubject);
    
    // Get all unique classes from all entries of this subject
    const allClasses = [];
    groupedSubject.entries.forEach(entry => {
      if (entry.applicableClasses && Array.isArray(entry.applicableClasses)) {
        entry.applicableClasses.forEach(cls => {
          if (!allClasses.includes(cls)) {
            allClasses.push(cls);
          }
        });
      }
    });
    
    // Auto-select all classes
    setSelectedClasses(allClasses);
    setSelectedSubjectEntries(groupedSubject.entries);
    
    // Fetch students for all classes
    fetchStudentsForClasses(groupedSubject.entries);
    
    // Expand the subject
    setExpandedSubjects({ [groupedSubject.subjectName]: true });
  };

  // =========================
  // TOGGLE CLASS SELECTION
  // =========================
  const toggleClassSelection = (subjectName, className) => {
    setSelectedClasses(prev => {
      let newSelected;
      if (prev.includes(className)) {
        newSelected = prev.filter(c => c !== className);
      } else {
        newSelected = [...prev, className];
      }
      
      // Update selected entries based on selected classes
      const subjectGroup = groupedSubjects.find(g => g.subjectName === subjectName);
      if (subjectGroup) {
        const relevantEntries = subjectGroup.entries.filter(entry => 
          entry.applicableClasses && 
          entry.applicableClasses.some(cls => newSelected.includes(cls))
        );
        setSelectedSubjectEntries(relevantEntries);
        
        // Fetch students for the newly selected classes
        if (relevantEntries.length > 0) {
          fetchStudentsForClasses(relevantEntries);
        } else {
          setStudents([]);
          setScores({});
        }
      }
      
      return newSelected;
    });
  };

  // =========================
  // TOGGLE SUBJECT EXPANSION
  // =========================
  const toggleSubjectExpansion = (subjectName) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectName]: !prev[subjectName]
    }));
  };

  // =========================
  // FETCH STUDENTS FOR CLASSES
  // =========================
  const fetchStudentsForClasses = async (entries) => {
    try {
      setFetchingStudents(true);
      let allStudents = [];
      
      // Fetch students for each class entry
      for (const entry of entries) {
        const res = await apiClient.get(
          `/subjectteacher/get-students/${entry.classId}`
        );
        const data = res.data.getStudents;
        
        if (data && data.students) {
          // Add class info to each student
          const studentsWithClass = data.students.map(student => ({
            ...student,
            className: entry.applicableClasses && entry.applicableClasses.length > 0 
              ? entry.applicableClasses[0] 
              : 'Unknown Class'
          }));
          allStudents = [...allStudents, ...studentsWithClass];
        }
      }
      
      // Remove duplicates based on studentId
      const uniqueStudents = [];
      const studentIds = new Set();
      allStudents.forEach(student => {
        const id = student.studentId || student.id || student._id;
        if (!studentIds.has(id)) {
          studentIds.add(id);
          uniqueStudents.push(student);
        }
      });
      
      setStudents(uniqueStudents);
      
      // Initialize scores for students
      const map = {};
      uniqueStudents.forEach(s => {
        const id = s.studentId || s.id || s._id;
        map[id] = {
          ca: s.continuousAssessment ?? "",
          exam: s.exam ?? "",
        };
      });
      setScores(map);
      setCurrentPage(1);
      
    } catch (err) {
      console.log(err);
    } finally {
      setFetchingStudents(false);
    }
  };

  // =========================
  // SCORE CHANGE
  // =========================
  const handleScoreChange = (studentId, field, value) => {
    setScores((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  // =========================
  // SAVE SCORES
  // =========================
  const handleSaveScores = async () => {
    try {
      setSaving(true);
      
      // Save scores for each selected class entry
      for (const entry of selectedSubjectEntries) {
        const payload = {
          subject: selectedSubject?.subjectName,
          score: Object.keys(scores).map((id) => ({
            studentId: id,
            continuousAssessment: Number(scores[id]?.ca || 0),
            exam: Number(scores[id]?.exam || 0),
          })),
        };
        
        await apiClient.post(
          `/classteacher/mark-score/${entry.id}`,
          payload
        );
      }
      
      alert("Scores saved successfully for all selected classes");
    } catch (err) {
      console.log(err);
      alert("Failed to save scores");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(students.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedStudents = students.slice(startIndex, startIndex + rowsPerPage);

  // =========================
  // SELECT ALL CLASSES
  // =========================
  const selectAllClasses = (subjectName) => {
    const subjectGroup = groupedSubjects.find(g => g.subjectName === subjectName);
    if (subjectGroup) {
      const allClasses = [];
      subjectGroup.entries.forEach(entry => {
        if (entry.applicableClasses && Array.isArray(entry.applicableClasses)) {
          entry.applicableClasses.forEach(cls => {
            if (!allClasses.includes(cls)) {
              allClasses.push(cls);
            }
          });
        }
      });
      
      setSelectedClasses(allClasses);
      
      // Update entries and fetch students
      setSelectedSubjectEntries(subjectGroup.entries);
      fetchStudentsForClasses(subjectGroup.entries);
    }
  };

  // =========================
  // DESELECT ALL CLASSES
  // =========================
  const deselectAllClasses = (subjectName) => {
    setSelectedClasses([]);
    setSelectedSubjectEntries([]);
    setStudents([]);
    setScores({});
  };

  return (
    <div className="scores-container">
      {/* HEADER */}
      <div className="header-section">
        <h1 className="main-title">Scores</h1>
        <p className="subtitle">Select a subject and choose classes to enter scores</p>
      </div>
      
      {/* SUBJECT CARDS */}
      <div className="subject-cards-container">
        {groupedSubjects.map((groupedSubject) => (
          <div 
            key={groupedSubject.subjectName}
            className={`subject-card-wrapper ${
              selectedSubject?.subjectName === groupedSubject.subjectName ? "active" : ""
            }`}
          >
            <div 
              className="subject-card-header"
              onClick={() => {
                if (selectedSubject?.subjectName !== groupedSubject.subjectName) {
                  handleSubjectSelect(groupedSubject);
                }
                toggleSubjectExpansion(groupedSubject.subjectName);
              }}
            >
              <div className="subject-info">
                <div className="subject-name-main">
                  {groupedSubject.subjectName}
                </div>
                <div className="subject-classes-count">
                  {groupedSubject.entries.length} class{groupedSubject.entries.length > 1 ? 'es' : ''}
                </div>
              </div>
              <div className="subject-actions">
                <span className="expand-icon">
                  {expandedSubjects[groupedSubject.subjectName] ? '▼' : '▶'}
                </span>
              </div>
            </div>
            
            {expandedSubjects[groupedSubject.subjectName] && (
              <div className="subject-card-body">
                <div className="classes-list">
                  {groupedSubject.entries.map((entry, index) => (
                    entry.applicableClasses && entry.applicableClasses.map((className, clsIndex) => {
                      const uniqueKey = `${entry.id}-${clsIndex}`;
                      const isChecked = selectedClasses.includes(className);
                      
                      return (
                        <div key={uniqueKey} className="class-item">
                          <input
                            type="checkbox"
                            id={uniqueKey}
                            checked={isChecked}
                            onChange={() => toggleClassSelection(groupedSubject.subjectName, className)}
                          />
                          <label htmlFor={uniqueKey}>
                            <span className="class-name">{className}</span>
                            <span className="class-id-badge">ID: {entry.id.substring(0, 8)}</span>
                          </label>
                        </div>
                      );
                    })
                  ))}
                </div>
                
                <div className="class-actions">
                  <button 
                    className="select-all-classes-btn"
                    onClick={() => selectAllClasses(groupedSubject.subjectName)}
                  >
                    Select All
                  </button>
                  <button 
                    className="deselect-all-classes-btn"
                    onClick={() => deselectAllClasses(groupedSubject.subjectName)}
                  >
                    Deselect All
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* SELECTED SUBJECT HEADER */}
      <div className="selected-subject-header">
        <div>
          <h2 className="selected-subject-title">
            {selectedSubject ? selectedSubject.subjectName : "Select a subject"}
            {selectedSubject && selectedClasses.length > 0 && (
              <span className="selected-classes-count">
                ({selectedClasses.length} class{selectedClasses.length > 1 ? 'es' : ''} selected)
              </span>
            )}
          </h2>
          {selectedSubject && selectedClasses.length > 0 && (
            <div className="selected-classes-list">
              Selected: {selectedClasses.join(', ')}
            </div>
          )}
        </div>
        <button 
          className="save-button" 
          onClick={handleSaveScores}
          disabled={saving || selectedClasses.length === 0 || students.length === 0}
        >
          {saving ? "Saving..." : "Save Scores"}
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="scores-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Admission Number</th>
              <th>Class</th>
              <th>
                <div className="header-cell">CA</div>
                <div className="header-marks">(40 Marks)</div>
              </th>
              <th>
                <div className="header-cell">Exam</div>
                <div className="header-marks">(60 Marks)</div>
              </th>
            </tr>
          </thead>

          <tbody>
            {fetchingStudents ? (
              <tr>
                <td colSpan={5}>Loading students...</td>
              </tr>
            ) : loading ? (
              <tr>
                <td colSpan={5}>Loading...</td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  {selectedSubject 
                    ? "No students found for selected classes. Please select different classes."
                    : "Please select a subject and classes to view students."}
                </td>
              </tr>
            ) : (
              displayedStudents.map((student) => {
                const id = student.studentId || student.id || student._id;
                return (
                  <tr key={id}>
                    <td className="student-name">{`${student.firstName} ${student.lastName || ''}`}</td>
                    <td className="admission-number">
                      {student.admissionNumber || 'N/A'}
                    </td>
                    <td>{student.className || 'N/A'}</td>
                    <td>
                      <input
                        type="number"
                        className="score-input"
                        value={scores[id]?.ca || ""}
                        onChange={(e) =>
                          handleScoreChange(id, "ca", e.target.value)
                        }
                        min="0"
                        max="40"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="score-input"
                        value={scores[id]?.exam || ""}
                        onChange={(e) =>
                          handleScoreChange(id, "exam", e.target.value)
                        }
                        min="0"
                        max="60"
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {students.length > 0 && (
        <div className="pagination-section">
          <div className="showing-text">
            Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, students.length)} of {students.length} students
          </div>

          <div className="pagination-controls">
            <button
              className="pagination-nav"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {Array.from({ length: totalPages || 1 }, (_, i) => (
              <button
                key={i}
                className={`pagination-number ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="pagination-nav"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>

          <div className="rows-per-page">
            <label>Rows per page</label>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}

      {/* INFO */}
      <div className="info-box">
        <span className="info-icon">ℹ</span>
        <span className="info-text">
          Select a subject, choose the classes you want to manage, enter scores for each student, and click Save Scores.
        </span>
      </div>
    </div>
  );
};

export default Score;