import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

import Logo from "@/og/components/Logo";

export const runtime = "edge";

export async function GET(
  request: Request,
  props: { params: Promise<{ slug: string }> },
) {
  const params = await props.params;
  const slug = params.slug;

  const fontData = await fetch(
    new URL("@/assets/JetBrainsMono-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  try {
    const { searchParams } = new URL(request.url);

    const themeOptions = {
      dark: {
        fill: "stone",
        backgroundColor: "#16161D",
        color: "#F5F5F5",
      },
      light: {
        fill: "stone",
        backgroundColor: "#fafafa",
        color: "#09090b",
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
            <h2 tw="text-8xl tracking-tight font-extrabold">{title}</h2>
          </div>
          <div tw="w-full flex items-center justify-end">
            <h3 tw="text-4xl tracking-tight font-semibold pr-6">Jp Valery</h3>
            <Logo />
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
