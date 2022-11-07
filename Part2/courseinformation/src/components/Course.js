import React from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};
const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  );
};
const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <div key={part.id}>
          <Part part={part} />
        </div>
      ))}
    </>
  );
};
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <h4>total of {total} exercises</h4>;
};
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
