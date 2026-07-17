import React, { useEffect, useState } from "react";
import "./Score.css";
import { apiClient } from "../../../../config/AxiosInstance";
import { toast } from "react-toastify";
const Score = () => {
  const [subjects, setSubjects] = useState([]);
  const [groupedSubject, setGroupedSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState({});
    const [seeScores, setSeeScores] = useState([])
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [selectedSubjectEntries, setSelectedSubjectEntries] = useState([]);

useEffect(() => {
  getSubjects();
  getScores(); // ✅ VERY IMPORTANT
}, []);

useEffect(() => {
  if (!students.length || !seeScores.length || !selectedSubject) return;

  console.log("🔥 Running prefill");

  const getKey = (obj) => obj.id;

  const scoreMap = {};

  seeScores.forEach((s) => {
    if (s.subject === selectedSubject.subjectName) {
      const key = getKey(s);
      scoreMap[key] = {
        ca: s.continuousAssessment,
        exam: s.exam,
      };
    }
  });

  const newScores = {};

  students.forEach((student) => {
    const key = getKey(student);

    newScores[key] = {
      ca: scoreMap[key]?.ca ?? "",
      exam: scoreMap[key]?.exam ?? "",
    };
  });


  setScores(newScores);

  

}, [students, seeScores, selectedSubject]);
  // =========================
  // FETCH SUBJECTS
  // =========================
   const getSubjects = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/classteacher/get-all-subjects");

      const data = res.data.subjects;


      const grouped = groupSubjectsByName(data);
setGroupedSubjects(grouped);


        fetchSubject(data[0]);


    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubject = async (subject) => {
    try {
      setLoading(true);
  
      const res = await apiClient.get(
        `/classteacher/get-students/${subject.classId}`
      );
  
      const list = res.data.getStudents || [];
  
      // 2. FILTER scores for this subject
  
    
  // const scoreMap = {};
  
  // seeScores.forEach((s) => {
  //   if (s.subject === subject.subjectName) {
  //     scoreMap[s.studentId] = {
  //       ca: s.continuousAssessment,
  //       exam: s.exam,
  //     };
  //   }
  // });
  //     // 4. Merge with students (PREFILL)
  //     const finalMap = {};
  //     list.forEach((student) => {
  //       const id = student.id;
  
  //       finalMap[id] = {
  //         ca: scoreMap[id]?.ca ?? "",
  //         exam: scoreMap[id]?.exam ?? "",
  //       };
  //     });
  
  //     // 5. Set state
      setSelectedSubject(subject);
      setStudents(list);
      // setScores(finalMap);
      setCurrentPage(1);
  
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
const getScores = async () => {
  try {
    const res = await apiClient.get(
              `/classteacher/getscores/`

    );

    setSeeScores(res.data.scores || []);
  } catch (err) {
    console.log(err);
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

    // ⚠️ DO NOT trigger side effects here
    handleClassSelectionChange(subjectName, newSelected);

    return newSelected;
  });
};
const handleClassSelectionChange = (subjectName, selectedClassesList) => {
  const subjectGroup = groupedSubject.find(
    g => g.subjectName === subjectName
  );

  if (!subjectGroup) return;

  const relevantEntries = subjectGroup.entries.filter(entry =>
    entry.applicableClasses &&
    entry.applicableClasses.some(cls =>
      selectedClassesList.includes(cls)
    )
  );

  setSelectedSubjectEntries(relevantEntries);

  if (relevantEntries.length > 0) {
    fetchStudentsForClasses(relevantEntries);
  } else {
    setStudents([]);
    setScores({});
  }
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
          `/classteacher/get-students/${entry.classId}`
        );
        const data = res.data.getStudents;
        

if (Array.isArray(data)) {
  const studentsWithClass = data.map(student => ({
    
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
      

      

      // =========================
// PREFILL SCORES FROM API
// =========================



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
  const val = Number(value);

  if (field === "continuousAssessment" && val > 40) return;
  if (field === "exam" && val > 60) return;

  setScores(prev => ({
    ...prev,
    [studentId]: {
      ...prev[studentId],
      [field]: val
    }
  }));
};
  // =========================
  // SAVE SCORES
  // =========================



const handleSaveScores = async () => {
  try {
    setSaving(true);

    // ✅ Validate scores first
    const isInvalid = Object.values(scores).some(
      (s) => Number(s.ca) > 40 || Number(s.exam) > 60
    );

    if (isInvalid) {
      toast.error("Fix invalid scores before saving");
      setSaving(false); // ✅ FIX
      return;
    }

    // ✅ Ensure subject entry exists
const subjectId =
  selectedSubject?.entries?.find(e => e.id)?.id;
    if (!subjectId) {
      toast.error("No subject selected");
      setSaving(false);
      return;
    }

    // ✅ Build payload
    const payload = {
      subject: selectedSubject?.subjectName,
      score: Object.keys(scores).map((id) => ({
        studentId: id,
        continuousAssessment: Number(scores[id]?.ca || 0),
        exam: Number(scores[id]?.exam || 0),
      })),
    };
console.log("mr p: ",payload)
    // ✅ API call
    const res = await apiClient.post(
      `/classteacher/mark-score/${subjectId}`,
      payload
    );

    console.log("Saved:", res.data.message); // ✅ FIXED
    toast.success(res.data.message);

  } catch (err) {
    console.log(err);

    // ✅ SAFE error handling
    toast.error(
      err?.response?.data?.message || "Failed to save scores"
    );

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
    const subjectGroup = groupedSubject.find(g => g.subjectName === subjectName);
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
{
  
groupedSubject.map((group) => (
  <div 
    key={group.subjectName}
    className={`subject-card-wrapper ${
      selectedSubject?.subjectName === group.subjectName ? "active" : ""
    }`}
  >
    <div 
      className="subject-card-header"
 onClick={() => {
  handleSubjectSelect(group);
  toggleSubjectExpansion(group.subjectName);
}}
    >
      <div className="subject-info">
        <div className="subject-name-main">
          {group.subjectName}
        </div>
        <div className="subject-classes-count">
          {group.entries.length} class{group.entries.length > 1 ? 'es' : ''} {/* ✅ FIXED */}
        </div>
      </div>

      <div className="subject-actions">
        <span className="expand-icon">
          {expandedSubjects[group.subjectName] ? '▼' : '▶'}
        </span>
      </div>
    </div>
    
{expandedSubjects[group.subjectName] && (
  <div className="subject-card-body">
    <div className="classes-list">
      {group.entries.map((entry) =>
        entry.applicableClasses?.map((className, idx) => {
          const key = `${entry.id}-${className}`;
          const isChecked = selectedClasses.includes(className);

          return (
            <div key={key}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() =>
                  toggleClassSelection(group.subjectName, className)
                }
              />
              <label>{className}</label>
            </div>
          );
        })
      )}
    </div>
  </div>
)}
  </div>
))
        
        }
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
          // disabled={saving || selectedClasses.length === 0 || students.length === 0}
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
                    <td>{student.studentClass || 'N/A'}</td>
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


