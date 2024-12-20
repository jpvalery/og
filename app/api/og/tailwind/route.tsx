import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const themeOptions = {
      verdant: {
        fill: "verdant",
        backgroundColor: "#0B353B",
        color: "#E4FFCE",
      },
      evergreen: {
        fill: "evergreen",
        backgroundColor: "#E4FFCE",
        color: "#0B353B",
      },
      dark: {
        fill: "verdant",
        backgroundColor: "#0B353B",
        color: "#E4FFCE",
      },
      light: {
        fill: "evergreen",
        backgroundColor: "#E4FFCE",
        color: "#0B353B",
      },
    };

    // ?theme=<theme>
    const hasTheme = searchParams.has("theme");
    const themeValue =
      hasTheme && searchParams.get("theme") != null
        ? searchParams.get("theme")
        : "verdant";

    const theme =
      //@ts-ignore
      hasTheme && themeOptions[themeValue]
        ? //@ts-ignore
          themeOptions[themeValue]
        : themeOptions["verdant"];

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Hello world";

    // ?title=<title>
    const hasImage = searchParams.has("image");
    //@ts-ignore
    const image = hasTitle ? searchParams.get("image") : null;

    console.log(image);

    return new ImageResponse(
      (
        // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "space-between",
            backgroundColor: theme.backgroundColor,
            color: theme.color,
            padding: "5%",
          }}
        >
          <div tw="flex flex-row items-center justify-start pt-20">
            <h2 tw="text-6xl tracking-tight font-extrabold">{title}</h2>
          </div>
          <div tw="w-full flex items-center justify-end">
            <></>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
