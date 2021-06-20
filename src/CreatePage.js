import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import BaggiCreateCard from "./Baggi/BaggiCreateCard";
import MasuCreateCard from "./Masu/MasuCreateCard";
import { create } from "./store/templates";

export default function CreatePage() {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(null);
  const dispatch = useDispatch();

  function handleCreate(templateType) {
    const key = uuidv4();
    dispatch(create(key, templateType));
    setRedirect("/edit/" + key);
  }

  if (redirect !== null) {
    return <Redirect push to={redirect} />;
  } else {
    return (
      <div className="container">
        <h1 className="mb-3">{t("create.title")}</h1>
        <div className="row">
          <div className="col-md-6 mb-3">
            <MasuCreateCard onCreate={() => handleCreate("masu")} />
          </div>
          <div className="col-md-6 mb-3">
            <BaggiCreateCard onCreate={() => handleCreate("baggi")} />
          </div>
        </div>
      </div>
    );
  }
}
