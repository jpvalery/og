import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest, Theme } from "./types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);
  const { fontSize, images, widths, heights, theme, md } = query || {};

  if (Array.isArray(fontSize)) {
    throw new Error("Expected a single fontSize");
  }
  if (Array.isArray(theme)) {
    throw new Error("Expected a single theme");
  }

  const arr = (pathname || "/").slice(1).split(".");
  let extension = "";
  let text = "";
  if (arr.length === 0) {
    text = "";
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "png",
    text: decodeURIComponent(text),
    theme:
      theme === "dotme"
        ? "dotme"
        : theme === "dotphoto"
        ? "dotphoto"
        : theme === "dotclub"
        ? "dotclub"
        : theme === "flightlog"
        ? "flightlog"
        : "dotme",
    md: md === "1" || md === "true",
    fontSize: fontSize || "96px",
    images: getArray(images),
    widths: getArray(widths),
    heights: getArray(heights),
  };
  parsedRequest.images = getDefaultImages(
    parsedRequest.images,
    parsedRequest.theme
  );
  return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === "undefined") {
    return [];
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  } else {
    return [stringOrArray];
  }
}

function getDefaultImages(images: string[], theme: Theme): string[] {
  const defaultImage =
    theme === "dotme"
      ? "https://og.jpvalery.me/static/raccoon.svg"
      : theme === "dotphoto"
      ? "https://og.jpvalery.me/static/camera.svg"
      : theme === "dotclub"
      ? "https://og.jpvalery.me/static/mtlphotoclub.svg"
      : theme === "flightlog"
      ? "https://og.jpvalery.me/static/plane.svg"
      : "dotme";

  if (!images || !images[0]) {
    return [defaultImage];
  }

  return images;
}
