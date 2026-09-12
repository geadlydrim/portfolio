import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fcfaf0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            padding: "0 80px",
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 800,
              fontStyle: "italic",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              color: "#2b2b2b",
            }}
          >
            {site.name}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "38%",
            background: "#ffb900",
            padding: "0 80px",
          }}
        >
          <span
            style={{
              fontSize: 28,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#2b2b2b",
            }}
          >
            {site.role}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
