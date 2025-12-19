// import React, { useState } from "react";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../firebase";

// const AdminPanel = () => {
//   const [teams, setTeams] = useState([
//     {
//       id: "team-a",
//       name: "Team A",
//       subName: "Elves",
//       g1: 12,
//       g2: 15,
//       g3: 10,
//       g4: 18,
//     },
//     {
//       id: "team-b",
//       name: "Team B",
//       subName: "Reindeer",
//       g1: 14,
//       g2: 12,
//       g3: 16,
//       g4: 14,
//     },
//     {
//       id: "team-c",
//       name: "Team C",
//       subName: "Snowmen",
//       g1: 10,
//       g2: 10,
//       g3: 12,
//       g4: 10,
//     },
//     {
//       id: "team-d",
//       name: "Team D",
//       subName: "Nutcrackers",
//       g1: 16,
//       g2: 18,
//       g3: 14,
//       g4: 12,
//     },
//   ]);

//   const [saveStatus, setSaveStatus] = useState("");

//   const updateTeam = (index, field, value) => {
//     const updated = [...teams];
//     updated[index][field] = value;
//     setTeams(updated);
//   };

//   // 🔥 SAVE DATA TO FIRESTORE
//   const saveToFirebase = async () => {
//     try {
//       await setDoc(doc(db, "scores", "christmas"), {
//         teams,
//         updatedAt: Date.now(),
//       });

//       setSaveStatus("✅ Scores saved successfully!");
//       setTimeout(() => setSaveStatus(""), 3000);
//     } catch (error) {
//       console.error("Firestore error:", error);
//       setSaveStatus("❌ Error saving scores");
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&family=Poppins:wght@400;600&display=swap');

//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: 'Poppins', sans-serif;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           min-height: 100vh;
//           padding: 20px;
//         }

//         .admin-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           background: white;
//           border-radius: 20px;
//           box-shadow: 0 20px 60px rgba(0,0,0,0.3);
//           padding: 40px;
//         }

//         .header {
//           text-align: center;
//           margin-bottom: 40px;
//           padding-bottom: 20px;
//           border-bottom: 3px solid #667eea;
//         }

//         .header h1 {
//           font-family: 'Mountains of Christmas', cursive;
//           font-size: 3rem;
//           color: #2d3748;
//           margin-bottom: 10px;
//         }

//         .header p {
//           color: #718096;
//           font-size: 1.1rem;
//         }

//         .team-card {
//           background: linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%);
//           border-radius: 15px;
//           padding: 25px;
//           margin-bottom: 25px;
//           border: 2px solid #e2e8f0;
//         }

//         .team-header {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 20px;
//           margin-bottom: 20px;
//         }

//         .input-group {
//           display: flex;
//           flex-direction: column;
//         }

//         .input-group label {
//           font-weight: 600;
//           color: #4a5568;
//           margin-bottom: 8px;
//           font-size: 0.9rem;
//           text-transform: uppercase;
//         }

//         .input-group input {
//           padding: 12px 15px;
//           border: 2px solid #e2e8f0;
//           border-radius: 10px;
//           font-size: 1rem;
//         }

//         .scores-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 15px;
//         }

//         .score-input label {
//           display: block;
//           font-weight: 600;
//           color: #667eea;
//           margin-bottom: 8px;
//           font-size: 0.85rem;
//           text-align: center;
//         }

//         .score-input input {
//           width: 100%;
//           padding: 15px;
//           border: 2px solid #e2e8f0;
//           border-radius: 10px;
//           font-size: 1.4rem;
//           text-align: center;
//           font-weight: 600;
//         }

//         .save-button {
//           width: 100%;
//           padding: 18px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           border: none;
//           border-radius: 15px;
//           font-size: 1.2rem;
//           font-weight: 600;
//           cursor: pointer;
//           margin-top: 30px;
//         }

//         .status-message {
//           text-align: center;
//           margin-top: 20px;
//           font-weight: 600;
//           font-size: 1.1rem;
//         }
//       `}</style>

//       <div className="admin-container">
//         <div className="header">
//           <h1>🎄 Admin Panel</h1>
//           <p>Manage Live Score Card</p>
//         </div>

//         {teams.map((team, index) => (
//           <div key={team.id} className="team-card">
//             <div className="team-header">
//               <div className="input-group">
//                 <label>Team Name</label>
//                 <input
//                   value={team.name}
//                   onChange={(e) => updateTeam(index, "name", e.target.value)}
//                 />
//               </div>
//               <div className="input-group">
//                 <label>Sub Name</label>
//                 <input
//                   value={team.subName}
//                   onChange={(e) => updateTeam(index, "subName", e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="scores-grid">
//               {["g1", "g2", "g3", "g4"].map((g, i) => (
//                 <div className="score-input" key={g}>
//                   <label>Game {i + 1}</label>
//                   <input
//                     type="number"
//                     value={team[g]}
//                     onChange={(e) =>
//                       updateTeam(index, g, parseInt(e.target.value) || 0)
//                     }
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//         <button className="save-button" onClick={saveToFirebase}>
//           💾 Save All Scores
//         </button>

