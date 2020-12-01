import React, { useState } from "react";
import { addRoutine } from "../api";

const MyRoutines = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [count, setCount] = useState("");

  const { routineList, setRoutineList } = props;

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRoutine = {
      name,
      goal,
      creatorName,
      activities,
    };

    const activities = {
      name,
      description,
      duration,
      count,
    };

    addRoutine(newRoutine).then((result) => {
      const routine = result.routine;
      const routineListCopy = [...routineList];
      routineListCopy.push(routine);
      setRoutineList(routineListCopy);
      //resetting state to reset form
      setName("");
      setGoal("");
      setCreatorName("");
      setActivityName("");
      setDescription("");
      setDuration("");
      setCount("");
    });
  };

  return (
    <>
      <div className="NewRoutine">
        <form onSubmit={handleSubmit} className="routine">
          <h3>Create Activity</h3>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            value={goal}
            placeholder="Goal"
            onChange={(e) => setGoal(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            value={creatorName}
            placeholder="Creator Name"
            onChange={(e) => setCreatorName(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            value={name}
            placeholder="Exercise"
            onChange={(e) => setActivityName(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            value={description}
            placeholder="Name"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <input
            type="text"
            value={duration}
            placeholder="Time"
            onChange={(e) => setDuration(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            value={count}
            placeholder="Reps"
            onChange={(e) => setCount(e.target.value)}
          ></input>

          <input className="Submit" type="submit" value="Submit"></input>
        </form>
      </div>
    </>
  );
};

export default MyRoutines;
