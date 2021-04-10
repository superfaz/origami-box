import ReactJson from "react-json-view";
import env from "./env";

export default function ProcessPage() {
  return (
    <div className="container">
      <h1>Defined process variables</h1>
      <div className="row">
        <div className="col-md-6">
          <ReactJson src={process.env} name="process.env" />
        </div>
        <div className="col-md-6">
          <ReactJson src={env} name="env.js" />
        </div>
      </div>
    </div>
  );
}
