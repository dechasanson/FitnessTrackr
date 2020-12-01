import React from "react";

const Activities = (props) => {
  const { activityList } = props;

  return (
    <div className="Activities">
      {activityList.map((activity, index) => {
        return (
          <div className="activity" key={index}>
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Activities;
