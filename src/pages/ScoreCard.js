// import React, { useEffect, useState } from "react";

// const ScoreCard = () => {
//   const [teams, setTeams] = useState([
//     { id: "t1", name: "Team Rudolph", g1: 85, g2: 92, g3: 78, g4: 88 },
//     { id: "t2", name: "Team Snowflake", g1: 90, g2: 88, g3: 95, g4: 87 },
//     { id: "t3", name: "Team Jingle", g1: 82, g2: 79, g3: 91, g4: 85 },
//     { id: "t4", name: "Team Frosty", g1: 88, g2: 94, g3: 82, g4: 90 },
//   ]);
//   const [sortDesc, setSortDesc] = useState(true);

//   const sortedTeams = [...teams].sort((a, b) => {
//     const totalA = a.g1 + a.g2 + a.g3 + a.g4;
//     const totalB = b.g1 + b.g2 + b.g3 + b.g4;
//     return sortDesc ? totalB - totalA : totalA - totalB;
//   });

//   return (
//     <div
//       style={{
//         position: "relative",
//         minHeight: "100vh",
//         width: "100%",
//         margin: 0,
//         fontFamily: "sans-serif",
//         color: "white",
//       }}
//     >
//       {/* 1. BACKGROUND VIDEO */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           zIndex: -2, // Behind everything
//         }}
//       >
//         {/* If this path fails in CodeSandbox, use a direct link like:
//             https://www.w3schools.com/html/mov_bbb.mp4 to test */}
//         <source src="/Santa_Flying_Video_Generated.mp4" type="video/mp4" />
//       </video>

//       {/* 2. DARK OVERLAY (Makes text readable) */}
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           zIndex: -1,
//         }}
//       ></div>

//       {/* 3. CONTENT ON TOP */}
//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: "40px 20px",
//         }}
//       >
//         <h1
//           style={{
//             fontSize: "3rem",
//             marginBottom: "10px",
//             textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
//           }}
//         >
//           🎄 Christmas Games
//         </h1>
//         <p
//           style={{ color: "#fbbf24", fontWeight: "bold", marginBottom: "30px" }}
//         >
//           🏆 LIVE SCOREBOARD 🏆
//         </p>

//         <button
//           onClick={() => setSortDesc(!sortDesc)}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: "#dc2626",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             fontWeight: "bold",
//             marginBottom: "30px",
//           }}
//         >
//           {sortDesc ? "Sort: High to Low" : "Sort: Low to High"}
//         </button>

