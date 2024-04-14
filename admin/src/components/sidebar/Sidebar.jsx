import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link className="sidebar-link" to="/dashboard">
        <div className="sidebar-item">
          <img src={""} alt="" />
          <p>Add A Project</p>
        </div>
      </Link>
      <Link className="sidebar-link" to="list">
        <div className="sidebar-item">
          <img src={""} alt="" />
          <p>Projects List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
