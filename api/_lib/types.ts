export type FileType = "png" | "jpeg";
export type Theme = "light" | "dark";
export type Layout = "left" | "center";

export interface ParsedRequest {
  fileType: FileType;
  text: string;
  theme: Theme;
  layout: Layout;
  md: boolean;
  fontSize: string;
  images: string[];
  widths: string[];
  heights: string[];
}
