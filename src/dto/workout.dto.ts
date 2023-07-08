export interface Workout {
  name: string;
  exercises?: Exercise[];
  day: string;
}
export interface Exercise {
  name: string;
  reps: number;
  sets: number;
  workoutId: string;
}
