import React, { useState } from "react";
import { fetchAPI, BASE_URL } from "../api";

const MyRoutines = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const { myRoutines, addNewRoutine, routineList, user } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sendData = {
      name,
      goal,
      isPublic: true,
    };

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

    // addRoutine(newRoutine).then((result) => {
    //   const routine = result;
    //   console.log("routine 20 myroutine component", routine);
    //   const routineListCopy = [...routineList, routine];
    //   setRoutineList(routineListCopy);
    //   setName("");
    //   setGoal("");
    // });
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
              {/* {myRoutines.activities.map((activity, index) => {
              return (
                <div className="activity" key={index}>
                  <h3>{activity.name}</h3>
                  <p>{activity.description}</p>
                  <p>Duration: {activity.duration}</p>
                  <p>Count: {activity.count}</p>
                </div>
              );
            })} */}
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
