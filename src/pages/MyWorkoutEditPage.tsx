import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ExcersiseForm from "../components/ExerciseForm";
import useHttp from "../hooks/use-http";
import { API } from "../config";

import Workout from "../models/workout";
import Exercise from "../models/exercise";
import StrengthExercise from "../models/strengthExercise";

import classes from "../components/styles/Form.module.css";

const MyWorkoutEditPage = () => {
  const params = useParams();
  // initialize state
  const [workout, setWorkout] = useState<Workout>(
    new Workout("", "", "", 0, [])
  );
  const { isLoading, error, sendRequest: fetchWorkout } = useHttp();
  const { sendRequest: updateWorkout } = useHttp();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const mapWorkout = (workoutParam: Workout) => {
      setWorkout(workoutParam);
    };
    fetchWorkout(
      {
        url: `${API}/workouts/${params.id}`,
        method: null,
        headers: null,
        body: null,
      },
      mapWorkout
    );
  }, [fetchWorkout]);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(workout);
  };
  const addExercisHandler = () => {};
  const editExerciseHandler = () => {

  };
  const openExeciseEdit = (ex: Exercise) => {
    setExercise(ex);
    setShowExerciseModal(true);
  }
  const handelExerciseFormClose = () => {
    setShowExerciseModal(false);
  };
  const showExerciseForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowExerciseModal((prev) => !prev);
  };
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {setWorkout(prev => ({...prev, title: e.target.value}))}
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {setWorkout(prev => ({...prev, description: e.target.value}))}


  return (
    <main>
      {showExerciseModal && (
        <ExcersiseForm
          addExercise={addExercisHandler}
          onClose={handelExerciseFormClose}
          exercise={exercise}
        />
      )}
      <h1 className={classes.title}>Edit Workout</h1>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <label htmlFor={classes.workoutTitile}>Title</label>
        <input
          ref={titleInputRef}
          value={workout.title}
          onChange={onTitleChange}
          type="text"
          id={classes.workoutTitle}
          name="title"
          required
        />
        <label htmlFor={classes.workoutDescription}>Description</label>
        <textarea
          value={workout.description}
          onChange={onDescriptionChange}
          ref={descriptionInputRef}
          className={classes.workoutDescription}
          name="description"
        />
        <div className={classes["exercise-header"]}>
          <label htmlFor={classes.workoutTitile}>Exercises</label>
          <button
            onClick={showExerciseForm}
            className={classes["add-exercise-button"]}
          >
            +
          </button>
        </div>
        {/* <hr className={classes["exercise-divide"]} /> */}
        <table>
          <tbody>
            {workout.exercises.map(
              (ex) =>
                //ex instanceof StrengthExercise && 
                (
                  <tr key={ex.id}>
                    <td>
                      <div>{`${ex.name} ${(ex as StrengthExercise).sets} sets of ${(ex as StrengthExercise).reps} reps`}</div>
                      <div onClick={() => {openExeciseEdit(ex)}} className={classes["edit-exercise"]}>edit</div>
                    </td>
                  </tr>
                )
              // TODO: other instnace types
            )}
          </tbody>
        </table>

        {/* <ExcersiseForm addExercise={addExercisHandler}/> */}
        {/* Add Exercise portion*/}

        <button>Update</button>
      </form>
      <form>
        <button>Delete</button>
      </form>
    </main>
  );
};

export default MyWorkoutEditPage;
