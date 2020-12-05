import React from "react";
import AddActivity from "./AddActivity";

const Activities = (props) => {
  const { activityList, setActivityList, isLoggedIn, filterTerm } = props;

  return (
    <div className="Activities">
      {isLoggedIn ? (
        <AddActivity
          activityList={activityList}
          setActivityList={setActivityList}
        />
      ) : (
        ""
      )}
      {activityList
        .filter(function (activity) {
          return activity.name.toLowerCase().includes(filterTerm.toLowerCase());
        })
        .map((activity, index) => {
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
