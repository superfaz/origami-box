import JsonDisplay from "./Generic/JsonDisplay";
import env from "./env";

export default function ProcessPage() {
  return (
    <div className="container">
      <h1>Defined process variables</h1>
      <div className="row">
        <div className="col-md-6">
          <JsonDisplay json={process.env} title="process.env" />
        </div>
        <div className="col-md-6">
          <JsonDisplay json={env} title="env.js" />
        </div>
      </div>
    </div>
  );
}
