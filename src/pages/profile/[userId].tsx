import {
  database,
  database_id,
  user_collection,
} from "@/appwrite/appwriteConfig";
import Profile from "@/components/profile/Profile";
import { UserData } from "@/dto/user.dto";
import { Query } from "appwrite";
import { useRouter } from "next/router";
export default async function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  const userInfo = await database.listDocuments(database_id, user_collection, [
    Query.equal("userId", userId as unknown as string),
  ]);
  const userDocument = userInfo.documents[0];
  // Map the userDocument to UserSummaryDto shape
  const userSummary: UserData = {
    userId: userDocument.userId,
    name: userDocument.name,
    age: userDocument.age,
    email: userDocument.email,
    strengthTraining: userDocument.strengthTraining,
    weight: userDocument.weight,
    height: userDocument.height,
    // Include other properties from UserSumaryDto as needed
  };
  return <Profile user={userSummary} />;
}
