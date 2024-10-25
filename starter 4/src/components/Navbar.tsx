import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";




const Navbar = () => {
  const navigate = useNavigate();

  const goToAddWorkout = () => {
    navigate("/add-new-workout");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center bg-blue-500 p-4">
        <div className="text-white text-xl font-semibold">
          <Link to='/all-workouts'>
          <FitnessCenterIcon style={{ fontSize: 40, color: "white" }} />
          </Link>
        </div>
        <button onClick={goToAddWorkout} className="text-white text-3xl">
          {"+"}
        </button>
        <button onClick={handleLogout} className="text-white">
          Logout
        </button>
      </header>
    </div>
  );
};

export default Navbar;
