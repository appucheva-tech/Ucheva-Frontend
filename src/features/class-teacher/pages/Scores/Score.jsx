import React from "react";
import "./Score.css";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Score = () => {
  return (
    <main className="CTScoreContainer">
      <article className="CTScoreWrapper">
        <div className="CTScoreHead">
          Scores
          <span>Select a subject and class to enter scores</span>
        </div>
        <div className="CTSubjectsHolder">
          <nav className="CTSubjects">
            Mathematics
            <span>Jss1</span>
          </nav>
          <nav className="CTSubjects">
            English
            <span>Jss1</span>
          </nav>
          <nav className="CTSubjects">
            Civic Education
            <span>Jss1</span>
          </nav>
          <nav className="CTSubjects">
            Basic Science
            <span>Jss1</span>
          </nav>
          <nav className="CTSubjects">
            Social Studies
            <span>Jss1</span>
          </nav>
        </div>
        <section className="CTScoreTable">
          <div className="CTSubjectSave">
            Mathematics - Js1
            <button className="CTSaveBtn">Save Score</button>
          </div>
          <article className="CTActualTable">
            <div className="CTActualTableTop">
              <span className="CTTableContentValue">Student Name</span>
              <span className="CTTableContentValue">Admission Number</span>
              <nav className="CTTableContentScore">
                CA <span>(40 Marks)</span>
              </nav>
              <nav className="CTTableContentScore">
                Exam <span>(60 Marks)</span>
              </nav>
            </div>
            <ul className="CTActualTableInfo">
              <span className="CTTableValueName">Adeaze Clinton</span>
              <span className="CTTableValueName">UCH/2026/001</span>
              <div className="CTCAHolder">
                <input className="CTCA" type="text" placeholder="38" />
              </div>
              <div className="CTCAHolder">
                <input className="CTCA" type="text" placeholder="58" />
              </div>
            </ul>
            <ul className="CTActualTableInfo">
              <span className="CTTableValueName">Adeaze Clinton</span>
              <span className="CTTableValueName">UCH/2026/001</span>
              <div className="CTCAHolder">
                <input className="CTCA" type="text" placeholder="38" />
              </div>
              <div className="CTCAHolder">
                <input className="CTCA" type="text" placeholder="58" />
              </div>
            </ul>
            <ul className="CTActualTableInfo">
              <span className="CTTableValueName">Adeaze Clinton</span>
              <span className="CTTableValueName">UCH/2026/001</span>
              <div className="CTCAHolder">
                <input className="CTCA" type="text" placeholder="38" />
              </div>
              <div className="CTCAHolder">
                <input className="CTCA" type="text" placeholder="58" />
              </div>
            </ul>
            <ul className="CTActualTableInfo">
              <span className="CTTableValueName">Adeaze Clinton</span>
              <span className="CTTableValueName">UCH/2026/001</span>
              <div className="CTCAHolder">
                <input className="CTCA" type="text" placeholder="38" />
              </div>
              <div className="CTCAHolder">
                <input className="CTCA" type="text" placeholder="58" />
              </div>
            </ul>
            <ul className="CTActualTableInfo">
              <span className="CTTableValueName">Adeaze Clinton</span>
              <span className="CTTableValueName">UCH/2026/001</span>
              <div className="CTCAHolder">
                <input className="CTCA" type="text" placeholder="38" />
              </div>
              <div className="CTCAHolder">
                <input className="CTCA" type="text" placeholder="58" />
              </div>
            </ul>
            <div className="pagination">
              <span>Showing pages 1 of 7</span>

              <div className="pages">
                <button>{`<`}</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <span>...</span>
                <button>6</button>
                <button>7</button>
                <button>{`>`}</button>
              </div>
              <nav className="CTPageTypeHolder">
                Rows per page
                <div className="CTPageTypeWrapper">
                  <select className="CTPageType">
                    <option>10</option>
                    <option>20</option>
                  </select>
                </div>
              </nav>
            </div>
          </article>
          <div className="CTScoreCaution">
            <IoIosInformationCircleOutline />
            Enter scores for 1st Term. All changes are auto-saved.
          </div>
        </section>
      </article>
    </main>
  );
};

export default Score;
