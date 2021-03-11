export default function Home() {
  return (
    <div className="container">
      <h1>Logo</h1>
      <p>
        This page provides the visualisation of the website logo and its
        declination based on usage.
      </p>
      <h3>With background</h3>
      <p>
        To be used when transparency is not possible or for logo that will stand
        on its own (app, shortcut, favicon).
      </p>
      <div>
        <img
          alt="logo-plain 512x512"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-plain.svg"
        />
        <img
          alt="logo-plain 192x192"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-plain.svg"
          width="192"
        />
        <img
          alt="logo-plain 64x64"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-plain.svg"
          width="64"
        />
        <img
          alt="logo-plain 30x30"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-plain.svg"
          width="30"
        />
      </div>
      <h3>Transparent on light background</h3>
      <p>When used inside a page, which have a light background.</p>
      <div className="bg-light">
        <img
          alt="logo-bglight 512x512"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-bglight.svg"
        />
        <img
          alt="logo-bglight 192x192"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-bglight.svg"
          width="192"
        />
        <img
          alt="logo-bglight 64x64"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-bglight.svg"
          width="64"
        />
        <img
          alt="logo-bglight 30x30"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-bglight.svg"
          width="30"
        />
      </div>
      <h3>Transparent on dark background</h3>
      <p>When used inside a page, which have a dark background.</p>
      <div className="bg-dark">
        <img
          alt="logo-bgdark 512x512"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-bgdark.svg"
        />
        <img
          alt="logo-bgdark 192x192"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-bgdark.svg"
          width="192"
        />
        <img
          alt="logo-bgdark 64x64"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-bgdark.svg"
          width="64"
        />
        <img
          alt="logo-bgdark 30x30"
          className="m-3"
          style={{ border: "1px solid red" }}
          src="/logo-bgdark.svg"
          width="30"
        />
      </div>
    </div>
  );
}
