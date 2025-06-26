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
    new URL("@/assets/JetBrainsMono-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  try {
    const { searchParams } = new URL(request.url);

    const theme = {
      backgroundColor: "#09090b",
      color: "#ffba00",
    };

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
          <div tw="flex flex-col items-start justify-center pt-20">
            <h2 tw="text-5xl tracking-tight font-extrabold uppercase">
              Next Departures
            </h2>
            <h2 tw="text-7xl tracking-tight font-extrabold">{title}</h2>
          </div>
          <div tw="w-full flex items-center justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M229.11 70.82A16 16 0 0 0 216 64h-80V32h16a8 8 0 0 0 0-16h-48a8 8 0 0 0 0 16h16v32H40a16 16 0 0 0-15 21.47l26.19 72a16 16 0 0 0 15 10.53H96v64a8 8 0 0 0 16 0v-64h32v64a8 8 0 0 0 16 0v-64h29.82a16 16 0 0 0 15-10.53l26.19-72a16 16 0 0 0-1.9-14.65M110.68 152l-13.1-72h60.84l-13.1 72ZM40 80h41.32l13.09 72H66.18Zm149.82 72h-28.23l13.09-72H216Z"
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
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
