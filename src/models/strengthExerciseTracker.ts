import ExerciseTracker from "./exerciseTracker";

class StrengthExerciseTracker extends ExerciseTracker{
    weight: number;
    reps: number;

    constructor(weight: number, reps: number, trackerDateAndTime: Date | null){
        super("strength", trackerDateAndTime);
        this.weight = weight;
        this.reps = reps;
    }
}

export default StrengthExerciseTracker;