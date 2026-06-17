import React, { useState, useEffect, useRef } from "react";
import "../styles/class-step.css";

const ClassesStep = ({ formData, setFormData }) => {
  const allSections = [
    { id: "nursery", label: "Nursery" },
    { id: "primary", label: "Primary" },
    { id: "secondary", label: "Secondary" },
  ];

  // Definitive chronological lists of all options for each section
  const sectionOptionsData = {
    nursery: [
      { value: "Creche", label: "Creche" },
      { value: "Nursery 1", label: "Nursery 1" },
      { value: "Nursery 2", label: "Nursery 2" },
      { value: "Nursery 3", label: "Nursery 3" },
    ],
    primary: [
      { value: "Primary 1", label: "Primary 1" },
      { value: "Primary 2", label: "Primary 2" },
      { value: "Primary 3", label: "Primary 3" },
      { value: "Primary 4", label: "Primary 4" },
      { value: "Primary 5", label: "Primary 5" },
      { value: "Primary 6", label: "Primary 6" },
    ],
    secondary: [
      { value: "JSS 1", label: "JS1" },
      { value: "JSS 2", label: "JS2" },
      { value: "JSS 3", label: "JS3" },
      { value: "SS 1", label: "SS1" },
      { value: "SS 2", label: "SS2" },
      { value: "SS 3", label: "SS3" },
    ],
    arms: [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
      { value: "D", label: "D" },
    ],
  };

  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const selectedTypesFromStep1 = formData.selectedSchoolTypes || [];
    setFormData((prev) => ({
      ...prev,
      selectedSections: selectedTypesFromStep1,
    }));
  }, [formData.selectedSchoolTypes, setFormData]);

  const handleSelectOption = (section, field, value) => {
    const currentConfig = formData.classConfig?.[section] || {};
    let updatedConfig = { ...currentConfig, [field]: value };

    // RANGE VALIDATION ENGINE: If changing the start selection pushes it past or equal to the end selection,
    // automatically shift the end selection forward to keep it valid.
    if (field === "classFrom" || field === "armFrom") {
      const endField = field === "classFrom" ? "classTo" : "armTo";
      const fullOptionsList =
        field === "classFrom"
          ? sectionOptionsData[section]
          : sectionOptionsData.arms;

      const currentEndValue = currentConfig[endField];
      const startIndex = fullOptionsList.findIndex(
        (opt) => opt.value === value,
      );
      const endIndex = fullOptionsList.findIndex(
        (opt) => opt.value === currentEndValue,
      );

      if (endIndex <= startIndex && currentEndValue !== "") {
        // Fallback target: pick the immediate next option if available
        const nextValidOption = fullOptionsList[startIndex + 1];
        updatedConfig[endField] = nextValidOption
          ? nextValidOption.value
          : value;
      }
    }

    setFormData({
      ...formData,
      classConfig: {
        ...formData.classConfig,
        [section]: updatedConfig,
      },
    });
    setActiveDropdown(null);
  };

  const activeSections = formData.selectedSections || [];

  const renderCustomDropdown = (section, field, options, defaultValue) => {
    const currentValue =
      formData.classConfig?.[section]?.[field] ?? defaultValue;
    const isOpen = activeDropdown === `${section}-${field}`;

    return (
      <div className="custom-dropdown-container">
        <button
          type="button"
          className={`custom-dropdown-trigger ${isOpen ? "is-active" : ""}`}
          onClick={() =>
            setActiveDropdown(isOpen ? null : `${section}-${field}`)
          }
        >
          <span>
            {options.find((o) => o.value === currentValue)?.label ||
              currentValue ||
              "Select"}
          </span>
          <span className={`custom-dropdown-arrow ${isOpen ? "rotated" : ""}`}>
            ▼
          </span>
        </button>

        {isOpen && (
          <ul className="custom-dropdown-options-list">
            {options.map((opt) => (
              <li
                key={opt.value}
                className={`custom-dropdown-item ${currentValue === opt.value ? "is-selected" : ""}`}
                onClick={() => handleSelectOption(section, field, opt.value)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="classes-step-container" ref={dropdownRef}>
      <div>
        <label className="section-label-heading">Selected School Types</label>
        <p className="section-hint-subtext">
          These sections are loaded from your selections in Step 1.
        </p>

        <div
          className="chips-selection-row"
          style={{ pointerEvents: "none", opacity: 0.8 }}
        >
          {allSections.map((sec) => {
            const isChecked = activeSections.includes(sec.id);
            return (
              <label
                key={sec.id}
                className={`section-chip-label ${isChecked ? "is-checked" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled
                  readOnly
                  className="section-chip-checkbox-input"
                />
                {sec.label}
              </label>
            );
          })}
        </div>
      </div>

      {/* Dynamic Nursery Settings Card */}
      {activeSections.includes("nursery") &&
        (() => {
          const fullOptions = sectionOptionsData.nursery;
          const currentStartValue =
            formData.classConfig?.nursery?.classFrom || "Creche";
          const startIndex = fullOptions.findIndex(
            (opt) => opt.value === currentStartValue,
          );

          // Filter options for classTo: must be strictly index greater than the selected classFrom
          const filteredEndOptions = fullOptions.slice(startIndex + 1);

          return (
            <div className="config-section-card">
              <div className="config-card-header">
                <h3 className="config-card-title">Nursery Section</h3>
              </div>
              <div className="config-card-body">
                <div className="config-fields-grid">
                  <div className="field-control-element">
                    <label className="field-input-title">Classes</label>
                    <div className="selector-range-pipeline">
                      {renderCustomDropdown(
                        "nursery",
                        "classFrom",
                        fullOptions,
                        "Creche",
                      )}
                      <span className="range-separator-text">to</span>
                      {renderCustomDropdown(
                        "nursery",
                        "classTo",
                        filteredEndOptions.length > 0
                          ? filteredEndOptions
                          : [fullOptions[fullOptions.length - 1]],
                        "Nursery 3",
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

      {/* Dynamic Primary Settings Card */}
      {activeSections.includes("primary") &&
        (() => {
          const fullOptions = sectionOptionsData.primary;
          const currentStartValue =
            formData.classConfig?.primary?.classFrom || "Primary 1";
          const startIndex = fullOptions.findIndex(
            (opt) => opt.value === currentStartValue,
          );
          const filteredEndOptions = fullOptions.slice(startIndex + 1);

          // Arms filter setup
          const armsOptions = sectionOptionsData.arms;
          const currentStartArm = formData.classConfig?.primary?.armFrom || "A";
          const startArmIndex = armsOptions.findIndex(
            (opt) => opt.value === currentStartArm,
          );
          const filteredEndArms = [
            { value: "", label: "Select" },
            ...armsOptions.slice(startArmIndex + 1),
          ];

          return (
            <div className="config-section-card">
              <div className="config-card-header">
                <h3 className="config-card-title">Primary Section</h3>
              </div>
              <div className="config-card-body">
                <div className="config-fields-grid">
                  <div className="field-control-element">
                    <label className="field-input-title">Classes</label>
                    <div className="selector-range-pipeline">
                      {renderCustomDropdown(
                        "primary",
                        "classFrom",
                        fullOptions,
                        "Primary 1",
                      )}
                      <span className="range-separator-text">to</span>
                      {renderCustomDropdown(
                        "primary",
                        "classTo",
                        filteredEndOptions.length > 0
                          ? filteredEndOptions
                          : [fullOptions[fullOptions.length - 1]],
                        "Primary 6",
                      )}
                    </div>
                  </div>

                  <div className="field-control-element">
                    <label className="field-input-title">
                      Arms <span className="optional-tag-span">(Optional)</span>
                    </label>
                    <div className="selector-range-pipeline">
                      {renderCustomDropdown(
                        "primary",
                        "armFrom",
                        armsOptions,
                        "A",
                      )}
                      <span className="range-separator-text">to</span>
                      {renderCustomDropdown(
                        "primary",
                        "armTo",
                        filteredEndArms,
                        "",
                      )}
                    </div>
                  </div>
                </div>
                <p className="card-footer-tip-text">
                  Leave empty if there are no arms.
                </p>
              </div>
            </div>
          );
        })()}

      {/* Dynamic Secondary Settings Card */}
      {activeSections.includes("secondary") &&
        (() => {
          const fullOptions = sectionOptionsData.secondary;
          const currentStartValue =
            formData.classConfig?.secondary?.classFrom || "JS1";
          const startIndex = fullOptions.findIndex(
            (opt) => opt.value === currentStartValue,
          );
          const filteredEndOptions = fullOptions.slice(startIndex + 1);

          // Arms filter setup
          const armsOptions = sectionOptionsData.arms;
          const currentStartArm =
            formData.classConfig?.secondary?.armFrom || "A";
          const startArmIndex = armsOptions.findIndex(
            (opt) => opt.value === currentStartArm,
          );
          const filteredEndArms = [
            { value: "", label: "Select" },
            ...armsOptions.slice(startArmIndex + 1),
          ];

          return (
            <div className="config-section-card">
              <div className="config-card-header">
                <h3 className="config-card-title">Secondary Section</h3>
              </div>
              <div className="config-card-body">
                <div className="config-fields-grid">
                  <div className="field-control-element">
                    <label className="field-input-title">Classes</label>
                    <div className="selector-range-pipeline">
                      {renderCustomDropdown(
                        "secondary",
                        "classFrom",
                        fullOptions,
                        "JS1",
                      )}
                      <span className="range-separator-text">to</span>
                      {renderCustomDropdown(
                        "secondary",
                        "classTo",
                        filteredEndOptions.length > 0
                          ? filteredEndOptions
                          : [fullOptions[fullOptions.length - 1]],
                        "SS3",
                      )}
                    </div>
                  </div>

                  <div className="field-control-element">
                    <label className="field-input-title">
                      Arms <span className="optional-tag-span">(Optional)</span>
                    </label>
                    <div className="selector-range-pipeline">
                      {renderCustomDropdown(
                        "secondary",
                        "armFrom",
                        armsOptions,
                        "A",
                      )}
                      <span className="range-separator-text">to</span>
                      {renderCustomDropdown(
                        "secondary",
                        "armTo",
                        filteredEndArms,
                        "",
                      )}
                    </div>
                  </div>
                </div>
                <p className="card-footer-tip-text">
                  Leave empty if there are no arms.
                </p>
              </div>
            </div>
          );
        })()}

      <div className="info-notification-banner">
        <span className="info-bullet-badge">i</span>
        <p className="info-banner-body-paragraph">
          Don't worry, you can add, edit or remove classes anytime later in
          settings.
        </p>
      </div>
    </div>
  );
};

export default ClassesStep;