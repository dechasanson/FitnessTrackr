import React, { useState } from "react";
import { addRoutine } from "../api";

const MyRoutines = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const { routineList, setRoutineList } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRoutine = {
      name,
      goal,
    };

    addRoutine(newRoutine).then((result) => {
      const routine = result;
      console.log("routine 20 myroutine component", routine);
      const routineListCopy = [...routineList, routine];
      setRoutineList(routineListCopy);
      setName("");
      setGoal("");
    });
  };

  return (
    <>
      <div className="NewRoutine">
        <form onSubmit={handleSubmit} className="routine">
          <h3>Create Routine</h3>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br />
          <textarea
            type="text"
            value={goal}
            placeholder="Description"
            onChange={(e) => setGoal(e.target.value)}
          ></textarea>

          <input className="Submit" type="submit" value="Submit"></input>
        </form>
      </div>
    </>
  );
};

export default MyRoutines;
