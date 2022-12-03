import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { useAppDispatch } from "../../hooks";

interface DashboardPageProps {
  //   exams: AssignedExam[];
  error: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ error }) => {
  const dispatch = useAppDispatch();
  const loadingBarRef: React.Ref<LoadingBarRef> = useRef(null);

  //   useEffect(() => {
  //     if (!exams) {
  //       return;
  //     }

  //     // dispatch(examActions.setAssignedExams(exams));
  //   }, [dispatch, exams]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Head>
        <title>Vault</title>
      </Head>
      <LoadingBar color="#ffffff" ref={loadingBarRef} />
      {/* <NavBarDashboard loadingBarRef={loadingBarRef} />
      <Dashboard loadingBarRef={loadingBarRef} /> */}

      <p>Dashboard...</p>
    </div>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  try {
    // const assignedExams: AssignedExam[] = await getAssignedExams(
    //   session.user.id,
    //   session.user.token
    // );

    // if (!assignedExams) {
    //   throw new Error("Error getting assigned exams!");
    // }

    return {
      props: {
        // exams: assignedExams,
        error: null,
      },
    };
  } catch (e: any) {
    return {
      props: {
        // exams: null,
        error: e.message ?? "Error getting assigned exams!",
      },
    };
  }
};

export default DashboardPage;
export { getServerSideProps };