//         {/* TABLE CONTAINER */}
//         <div
//           style={{
//             width: "100%",
//             maxWidth: "800px",
//             backgroundColor: "rgba(255, 255, 255, 0.1)",
//             backdropFilter: "blur(10px)",
//             borderRadius: "20px",
//             border: "1px solid rgba(255,255,255,0.2)",
//             overflow: "hidden",
//           }}
//         >
//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               textAlign: "left",
//             }}
//           >
//             <thead style={{ backgroundColor: "rgba(220, 38, 38, 0.6)" }}>
//               <tr>
//                 <th style={{ padding: "20px" }}>Team</th>
//                 <th style={{ padding: "20px", textAlign: "center" }}>G1</th>
//                 <th style={{ padding: "20px", textAlign: "center" }}>G2</th>
//                 <th style={{ padding: "20px", textAlign: "center" }}>G3</th>
//                 <th
//                   style={{
//                     padding: "20px",
//                     textAlign: "center",
//                     color: "#fbbf24",
//                   }}
//                 >
//                   TOTAL
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedTeams.map((team, index) => (
//                 <tr
//                   key={team.id}
//                   style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
//                 >
//                   <td style={{ padding: "20px", fontWeight: "bold" }}>
//                     {index === 0 && sortDesc ? "👑 " : ""}
//                     {team.name}
//                   </td>
//                   <td style={{ padding: "20px", textAlign: "center" }}>
//                     {team.g1}
//                   </td>
//                   <td style={{ padding: "20px", textAlign: "center" }}>
//                     {team.g2}
//                   </td>
//                   <td style={{ padding: "20px", textAlign: "center" }}>
//                     {team.g3}
//                   </td>
//                   <td
//                     style={{
//                       padding: "20px",
//                       textAlign: "center",
//                       fontWeight: "bold",
//                       fontSize: "1.2rem",
//                     }}
//                   >
//                     {team.g1 + team.g2 + team.g3 + team.g4}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScoreCard;

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ScoreCard = () => {
  // Default teams (shown before Firebase loads)
  const [teams, setTeams] = useState([
    {
      id: "team-a",
      name: "Loading...",
      subName: "",
      g1: 0,
      g2: 0,
      g3: 0,
      g4: 0,
    },
  ]);
  const [sortDesc, setSortDesc] = useState(true);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA FROM FIREBASE IN REAL-TIME
  useEffect(() => {
    console.log("Connecting to Firebase...");

    const unsub = onSnapshot(
      doc(db, "scores", "christmas"),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Data received from Firebase:", data);

          if (data.teams && data.teams.length > 0) {
            setTeams(data.teams);
            setLoading(false);
            console.log("✅ Teams loaded successfully!");
          }
        } else {
          console.log("❌ No data found in Firebase");
          setLoading(false);
        }
      },
      (error) => {
        console.error("❌ Firebase error:", error);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const sortedTeams = [...teams].sort((a, b) => {
    const totalA = a.g1 + a.g2 + a.g3 + a.g4;
    const totalB = b.g1 + b.g2 + b.g3 + b.g4;
    return sortDesc ? totalB - totalA : totalA - totalB;
  });

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      {/* 1. BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      >
        <source src="/Santa_Flying_Video_Generated.mp4" type="video/mp4" />
      </video>

      {/* 2. DARK OVERLAY */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: -1,
        }}
      ></div>

      {/* 3. CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "10px",
            textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          🎄 Christmas Games 2025
        </h1>
        <p
          style={{ color: "#fbbf24", fontWeight: "bold", marginBottom: "30px" }}
        >
          🏆 LIVE SCOREBOARD 🏆
        </p>

        {/* Loading indicator */}
        {loading && (
          <div
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.8)",
              padding: "15px 30px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            ⏳ Loading scores from Firebase...
          </div>
        )}

        <button
          onClick={() => setSortDesc(!sortDesc)}
          style={{
            padding: "12px 24px",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "30px",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#b91c1c")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#dc2626")}
        >
          {sortDesc ? "🔽 High to Low" : "🔼 Low to High"}
        </button>

        {/* TABLE */}
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            border: "2px solid rgba(255,255,255,0.3)",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead style={{ backgroundColor: "rgba(220, 38, 38, 0.7)" }}>
              <tr>
                <th style={{ padding: "20px", fontSize: "1.1rem" }}>🎯 Team</th>
                <th
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    fontSize: "1.1rem",
                  }}
                >
                  Jingle toss
                </th>
                <th
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    fontSize: "1.1rem",
                  }}
                >
                  Cup & Claus Build-Off
                </th>
                <th
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    fontSize: "1.1rem",
                  }}
                >
                  Snowball Pass
                </th>
                <th
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    fontSize: "1.1rem",
                  }}
                >
                  Christmas Curl Challenge
                </th>
                <th
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#fbbf24",
                    fontSize: "1.2rem",
                  }}
                >
                  ⭐ TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, index) => {
                const total = team.g1 + team.g2 + team.g3 + team.g4;
                const isFirst = sortDesc && index === 0;

                return (
                  <tr
                    key={team.id}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                      backgroundColor: isFirst
                        ? "rgba(251, 191, 36, 0.2)"
                        : "transparent",
                      transition: "all 0.3s",
                    }}
                  >
                    <td
                      style={{
                        padding: "20px",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      {isFirst ? "👑 " : ""}
                      {team.name}
                      {team.subName && (
                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: "#94a3b8",
                            marginTop: "4px",
                          }}
                        >
                          {team.subName}
                        </div>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      {team.g1}
                    </td>
                    <td
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      {team.g2}
                    </td>
                    <td
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      {team.g3}
                    </td>
                    <td
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      {team.g4}
                    </td>
                    <td
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        color: isFirst ? "#fbbf24" : "white",
                      }}
                    >
                      {total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <p
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              padding: "10px 20px",
              borderRadius: "20px",
              fontSize: "0.9rem",
              color: "#94a3b8",
            }}
          >
            🔄 Live updates from Firebase • Connected ✅
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
