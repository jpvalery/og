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
    new URL("@/assets/JetBrainsMono-SemiBold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  try {
    const { searchParams } = new URL(request.url);

    const themeOptions = {
      dark: {
        backgroundColor: "#16161D",
        color: "#D8D8C7",
      },
      light: {
        backgroundColor: "#D8D8C7",
        color: "#16161D",
      },
    };

    // ?theme=<theme>
    const hasTheme = searchParams.has("theme");
    const themeValue =
      hasTheme && searchParams.get("theme") != null
        ? searchParams.get("theme")
        : "dark";

    const theme =
      //@ts-ignore
      hasTheme && themeOptions[themeValue]
        ? //@ts-ignore
          themeOptions[themeValue]
        : themeOptions["dark"];

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
            fontFamily: '"JetBrainsMono"',
            backgroundColor: theme.backgroundColor,
            color: theme.color,
            padding: "5%",
          }}
        >
          <div tw="flex flex-row items-center justify-start pt-20">
            <h2 tw="text-7xl tracking-tight font-extrabold text-[#E88B6A]">
              {title}
            </h2>
          </div>
          <div tw="w-full flex items-center justify-end">
            <h3 tw="text-4xl tracking-tight font-semibold pr-6">Jp Valery</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              height="128"
              width="128"
            >
              <circle
                cx="128"
                cy="128"
                r="96"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="10"
              />
              <line
                x1="128"
                y1="32"
                x2="164.68"
                y2="134.7"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="10"
              />
              <line
                x1="44.86"
                y1="80"
                x2="152.14"
                y2="99.58"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="10"
              />
              <line
                x1="44.86"
                y1="176"
                x2="115.46"
                y2="92.89"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="10"
              />
              <line
                x1="128"
                y1="224"
                x2="91.32"
                y2="121.3"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="10"
              />
              <line
                x1="211.14"
                y1="176"
                x2="103.86"
                y2="156.42"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="10"
              />
              <line
                x1="211.14"
                y1="80"
                x2="140.54"
                y2="163.11"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="10"
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
            name: "JetBrainsMono",
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
