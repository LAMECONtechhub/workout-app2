import { useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import Layout from "@/components/shared/layout/layout";
import { useAppDispatch } from "@/redux/hooks";
import { account } from "@/appwrite/appwriteConfig";
import { fillUserSummaryAsync, resetUser } from "@/contexts/user.slice";
import { wrapper } from "@/core/store";
import {
  fillPersonalRecords,
  resetPrs,
} from "@/contexts/personal-records.slice";
import { fillWorkouts, resetWorkouts } from "@/contexts/workout.slice";
function App({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fillUserAndPrs = async () => {
      const currentAccount = await account.get();
      if (currentAccount) {
        dispatch(fillUserSummaryAsync(currentAccount.$id));
        dispatch(fillPersonalRecords(currentAccount.$id));
        dispatch(fillWorkouts(currentAccount.$id));
      } else {
        dispatch(resetUser());
        dispatch(resetPrs());
        dispatch(resetWorkouts());
      }
    };

    fillUserAndPrs();
  }, [dispatch]);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "white",
          fontFamily: "poppins",
        },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
}
export default wrapper.withRedux(App);
