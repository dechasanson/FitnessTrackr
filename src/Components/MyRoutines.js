import React, { useState, useEffect } from "react";
import { fetchAPI, BASE_URL } from "../api";

const MyRoutines = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [placeHolderActivities, setPlaceHolderActivities] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    setName(routine.name || "");
    setGoal(routine.goal || "");
  }, []);

  const {
    addNewRoutine,
    routineList,
    user,
    routine,
    setRoutine,
    updateRoutine,
    activityList,
  } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sendData = {
      name,
      goal,
      isPublic: true,
    };
    if (routine.id) {
      try {
        console.log("I am here!!");
        const result = await fetchAPI(
          `${BASE_URL}/routines/${routine.id}`,
          "PATCH",
          sendData
        );
        updateRoutine(result);
        console.log("result:", result);
        console.log("sendData is:", sendData);
        setName("");
        setGoal("");
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
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setRoutine(routine);
                  setName(routine.name);
                  setGoal(routine.goal);
                }}
              >
                Edit Routine
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setRoutine(routine);
                  setModal(routine.id);
                }}
              >
                Add Activities
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setRoutine(routine);
                }}
              >
                Delete Routine
              </button>
              {modal === routine.id ? (
                <div className="routine-modal">
                  <div>
                    <select id="routineActivityList">
                      {activityList.map((activity) => {
                        return (
                          <>
                            {" "}
                            <option key={activity.id} value={activity.id}>
                              {activity.name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                    <button
                      onClick={(event) => {
                        let e = document.getElementById("routineActivityList");
                        let result = {
                          id: e.options[e.selectedIndex].value,
                          name: e.options[e.selectedIndex].innerText,
                        };

                        console.log("result is: ", result);
                        event.preventDefault();
                        setPlaceHolderActivities([
                          ...placeHolderActivities,
                          result,
                        ]);
                        console.log(placeHolderActivities);
                      }}
                    >
                      Add this Activity
                    </button>
                    {placeHolderActivities.map((activity, index) => {
                      return (
                        <div className="activity" key={index}>
                          <p>{activity.name}</p>
                          <span>
                            <input
                              type="text"
                              placeHolder="Enter Count"
                            ></input>
                            <input
                              type="text"
                              placeHolder="Enter Duration"
                            ></input>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={(event) => {
                      event.preventDefault();

                      setPlaceHolderActivities([]);
                    }}
                  >
                    Add Activites to Routine
                  </button>
                </div>
              ) : null}
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
