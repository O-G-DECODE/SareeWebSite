import React from "react";
import { useNavigate } from "react-router-dom";

function UserBottomNav() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button 
        style={styles.button}
        onClick={() => navigate("/search")}
      >
        🔍 Search
      </button>

      <button 
        style={styles.button}
        onClick={() => navigate("/filter")}
      >
        ⚙️ Filter
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: "12px 0",
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
  },
  button: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default UserBottomNav;