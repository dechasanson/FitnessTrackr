import React from "react";

const Activities = (props) => {
  const { activityList } = props;

  /*const handleDelete = (id, index) => {
    deleteActivity(id).then((results) => {
      const activitesCopy = activityList.slice();
      activityCopy.splice(index, 1);
      setActivityList(activitesCopy);
    });*/

  return (
    <div className="Activities">
      {activityList.map((activity, index) => {
        return (
          <div className="activity" key={index}>
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
            {/*
            <button
              onClick={() => {
                handleDelete(activity.id, index);
              }}
            >
              Delete
            </button>
            */}
          </div>
        );
      })}
    </div>
  );
};

export default Activities;
