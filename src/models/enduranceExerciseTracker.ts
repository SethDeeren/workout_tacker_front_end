import ExerciseTracker from "./exerciseTracker";

class EnduranceExerciseTracker extends ExerciseTracker{
    time: number;
    distance: number;

    constructor(time: number, distance: number, trackerDateAndTime: Date | null){
        super("endurance", trackerDateAndTime);
        this.time = time;
        this.distance = distance;
    }
}

export default EnduranceExerciseTracker;