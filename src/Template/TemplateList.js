import Loader from "react-loader-spinner";
import { useTemplates } from "../hooks";
import { TemplateMiniature } from "./TemplateMiniature";

export default function TemplateList({ limit, children }) {
  const { templates, isLoading, isError } = useTemplates(limit);

  return (
    <>
      {templates.length > 0 && children}
      <div className="row">
        {templates.map((template, index) => (
          <TemplateMiniature key={index} template={template} index={index} />
        ))}
        {isError && (
          <div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
            An error occurs while loading remote data.
          </div>
        )}
        {isLoading && (
          <div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
            <Loader
              className="mt-2"
              type="Bars"
              color="#666"
              height="1.5rem"
              timeout={0}
            />
          </div>
        )}
      </div>
    </>
  );
}
