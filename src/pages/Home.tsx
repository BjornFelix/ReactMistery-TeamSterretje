import { useContext, useState } from "react";
import AuthContext from "../services/contexts/AuthContext";
import useTranslation from "../utils/hooks/useTranslation";
import useFetch from "../utils/hooks/useFetch";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);

  const t = useTranslation("nl");

  const { data, error, isLoading } = useFetch<User[]>(
    `http://localhost:8080/api/users?_page=${page}}`,
    { initialValue: [] }
  );

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      {isLoading && <p>Loading</p>}
      {data &&
        data.map((user) => {
          return <p key={user.id}>{user.email}</p>;
        })}
      <button
        onClick={() => {
          setPage((p) => p + 1);
        }}
      >
        Increase page
      </button>
      <h1>{t("userDetail.actions.hfhxkfj")}</h1>
      <h1>{t("home.title")}</h1>
      <h1>{t("userDetail.actions.save")}</h1>
      <h1>index</h1>
      {!user && (
        <p>
          Please <a href="/login">login</a>
        </p>
      )}
      {user && <p>Welcome, {user}</p>}
    </>
  );
};

export default Home;
