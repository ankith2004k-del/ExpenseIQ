import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <h1>💰 ExpenseIQ</h1>
        <p>Track your income and expenses</p>
      </div>

      <nav className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/summary"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Summary
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;