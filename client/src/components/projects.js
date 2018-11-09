import React from "react";

const Projects = props => {
  return (
    <div>
      {props.projects.map(project => {
        return (
          <div key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
