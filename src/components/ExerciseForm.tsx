import React, { useState, useRef, useEffect } from "react";
import Exercise from "../models/exercise";
import StrengthExercise from "../models/strengthExercise";
import EnduranceExercise from "../models/enduranceExercise";
import Select from "./UI/Select";
import Modal from "./UI/Modal";
import styles from "./styles/ExerciseForm.module.css";

const ExcersiseForm: React.FC<{
  addExercise: (exercise: Exercise) => void;
  onClose: () => void;
  exercise: Exercise | null;
}> = (props) => {
  const exerciseTypeOptions = [
    // {label: "Select Type", value: "select"},
    { label: "Strength", value: "strength" },
    { label: "Endurance", value: "endurance" },
  ];

  const [exerciseType, setExerciseType] = useState<
    (typeof exerciseTypeOptions)[0] | undefined
  >(exerciseTypeOptions[0]);

  const exerciseNameInputRef = useRef<HTMLInputElement>(null);
  const setsInputRef = useRef<HTMLInputElement>(null);
  const repsInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const distanceInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      exerciseType!.value === "strength" &&
      (
      exerciseNameInputRef.current?.value === '' ||
      setsInputRef.current?.value === '' ||
      repsInputRef.current?.value === ''
      )
    ) {
      return;
    } else if(
      exerciseNameInputRef.current?.value === '' ||
      timeInputRef.current?.value === '' ||
      distanceInputRef.current?.value === ''
    ){
     return;
    }

    const exercise: Exercise =
      exerciseType?.value === "strength"
        ? new StrengthExercise(
            props.exercise === null ? null : props.exercise.id,
            exerciseNameInputRef.current!.value,
            exerciseType.value,
            Number(setsInputRef.current!.value),
            Number(repsInputRef.current!.value)
          )
        : new EnduranceExercise(
            props.exercise === null ? null : props.exercise.id,
            exerciseNameInputRef.current!.value,
            exerciseType!.value,
            Number(timeInputRef.current!.value),
            Number(distanceInputRef.current!.value)
          );
    props.addExercise(exercise);
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <form>
        <div className={styles["main-info"]}>
          <label className={styles["main-info-label"]} htmlFor="exercise-name">
            Name:{" "}
          </label>
          <input
            id="exercise-name"
            ref={exerciseNameInputRef}
            className={styles.name}
            type="text"
            placeholder="Exercise Name"
            required
          />
        </div>
        <div className={styles["main-info"]}>
          <label className={styles["main-info-label"]}>Exercise Type: </label>
          <Select
            options={exerciseTypeOptions}
            value={exerciseType}
            onChange={(o) => setExerciseType(o)}
          />
        </div>

        {exerciseType && (
          <div className={styles["type-info"]}>
            {exerciseType!.value == "strength" && (
              <>
                <input
                  ref={setsInputRef}
                  className={styles["input-item"]}
                  type="number"
                  placeholder="Sets"
                  required
                />
                <input
                  ref={repsInputRef}
                  className={styles["input-item"]}
                  type="number"
                  placeholder="Reps"
                  required
                />
              </>
            )}
            {exerciseType!.value == "endurance" && (
              <>
                <input
                  ref={timeInputRef}
                  className={styles["input-item"]}
                  type="number"
                  placeholder="Time"
                  required
                />
                <input
                  ref={distanceInputRef}
                  className={styles["input-item"]}
                  type="number"
                  placeholder="Distance"
                  required
                />
              </>
            )}
          </div>
        )}
        <button onClick={submitHandler}>Add Exercise</button>
      </form>
    </Modal>
  );
};

export default ExcersiseForm;
