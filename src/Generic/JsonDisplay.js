import objectMap from "../objectMap";
import './JsonDisplay.css';

export default function JsonDisplay({ json, title = "json" }) {
  if (json === null) {
    // null
    return (
      <div className="json-node">
        <div className="json-name">{title}</div>
        <div className="json-separator">:</div>
        <div className="json-value json-special"><em>null</em></div>
      </div>
    );
  }
  else if (typeof json === 'undefined') {
    // undefined
    return (
      <div className="json-node">
        <div className="json-name">{title}</div>
        <div className="json-separator">:</div>
        <div className="json-value json-special"><em>undefined</em></div>
      </div>
    );
  }
  else if (typeof json === 'object') {
    // array
    if (Array.isArray(json)) {
      <div className="json-node json-array">
        <div className="json-name">{title}</div>
        <div className="json-separator">:</div>
        <div className="json-value">
          {json.map((value, index) =>
            <JsonDisplay key={index} json={value} title={`[${index}]`} />
          )}
        </div>
      </div>
    }
    else {
      // object
      return (
        <div className="json-node json-object">
          <div className="json-name">{title}</div>
          <div className="json-separator">:</div>
          <div className="json-value">
            {objectMap(json, (value, key) =>
              <JsonDisplay key={key} json={value} title={key} />
            )}
          </div>
        </div>
      );
    }
  }
  else if (typeof json === 'string') {
    // string
    return (
      <div className="json-node">
        <div className="json-name">{title}</div>
        <div className="json-separator">:</div>
        <div className="json-value json-string">'{json}'</div>
      </div>
    );
  }
  else if (typeof json === 'boolean') {
    // boolean
    return (
      <div className="json-node">
        <div className="json-name">{title}</div>
        <div className="json-separator">:</div>
        <div className="json-value json-boolean">{json ? 'true' : 'false'}</div>
      </div>
    );
  }
  else {
    // other
    return (
      <div className="json-node">
        <div className="json-name">{title}</div>
        <div className="json-separator">:</div>
        <div className="json-value">{json}</div>
      </div>
    );
  }
}
