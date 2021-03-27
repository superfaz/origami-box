import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import MasuCreateCard from "./Masu/MasuCreateCard";
import { create } from "./store/templates";

export default function CreatePage() {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(null);
  const dispatch = useDispatch();

  function handleCreate() {
    const key = uuidv4();
    dispatch(create(key));
    setRedirect("/edit/" + key);
  }

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <div className="container">
        <h1>{t("create.title")}</h1>
        <div className="row">
          <MasuCreateCard className="col-6" onCreate={handleCreate} />
        </div>
      </div>
    );
  }
}
