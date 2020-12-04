import React, { useState } from "react";
import { addActivity } from "../api";

const MyActivities = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { activityList, setActivityList } = props;

  const handleSubmit = (event) => {
    event.preventDefault();

    const newActivity = {
      name,
      description,
    };
    console.log("sdfsdf", newActivity);

    addActivity(newActivity).then((result) => {
      console.log("this is our result inside of my activitys", result);
      const activity = result;
      const activityListCopy = [...activityList, activity];
      setActivityList(activityListCopy);
      console.log(activityList);
      setName("");
      setDescription("");
    });
  };

  return (
    <>
      <div className="NewActivity">
        <form onSubmit={handleSubmit} className="activity">
          <h3>Create Activity</h3>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br />
          <textarea
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input className="Submit" type="submit" value="Submit"></input>
        </form>
      </div>
    </>
  );
};

export default MyActivities;
