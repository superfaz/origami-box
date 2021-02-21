import { useState } from "react";
import { TwitterPicker } from "react-color";
import { useTranslation } from "react-i18next";

import './ColorPicker.css';

export default function ColorPicker({ color, onColorChange, ...rest }) {
  const { t } = useTranslation();
  const [displayPopup, setDisplayPopup] = useState(false);

  let colorStyle = {
    background: color,
  };

  return (
    <div className="color-picker" {...rest}>
      <button type="button" className="form-control" title={t('colorpicker.title')} onClick={() => setDisplayPopup(!displayPopup)}>
        <div className="color-picker-color" style={colorStyle} />
      </button>
      {displayPopup &&
        <div className="color-picker-popover">
          <div className="color-picker-cover" onClick={() => setDisplayPopup(false)} />
          <TwitterPicker width="312px"
            colors={['#000000', '#FFFFFF', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
            color={color} onChangeComplete={onColorChange} />
        </div>
      }
    </div>
  );
}
