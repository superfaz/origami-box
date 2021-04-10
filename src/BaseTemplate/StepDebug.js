import { useTemplate } from "../hooks";
import ReactJson from "react-json-view";

export default function StepDebug() {
  const { template } = useTemplate();

  return (
    <>
      <div className="col-12">
        <ReactJson name="template" src={template} />
      </div>
    </>
  );
}
