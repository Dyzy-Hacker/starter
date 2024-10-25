import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

interface AddNewWorkoutProps {
  user: User;
  onWorkoutAdded: (workout: any) => void;
  toggleForm: () => void;
}

const AddNewWorkout: React.FC<AddNewWorkoutProps> = ({
  user,
  onWorkoutAdded,
  toggleForm,
}) => {
  const [exerciseType, setExerciseType] = useState<string>("");
  const [workoutTypes, setWorkoutTypes] = useState<any[]>([]);
  const [duration, setDuration] = useState<string | number>("");
  const [intensity, setIntensity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const data = [
      { id: 1, name: "Cardio" },
      { id: 2, name: "Flexibility" },
      { id: 3, name: "Swimming" },
      { id: 4, name: "HIIT" },
      { id: 5, name: "Strength Training" },
      { id: 6, name: "Pilates" },
      { id: 7, name: "Balance" },
      { id: 8, name: "Yoga" },
      { id: 9, name: "CrossFit" },
      { id: 10, name: "Running" },
    ];
    setWorkoutTypes(data);
  }, []);

  const addWorkout = async () => {
    if (exerciseType && duration && intensity) {
      setLoading(true);
      const newWorkout = {
        exerciseType,
        duration: Number(duration),
        intensity,
        userId: user.uid,
        date: new Date().toISOString(),
      };

      try {
        const docRef = await addDoc(collection(db, "workouts"), newWorkout);
        onWorkoutAdded({ ...newWorkout, id: docRef.id });
        setExerciseType("");
        setDuration("");
        setIntensity("");
        toggleForm();
      } catch (error) {
        console.error("Error adding workout: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addWorkout();
        }}
        className="w-full max-w-md"
      >
        <label className="block mb-2 text-gray-700">Exercise Type</label>
        <select
          name="exerciseType"
          value={exerciseType}
          onChange={(e) => setExerciseType(e.target.value)}
          required
          className="w-full mb-4 p-4 border rounded"
        >
          <option value="" disabled>
            Select exercise
          </option>
          {workoutTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>


        <label className="block mb-2 text-gray-700">Duration (minutes)</label>
        <input
          type="number"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="w-full mb-4 p-4 border rounded"
          placeholder="Enter duration in minutes"
        />

        <label className="block mb-2 text-gray-700">Intensity</label>
        <select
          name="intensity"
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
          required
          className="w-full mb-6 p-4 border rounded"
        >
          <option value="" disabled>
            Select intensity
          </option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition duration-300 uppercase"
        >
          {loading ? "Saving..." : "Add Workout"}
        </button>
      </form>
    </div>
  );
};

export default AddNewWorkout;