//         {saveStatus && <div className="status-message">{saveStatus}</div>}
//       </div>
//     </>
//   );
// };

// export default AdminPanel;

import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const AdminPanel = () => {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [teams, setTeams] = useState([
    {
      id: "team-a",
      name: "Merry Cake Mafia",
      subName: "Elves",
      g1: 12,
      g2: 15,
      g3: 10,
      g4: 18,
    },
    {
      id: "team-b",
      name: "Santa Sandwich Crew",
      subName: "Reindeer",
      g1: 14,
      g2: 12,
      g3: 16,
      g4: 14,
    },
    {
      id: "team-c",
      name: "Jingle Pudding Squad",
      subName: "Snowmen",
      g1: 10,
      g2: 10,
      g3: 12,
      g4: 10,
    },
    {
      id: "team-d",
      name: "Reindeer Rolls Runner",
      subName: "Nutcrackers",
      g1: 16,
      g2: 18,
      g3: 14,
      g4: 12,
    },
  ]);

  const [saveStatus, setSaveStatus] = useState("");

  // --- LOGIN LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = loginData;

    const user1 =
      username === "Mohanlal@kerala" && password === "MohanlalLalettan";
    const user2 = username === "Mammootty@kerala" && password === "Mammukka";

    if (user1 || user2) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid Username or Password");
    }
  };

  const updateTeam = (index, field, value) => {
    const updated = [...teams];
    updated[index][field] = value;
    setTeams(updated);
  };

  const saveToFirebase = async () => {
    try {
      await setDoc(doc(db, "scores", "christmas"), {
        teams,
        updatedAt: Date.now(),
      });
      setSaveStatus("✅ Scores saved successfully!");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error("Firestore error:", error);
      setSaveStatus("❌ Error saving scores");
    }
  };

  // --- RENDER LOGIN PAGE ---
  if (!isLoggedIn) {
    return (
      <div className="login-overlay">
        <style>{`
          .login-overlay {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Poppins', sans-serif;
          }
          .login-box {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
            text-align: center;
          }
          .login-box h2 { margin-bottom: 20px; color: #2d3748; }
          .login-box input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            box-sizing: border-box;
          }
          .login-btn {
            width: 100%;
            padding: 12px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 10px;
          }
          .error-text { color: #e53e3e; margin-top: 10px; font-size: 0.9rem; }
        `}</style>
        <div className="login-box">
          <h2>🎄 Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          {loginError && <p className="error-text">{loginError}</p>}
        </div>
      </div>
    );
  }

  // --- RENDER ADMIN PANEL (ONLY IF LOGGED IN) ---
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&family=Poppins:wght@400;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }

        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          padding: 40px;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid #667eea;
        }

        .header h1 {
          font-family: 'Mountains of Christmas', cursive;
          font-size: 3rem;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .header p { color: #718096; font-size: 1.1rem; }

        .team-card {
          background: linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%);
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 25px;
          border: 2px solid #e2e8f0;
        }

        .team-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .input-group { display: flex; flex-direction: column; }

        .input-group label {
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 8px;
          font-size: 0.9rem;
          text-transform: uppercase;
        }

        .input-group input {
          padding: 12px 15px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
        }

        .scores-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .score-input label {
          display: block;
          font-weight: 600;
          color: #667eea;
          margin-bottom: 8px;
          font-size: 0.85rem;
          text-align: center;
        }

        .score-input input {
          width: 100%;
          padding: 15px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1.4rem;
          text-align: center;
          font-weight: 600;
        }

        .save-button {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 15px;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 30px;
        }

        .status-message {
          text-align: center;
          margin-top: 20px;
          font-weight: 600;
          font-size: 1.1rem;
        }
      `}</style>

      <div className="admin-container">
        <div className="header">
          <h1>🎄 Admin Panel</h1>
          <p>Manage Live Score Card</p>
        </div>

        {teams.map((team, index) => (
          <div key={team.id} className="team-card">
            <div className="team-header">
              <div className="input-group">
                <label>Team Name</label>
                <input
                  value={team.name}
                  onChange={(e) => updateTeam(index, "name", e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Sub Name</label>
                <input
                  value={team.subName}
                  onChange={(e) => updateTeam(index, "subName", e.target.value)}
                />
              </div>
            </div>

            <div className="scores-grid">
              {["g1", "g2", "g3", "g4"].map((g, i) => (
                <div className="score-input" key={g}>
                  <label>Game {i + 1}</label>
                  <input
                    type="number"
                    value={team[g]}
                    onChange={(e) =>
                      updateTeam(index, g, parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="save-button" onClick={saveToFirebase}>
          💾 Save All Scores
        </button>

        {saveStatus && <div className="status-message">{saveStatus}</div>}
      </div>
    </>
  );
};

export default AdminPanel;
