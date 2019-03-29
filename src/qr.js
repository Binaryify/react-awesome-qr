import React, { useState, memo } from "react";
import { toBoolean } from "./lib/util.js";
import AwesomeQRCode from "./lib/awesome-qr";
import imgLoaded from "./lib/imgLoaded";
import readAsArrayBuffer from "./lib/readAsArrayBuffer";

function ReactAwesomeQr(props) {
  const [imgSrc, setImgSrc] = useState("");
  if (props.gifBgSrc) {
    (async function() {
      const gifImg = await readAsArrayBuffer(props.gifBgSrc);
      const logoImg = await imgLoaded(props.logoSrc);

      renderQr(props, undefined, logoImg, gifImg, (dataURI, qid) => {
        setImgSrc(dataURI);
        props.callback && props.callback(dataURI, qid);
      });
    })();
  } else {
    (async function() {
      const bgImg = await imgLoaded(props.bgSrc);
      const logoImg = await imgLoaded(props.logoSrc);
      renderQr(props, bgImg, logoImg, null, (dataURI, qid) => {
        setImgSrc(dataURI);
        props.callback && props.callback(dataURI, qid);
      });
    })();
  }

  if (imgSrc) {
    return <img src={imgSrc} alt="qr" />;
  } else {
    return false;
  }
}

function renderQr(props, img, logoImg, gifBgSrc, cb) {
  new AwesomeQRCode().create({
    gifBackground: gifBgSrc || undefined,
    text: props.text,
    size: props.size || 200,
    margin: props.margin === 0 ? 0 : 20,
    colorDark: props.colorDark || "#000000",
    colorLight: props.colorLight || "#FFFFFF",
    backgroundColor: props.backgroundColor || "#FFFFFF",
    backgroundImage: img || undefined,
    backgroundDimming: props.backgroundDimming || "rgba(0,0,0,0)",
    logoImage: logoImg || undefined,
    logoScale: props.logoScale || 0.2,
    logoBackgroundColor: props.logoBackgroundColor || "rgb(255,255,255)",
    correctLevel: props.correctLevel || 1,
    logoMargin: props.logoMargin || 0,
    logoCornerRadius: props.logoCornerRadius || 8,
    whiteMargin: toBoolean(props.whiteMargin) || true,
    dotScale: props.dotScale || 1,
    autoColor: toBoolean(props.autoColor) || true,
    binarize: toBoolean(props.binarize) || false,
    binarizeThreshold: props.binarizeThreshold || 128,
    callback: function(dataURI) {
      cb(dataURI, props.qid);
    }
  });
}

export default memo(ReactAwesomeQr);
