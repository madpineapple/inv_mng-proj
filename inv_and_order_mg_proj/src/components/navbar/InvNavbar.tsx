import logo from "../../images/AMLogo.png";
import { Link } from "react-router-dom";
function InvNavbar() {
  return (
    <nav className="nav">
      <Link className="nav-brand" to="/">
        <img src={logo} />
      </Link>
      <div className="nav-links">
        <Link className="custom-nav-link" to="/">
          Home
        </Link>
        <Link className="custom-nav-link " to="/inventory">
          Inventory
        </Link>
        <Link className="custom-nav-link " to="/order">
          Order
        </Link>
        <Link className="custom-nav-link " to="/customer">
          Customer
        </Link>
      </div>
    </nav>
  );
}

export default InvNavbar;
