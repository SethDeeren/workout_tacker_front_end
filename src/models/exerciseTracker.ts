class ExerciseTracker {
    type: string;
    trackerDateAndTime: Date | null;

    constructor(type: string, trackerDateAndTime: Date | null) {
        this.type = type;
        this.trackerDateAndTime = trackerDateAndTime;
    }
    
}

export default ExerciseTracker;