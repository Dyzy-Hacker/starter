import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./index.css";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import AllWorkouts from "./components/AllWorkouts";
import AddNewWorkout from "./components/AddNewWorkout";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleWorkoutAdded = (workout: any) => {
    console.log("Workout added:", workout);
  };

  const toggleForm = () => {
    console.log("Toggle form called");
  };

  const Layout: React.FC = () => {
    const location = useLocation();
    return (
      <>
        {location.pathname !== "/" && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/all-workouts" /> : <Login />}
          />
          <Route
            path="/all-workouts"
            element={user ? <AllWorkouts user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/add-new-workout"
            element={
              user ? (
                <AddNewWorkout
                  user={user}
                  onWorkoutAdded={handleWorkoutAdded}
                  toggleForm={toggleForm}
                />
              ) : (
                <Navigate to="/all-workouts" />
              )
            }
          />
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
