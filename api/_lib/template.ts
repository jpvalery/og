import { readFileSync } from "fs";
import marked from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString("base64");
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  "base64"
);
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  "base64"
);
const poppins = readFileSync(
  `${__dirname}/../_fonts/Poppins-Regular.woff2`
).toString("base64");
const poppinsbold = readFileSync(
  `${__dirname}/../_fonts/Poppins-Bold.woff2`
).toString("base64");

function getCss(theme: string, layout: string, fontSize: string) {
  let background = "#F7F8FA";
  let foreground = "#2F326A";

  if (theme === "dark") {
    background = "#2F326A";
    foreground = "#FFFFFF";
  }

  let fontFamily = "Poppins";

  let layoutCss = `
      .content {
      width: 100%;
      display: grid;
      grid-auto-flow: column;
      align-items: center;
      justify-items: start;
      gap: 0;
      padding: 0 !important;
      margin: 0;
    }

    .brand {
      width: 100%;
      display: grid;
      align-items: start;
      justify-items: end;
      padding: 0 !important;
      margin: 0;
      margin-top: 200px;
    }
    
    .bg-grid {
      background-image: url("https://og-cio.vercel.app/static/grid.svg");
      background-repeat: repeat !important;
      border-radius: 480px 480px 0 480px;
      position: absolute;
      width: 1090px;
      height: 860px;
      left: 100px;
      top: 140px !important;
      z-index: -1;
      background-size: 414px 414px;
      opacity: 0.5;
    }

    .logo {
      margin-right: 75px;
    }
  `;

  if (layout === "center") {
    layoutCss = `
    .content {
      width: 100%;
      display: grid;
      grid-auto-flow: row;
      align-items: center;
      justify-items: center;
      gap: 0;
      padding: 0 !important;
      margin: 0;
    }

    .logo {
      margin-right: 0 !important;
    }

    .images {
      display: grid;
      grid-auto-flow: column;
      align-items: center;
      gap: 75px;
      margin: 0;
      padding: 0;
    }

    .brand {
      width: 100%;
      display: grid;
      align-items: center;
      justify-items: center;
      padding: 0 !important;
      margin: 0;
    }
    
    .bg-grid {
      background-image: url("https://og-cio.vercel.app/static/grid.svg");
      background-repeat: repeat !important;
      position: absolute;
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      z-index: -1;
      background-size: 414px 414px;
      opacity: 0.5;
    }
  `;
  }

  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Poppins';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${poppins}) format('woff2');
    }

    @font-face {
        font-family: 'Poppins';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${poppinsbold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        height: 100vh;
        padding: 10%;
    }

    .main {
        display: grid;
        grid-flow: row;
        align-items: start;
        gap: 10;
        z-index: 9999 !important;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    ${layoutCss}

    .heading {
      font-family: ${fontFamily};
      font-size: ${sanitizeHtml(fontSize)};
      font-style: normal;
      color: ${foreground};
      line-height: 1.2;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, theme, layout, md, fontSize, images, widths, heights } =
    parsedReq;

  const logoUrl =
    theme === "light"
      ? "https://og-cio.vercel.app/static/logos/color.svg"
      : "https://og-cio.vercel.app/static/logos/white.svg";

  const bgGrid = theme === "light" ? `<div class="bg-grid"></div>` : "";

  const displayedImages =
    layout === "center"
      ? images
          .map(
            (img, i) => getPlusSign(i) + getImage(img, widths[i], heights[i])
          )
          .join("")
      : images
          .map((img, i) => getImage(img, widths[i], heights[i]))
          .slice(0, 1)
          .join("");

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, layout, fontSize)}
    </style>
    <body>
      <div class="main">
        <div class="content">
            <div class="images">
                  ${displayedImages}
            </div>
            <div class="heading">${emojify(
              md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
          </div>
        </div>
        <div class="brand">
          <img src=${logoUrl} width="auto" height="140" />
        </div>
      </div>
      ${bgGrid}
    </body>
</html>`;
}

function getImage(src: string, width = "auto", height = "225") {
  return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`;
}

function getPlusSign(i: number) {
  return i === 0 ? "" : '<div class="plus">+</div>';
}
