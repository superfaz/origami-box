import React from 'react';

export default function Process() {
  const keys = Object.keys(process.env);
  const values = keys
    .map((key, index) => [
      { type: 'dt', key: 't' + index, value: key },
      { type: 'dd', key: 'd' + index, value: process.env[key] }
    ]).flat();
  return (
    <div className="container">
      <h1>Defined process variables</h1>
      <dl>
        {values.map(item =>
          React.createElement(item.type, { key: item.key }, item.value))}
      </dl>
    </div>
  );
}
