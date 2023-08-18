import { render, screen } from "@testing-library/react";
import useTranslation from "./useTranslation";

describe("testing useTranslate", () => {
  it("get unkown key when wrong key", () => {
    const Home = () => {
      const t = useTranslation("nl");

      return <h1>{t("userDetail.actions.hfhxkfj")}</h1>;
    };

    render(<Home />);

    screen.getByText("unknown-key");
  });

  it("get key", () => {
    const Home = () => {
      const t = useTranslation("en");

      return <h1>{t("home.title")}</h1>;
    };

    render(<Home />);

    screen.getByText("Home");
  });

  it("testing nested key", () => {
    const Home = () => {
      const t = useTranslation("nl");

      return <h1>{t("userDetail.actions.save")}</h1>;
    };

    render(<Home />);

    screen.getByText("Save");
  });
});
