import React from "react";

export function Dimensions({ children }) {
  const count = React.Children.count(children);
  const style = count > 1 ? { width: `calc(100%/${count})` } : null;
  return (
    <>
      <div>
        {children.map((c, i) => (
          <label className="form-label" style={style} htmlFor={c.props.name}>
            {c.props.label}
          </label>
        ))}
      </div>
      <div className="input-group">
        {children.map((c, i) => React.cloneElement(c, { key: i, style }))}
      </div>
    </>
  );
}

export function Dimension({
  name,
  value,
  label,
  onChange = () => {},
  ...rest
}) {
  return (
    <input
      id={name}
      name={name}
      type="number"
      className="form-control"
      required
      min="1"
      step="0.01"
      aria-label={label}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}
