import Profile from "@/components/profile/Profile";
import { SelectUser } from "@/contexts/user.slice";
import { useSelector } from "react-redux";
export default function ProfilePage() {
  const { currentUser } = useSelector(SelectUser);
  return <Profile user={currentUser} />;
}
