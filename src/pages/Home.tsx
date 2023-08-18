import { useContext } from "react";
import AuthContext from "../services/contexts/AuthContext";
import useTranslation from "../utils/hooks/UseTranslation";

const Home = () => {
  const { user } = useContext(AuthContext);

  const t = useTranslation("nl");

  return (
    <>
      <h1>{t("home.title")}</h1>;
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
