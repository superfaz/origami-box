import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1>Logo</h1>
      <p>This page provides the visualisation of the website logo and its declination based on usage.</p>
      <h3>With background</h3>
      <p>To be used when transparency is not possible or for logo that will stand on its own (app, shortcut, favicon).</p>
      <div>
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-plain.svg" />
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-plain.svg" width="192" />
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-plain.svg" width="64" />
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-plain.svg" width="30" />
      </div>
      <h3>Transparent on light background</h3>
      <p>When used inside a page, which have a light background.</p>
      <div className="bg-light">
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-bglight.svg" />
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-bglight.svg" width="192" />
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-bglight.svg" width="64" />
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-bglight.svg" width="30" />
      </div>
      <h3>Transparent on dark background</h3>
      <p>When used inside a page, which have a dark background.</p>
      <div className="bg-dark">
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-bgdark.svg" />
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-bgdark.svg" width="192" />
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-bgdark.svg" width="64" />
        <img className="m-3" style={{ border: '1px solid red' }} src="/logo-bgdark.svg" width="30" />
      </div>
    </div>
  );
}
