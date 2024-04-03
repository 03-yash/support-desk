import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../featurs/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handlelogOut = () => {
    
    dispatch(logoutUser());
  };
  return (
    <section className="header">
      <div className="logo">
        <Link to="/" >Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={handlelogOut}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" >
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </section>
  );
};

export default Header;
