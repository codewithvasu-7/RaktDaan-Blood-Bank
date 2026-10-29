import React, { useState } from "react";
import { Link } from "react-router-dom";

const EligibilityQuiz = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    age: null,
    weight: null,
    lastDonated: null,
    health: null,
  });
  const [result, setResult] = useState(null);

  const handleAnswer = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Evaluate eligibility
      const isEligible =
        updated.age === true &&
        updated.weight === true &&
        (updated.lastDonated === "never" || updated.lastDonated === "over_90") &&
        updated.health === true;

      setResult({
        eligible: isEligible,
        reasons: [
          !updated.age && "Age must be between 18 and 65 years.",
          !updated.weight && "Body weight must be at least 45 kg.",
          updated.lastDonated === "under_90" && "Minimum 90 days gap required between whole blood donations.",
          !updated.health && "You must be free from fever/antibiotics or recent tattoo/surgery (6 months).",
        ].filter(Boolean),
      });
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ age: null, weight: null, lastDonated: null, health: null });
    setResult(null);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
      <div className="bg-danger text-white p-4 text-center">
        <span className="badge bg-light text-danger fw-bold mb-2">QUICK 60-SECOND CHECKER</span>
        <h3 className="fw-bold mb-1">🩸 Can I Donate Blood Today?</h3>
        <p className="small text-white-50 mb-0">
          Check your voluntary blood donation eligibility based on National Blood Transfusion Council guidelines.
        </p>
      </div>

      <div className="card-body p-4 p-md-5">
        {!result ? (
          <div>
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="d-flex justify-content-between small text-muted mb-1">
                <span>Step {step} of 4</span>
                <span>{step * 25}% Completed</span>
              </div>
              <div className="progress" style={{ height: "6px" }}>
                <div
                  className="progress-bar bg-danger"
                  style={{ width: `${step * 25}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1: Age */}
            {step === 1 && (
              <div className="text-center py-3">
                <div className="display-4 text-danger mb-3">🎂</div>
                <h4 className="fw-bold text-dark mb-2">Are you between 18 and 65 years old?</h4>
                <p className="text-muted small mb-4">
                  Indian NBTC regulations allow voluntary donors aged 18 to 65.
                </p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-3">
                  <button
                    className="btn btn-outline-danger btn-lg px-4 fw-semibold"
                    onClick={() => handleAnswer("age", true)}
                  >
                    Yes, I am (18 - 65)
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-lg px-4"
                    onClick={() => handleAnswer("age", false)}
                  >
                    No, I am Under 18 or 65+
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Weight */}
            {step === 2 && (
              <div className="text-center py-3">
                <div className="display-4 text-danger mb-3">⚖️</div>
                <h4 className="fw-bold text-dark mb-2">Is your body weight 45 kg (100 lbs) or more?</h4>
                <p className="text-muted small mb-4">
                  For your safety and standard 350ml donation, minimum weight of 45 kg is required.
                </p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-3">
                  <button
                    className="btn btn-outline-danger btn-lg px-4 fw-semibold"
                    onClick={() => handleAnswer("weight", true)}
                  >
                    Yes, 45 kg or Above
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-lg px-4"
                    onClick={() => handleAnswer("weight", false)}
                  >
                    No, Under 45 kg
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Last Donation */}
            {step === 3 && (
              <div className="text-center py-3">
                <div className="display-4 text-danger mb-3">📅</div>
                <h4 className="fw-bold text-dark mb-2">When was your last blood donation?</h4>
                <p className="text-muted small mb-4">
                  Red blood cells take up to 90 days to completely replenish.
                </p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                  <button
                    className="btn btn-outline-danger btn-lg px-3 fw-semibold"
                    onClick={() => handleAnswer("lastDonated", "never")}
                  >
                    First Time Donor (Never)
                  </button>
                  <button
                    className="btn btn-outline-danger btn-lg px-3 fw-semibold"
                    onClick={() => handleAnswer("lastDonated", "over_90")}
                  >
                    More than 3 Months Ago
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-lg px-3"
                    onClick={() => handleAnswer("lastDonated", "under_90")}
                  >
                    Within Last 90 Days
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Health Status */}
            {step === 4 && (
              <div className="text-center py-3">
                <div className="display-4 text-danger mb-3">🩺</div>
                <h4 className="fw-bold text-dark mb-2">Are you feeling healthy & fit today?</h4>
                <p className="text-muted small mb-4">
                  No active fever, flu, current antibiotics, and no new tattoo or major surgery in the last 6 months.
                </p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-3">
                  <button
                    className="btn btn-outline-danger btn-lg px-4 fw-semibold"
                    onClick={() => handleAnswer("health", true)}
                  >
                    Yes, I am Healthy & Fit
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-lg px-4"
                    onClick={() => handleAnswer("health", false)}
                  >
                    No, Currently Unwell / Recent Tattoo
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="text-center py-3">
            {result.eligible ? (
              <div>
                <div className="display-3 text-success mb-3">🎉</div>
                <span className="badge bg-success bg-opacity-10 text-success fs-6 px-3 py-2 mb-2">
                  ✓ 100% ELIGIBLE TO DONATE
                </span>
                <h3 className="fw-bold text-dark mb-2">You Can Save a Life Today!</h3>
                <p className="text-muted mx-auto mb-4" style={{ maxWidth: "520px" }}>
                  Great news! You meet all health criteria to donate blood. Every single donation can save up to three lives in emergency road accidents and surgeries.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Link to="/donation-camps" className="btn btn-danger btn-lg px-4 shadow-sm fw-bold">
                    🏕️ Find Nearest Donation Camp
                  </Link>
                  <Link to="/register" className="btn btn-outline-dark btn-lg px-4 fw-semibold">
                    Register as Voluntary Donor
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="display-3 text-warning mb-3">⏳</div>
                <span className="badge bg-warning bg-opacity-25 text-dark fs-6 px-3 py-2 mb-2">
                  DEFERRED TEMPORARILY
                </span>
                <h3 className="fw-bold text-dark mb-2">Please Wait a Little Longer to Donate</h3>
                <p className="text-muted mx-auto mb-3" style={{ maxWidth: "520px" }}>
                  Thank you for your noble desire to donate! For your personal safety and patient safety, you should defer donation for now:
                </p>

                <div className="bg-light p-3 rounded-3 text-start mx-auto mb-4" style={{ maxWidth: "480px" }}>
                  <ul className="mb-0 text-secondary small">
                    {result.reasons.map((r, i) => (
                      <li key={i} className="mb-1">{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-outline-danger px-4" onClick={handleReset}>
                    Check Again
                  </button>
                  <Link to="/blood-compatibility" className="btn btn-dark px-4">
                    Learn Compatibility Guide
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibilityQuiz;
