import Calender from "@/components/calender/Calender";
import Header from "@/components/header/Header";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Header />
      <Calender />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const req = context.req;
    const session = await getSession({ req });
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: { session },
    };
  } catch {
    return { notFound: true };
  }
};
