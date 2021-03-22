import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";

export default function LegalPage() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <h1 className="offset-xl-2 offset-lg-3 display-1">
        {t("legal:privacy.title")}
      </h1>
      <p className="offset-xl-2 offset-lg-3 lead">
        {t("legal:privacy.description")}
      </p>

      <div className="row">
        <div className="col-xl-2 col-lg-3 mb-3">
          <h2>Topics</h2>
          <ul className="nav flex-column">
            {Array.apply(null, Array(12)).map((v, i) => (
              <li key={i} className="nav-item">
                <a className="nav-link" href={`#chapter${i + 1}`}>
                  {t(`legal:privacy.chapter${i + 1}.title`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h2 id="chapter1">{t("legal:privacy.chapter1.title")}</h2>
          <p>{t("legal:privacy.chapter1.content")}</p>
          <ul>
            <li>{t("legal:privacy.chapter1.list1")}</li>
          </ul>

          <h2 id="chapter2">{t("legal:privacy.chapter2.title")}</h2>
          <p>{t("legal:privacy.chapter2.content")}</p>
          <ul>
            <li>{t("legal:privacy.chapter2.list1")}</li>
          </ul>

          <h2 id="chapter3">{t("legal:privacy.chapter3.title")}</h2>
          <p>{t("legal:privacy.chapter3.content")}</p>
          <ul>
            <li>{t("legal:privacy.chapter3.list1")}</li>
          </ul>
          <p>{t("legal:privacy.chapter3.sharing")}</p>

          <h2 id="chapter4">{t("legal:privacy.chapter4.title")}</h2>
          <p>{t("legal:privacy.chapter4.content")}</p>
          <p>{t("legal:privacy.chapter4.content2")}</p>

          <h2 id="chapter5">{t("legal:privacy.chapter5.title")}</h2>
          <p>{t("legal:privacy.chapter5.content")}</p>
          <p>
            <Trans i18nKey="legal:privacy.chapter5.list1" />
          </p>
          <p>
            <Trans i18nKey="legal:privacy.chapter5.list2" />
          </p>
          <p>
            <Trans i18nKey="legal:privacy.chapter5.list3" />
          </p>
          <p>
            <Trans i18nKey="legal:privacy.chapter5.list4" />
          </p>
          <p>
            <Trans i18nKey="legal:privacy.chapter5.list5" />
          </p>
          <p>
            <Trans i18nKey="legal:privacy.chapter5.list6" />
          </p>

          <h2 id="chapter6">{t("legal:privacy.chapter6.title")}</h2>
          <p>{t("legal:privacy.chapter6.content")}</p>
          <p>
            <Trans i18nKey="legal:privacy.chapter6.link">
              For further information, visit{" "}
              <a
                href="//en.wikipedia.org/wiki/HTTP_cookie"
                rel="noreferrer"
                target="_blank"
              >
                wikipedia
              </a>
              .
            </Trans>
          </p>

          <h2 id="chapter7">{t("legal:privacy.chapter7.title")}</h2>
          <p>{t("legal:privacy.chapter7.content")}</p>
          <ul>
            <li>{t("legal:privacy.chapter7.list1")}</li>
            <li>{t("legal:privacy.chapter7.list2")}</li>
          </ul>

          <h2 id="chapter8">{t("legal:privacy.chapter8.title")}</h2>
          <p>{t("legal:privacy.chapter8.content")}</p>
          <ul>
            <li>{t("legal:privacy.chapter8.list1")}</li>
          </ul>

          <h2 id="chapter9">{t("legal:privacy.chapter9.title")}</h2>
          <p>{t("legal:privacy.chapter9.content")}</p>

          <h2 id="chapter10">{t("legal:privacy.chapter10.title")}</h2>
          <p>{t("legal:privacy.chapter10.content")}</p>

          <h2 id="chapter11">{t("legal:privacy.chapter11.title")}</h2>
          <p>{t("legal:privacy.chapter11.content")}</p>

          <h2 id="chapter12">{t("legal:privacy.chapter12.title")}</h2>
          <p>{t("legal:privacy.chapter12.content")}</p>
        </div>
      </div>
    </div>
  );
}
