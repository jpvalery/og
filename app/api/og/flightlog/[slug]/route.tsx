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
          <div tw="flex flex-row items-center justify-start pt-20">
            <h2 tw="text-7xl tracking-tight font-extrabold">{title}</h2>
          </div>
          <div tw="w-full flex items-center justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="128"
              height="128"
            >
              <path
                d="M88,224l24-24V176l24-24,48,72,24-24-32-88,33-31A24,24,0,0,0,175,47L144,80,56,48,32,72l72,48L80,144H56L32,168l40,16Z"
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
