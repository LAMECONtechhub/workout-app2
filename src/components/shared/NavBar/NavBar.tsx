import * as React from "react";
import { Button, Drawer, Typography } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { SelectUser } from "@/contexts/user.slice";
import { useSelector } from "react-redux";
const { Text } = Typography;

export interface IAppProps {}

const items = [
  {
    label: "Home",
    section: "",
    key: "home",
  },
  {
    label: "Dashboard",
    section: "dashboard",
    key: "dashboard",
  },
  {
    label: "Profile",
    section: "profile",
    key: "profile",
  },
  {
    label: (
      <Button className="bg-color2 text-color3" shape="round">
        Sign Up
      </Button>
    ),
    section: "signup",
    key: "signup",
  },
  {
    label: (
      <Button className="bg-color2 text-color3" shape="round">
        Sign In
      </Button>
    ),
    section: "signup",
    key: "login",
  },
];
interface AppMenuProps {
  isinline: boolean;
}

function AppMenu(props: AppMenuProps): JSX.Element {
  let menuItems = items;
  const selector = useAppSelector;
  const { currentUser } = selector(SelectUser);
  if (currentUser) {
    menuItems = items.filter(
      (item) => item.key != "signup" && item.key != "login"
    );
  }

  return (
    <div
      className={`flex items-center gap-4 ${
        props.isinline ? "flex-col" : "flex-row"
      }`}
    >
      {menuItems.map((item) => (
        <Link
          href={item.section}
          key={`${item.key}`}
          className="cursor-pointer"
        >
          {React.isValidElement(item.label) ? (
            item.label
          ) : (
            <Text className="text-color3 md:text-color2">{item.label}</Text>
          )}
        </Link>
      ))}
    </div>
  );
}

const NavBar: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const openMenu = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };
  return (
    <div className="m-3 flex justify-between">
      <div>
        <Text className="text-primarycolor text-2xl">
          <Link href="/" className="text-color4">
            Workout App
          </Link>
        </Text>
      </div>
      <div className="flex items-center justify-between">
        <div className="md:block hidden">
          <AppMenu isinline={false} />
        </div>
        <div className="md:hidden block">
          <GiHamburgerMenu onClick={openMenu} />
        </div>
      </div>

      <Drawer className="bg-bgColor" onClose={close} open={open}>
        <AppMenu isinline={true} />
      </Drawer>
    </div>
  );
};
export default NavBar;
