import {
  database,
  database_id,
  workout_Collection,
} from "@/appwrite/appwriteConfig";
import Workout from "@/components/dashboard/Workouts/Workout";
import { Query } from "appwrite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function DashboardPage() {
  const [workout, setWorkout] = useState<any>("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getWorkout = async () => {
      const document_id = id as string;
      const workoutPromise = await database.getDocument(
        database_id,
        workout_Collection,
        document_id
      );
      setWorkout(workoutPromise);
    };
    getWorkout();
  }, []);

  if (!workout) {
    return <div>Loading...</div>;
  }

  return <Workout workoutId={id as unknown as string} name={"hello"} />;
}
