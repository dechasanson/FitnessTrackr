import React, { useState, useEffect } from "react";
import { fetchAPI, BASE_URL } from "../api";

const MyRoutines = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    setName(routine.name || "");
    setGoal(routine.goal || "");
  }, [routineId]);

  const { addNewRoutine, routineList, user, routineId, setRoutineId } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sendData = {
      name,
      goal,
      isPublic: true,
    };
    if (routineId) {
      try {
        ///need to adjust fetch to patch here
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const newRoutine = await fetchAPI(
          `${BASE_URL}/routines`,
          "POST",
          sendData
        );
        console.log("send-data:", newRoutine);
        addNewRoutine(newRoutine);
        setName("");
        setGoal("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className="newRoutine">
        <form onSubmit={handleSubmit} className="newRoutineForm">
          <h3>Create Routine</h3>
          <input
            type="text"
            value={name}
            placeholder="Routine Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <textarea
            type="text"
            value={goal}
            placeholder="Description of Routine"
            onChange={(e) => setGoal(e.target.value)}
          ></textarea>

          <button className="Submit" type="submit" value="Submit">
            Add Routine
          </button>
        </form>
      </div>
      <div className="myRoutines">
        {routineList.map((routine) => {
          return user === routine.creatorId ? (
            <div className="routine" key={routine.id}>
              <h3>{routine.name}</h3>
              <p>Goal: {routine.goal}</p>
              <br />
              <h4>Activities in this Routine:</h4>
              {/* {routineList.activities.map((activity, index) => {
              return (
                <div className="activity" key={index}>
                  <h3>{activity.name}</h3>
                  <p>{activity.description}</p>
                  <p>Duration: {activity.duration}</p>
                  <p>Count: {activity.count}</p>
                </div>
              );
            })} */}
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setRoutineId(routine.id);
                }}
              >
                Edit Routine
              </button>
              <button>Add Activities</button>
              <button>Delete Routine</button>
            </div>
          ) : (
            ""
          );
        })}
      </div>
    </>
  );
};

export default MyRoutines;
