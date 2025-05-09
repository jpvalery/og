import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(
  request: Request,
  props: { params: Promise<{ slug: string }> },
) {
  const params = await props.params;
  const slug = params.slug;

  const fontData = await fetch(
    new URL("@/assets/Geist-SemiBold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  try {
    const { searchParams } = new URL(request.url);

    const themeOptions = {
      light: {
        backgroundColor: "#F5F5F5",
        color: "#16161D",
      },
    };

    // ?theme=<theme>
    const hasTheme = searchParams.has("theme");
    const themeValue =
      hasTheme && searchParams.get("theme") != null
        ? searchParams.get("theme")
        : "light";

    const theme =
      //@ts-ignore
      hasTheme && themeOptions[themeValue]
        ? //@ts-ignore
          themeOptions[themeValue]
        : themeOptions["light"];

    // Title (inferred from slug but can be overrided)
    const hasTitle = slug ? true : searchParams.has("title");
    const title = hasTitle
      ? slug
        ? slug
        : hasTitle
          ? searchParams.get("title")?.slice(0, 100)
          : "Hello world"
      : "Hello world";

    // Image
    const hasImage = searchParams.has("image");
    //@ts-ignore
    const image = hasTitle ? searchParams.get("image") : null;

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
            fontFamily: '"Geist"',
            backgroundColor: theme.backgroundColor,
            color: theme.color,
            padding: "5%",
          }}
        >
          <div tw="flex flex-col items-start justify-center pt-20">
            <h2 tw="text-5xl tracking-tight font-extrabold">TrimCarbon</h2>
            <h2 tw="text-7xl tracking-tight font-extrabold">{title}</h2>
          </div>
          <div tw="w-full flex items-center justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="128"
              height="128"
            >
              <rect width="256" height="256" fill="none" />
              <path
                d="M148.1,61.86l-76-44.75a8,8,0,0,0-11,2.83l-12,20.34a8,8,0,0,0,2.84,11l152.1,89.52a8,8,0,0,1,2.84,11l-12,20.34a8,8,0,0,1-11,2.83l-76-44.75"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <path
                d="M93.86,75.9l-44.75,76a8,8,0,0,0,2.83,11l20.34,12a8,8,0,0,0,11-2.84L172.76,20a8,8,0,0,1,11-2.84l20.34,12a8,8,0,0,1,2.83,11l-44.75,76"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="32"
                y1="232"
                x2="224"
                y2="232"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="166.36"
                y1="164.55"
                x2="176"
                y2="232"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="90.27"
                y1="160.11"
                x2="80"
                y2="232"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
            </svg>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Geist",
            data: fontData,
            style: "normal",
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
