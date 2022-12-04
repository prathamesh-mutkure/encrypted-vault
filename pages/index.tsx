import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const HomePage = () => {
  return (
    <div>
      <p>Redirecting....</p>
    </div>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  // console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
    props: {
      session,
    },
  };
};

export default HomePage;
export { getServerSideProps };
