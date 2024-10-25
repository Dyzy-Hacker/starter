import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import AddNewWorkout from "./AddNewWorkout";

interface AllWorkoutsProps {
  user: User;
}

const AllWorkouts: React.FC<AllWorkoutsProps> = ({ user }) => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const q = query(
          collection(db, "workouts"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const workoutsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkouts(workoutsData);
      } catch (error) {
        console.error("Error fetching workouts: ", error);
      }
    };

    fetchWorkouts();
  }, [user.uid]);

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const handleWorkoutAdded = (newWorkout: any) => {
    setWorkouts([...workouts, newWorkout]);
  };

  return (
    <div className="flex flex-col h-screen">
      {formVisible && (
        <AddNewWorkout
          user={user}
          onWorkoutAdded={handleWorkoutAdded}
          toggleForm={toggleFormVisibility}
        />
      )}
      <div className="mt-4">
        {workouts.map((workout, index) => (
          <div key={workout.id} className="rounded-md flex flex-col">
            <p className="text-xl">{workout.exerciseType}</p>
            <p className="text-lg">Duration: {workout.duration}</p>
            <p className="text-lg">Intensity: {workout.intensity}</p>
            <br />
            {index === workouts.length - 1 && (
              <hr className="mt-4 border-black w-full border-t-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllWorkouts;
