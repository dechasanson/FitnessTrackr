import React from "react";
import AddActivity from "./AddActivity";

const Activities = (props) => {
  const { activityList, setActivityList, isLoggedIn, filterTerm , setFilterTerm} = props;

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
              <a className = "tag" href = "#"
              onClick = {(event) => {
                setFilterTerm(event.target.text);
              }}>
                {activity.name}
                </a>
                
              <p>{activity.description}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Activities;
