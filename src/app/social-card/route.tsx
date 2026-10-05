import { ImageResponse } from "next/og";

import { schoolConfig } from "@/config/school";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f7f3ec",
          color: "#1b1b4c",
          display: "flex",
          height: "100%",
          padding: "58px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid #8a2028",
            display: "flex",
            inset: "28px",
            opacity: 0.18,
            position: "absolute",
          }}
        />
        <div
          style={{
            alignItems: "center",
            background: "#8a2028",
            color: "#f7f3ec",
            display: "flex",
            fontFamily: "serif",
            fontSize: 52,
            height: 130,
            justifyContent: "center",
            letterSpacing: "-4px",
            width: 130,
          }}
        >
          VV
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: "44px",
            padding: "22px 0",
          }}
        >
          <div style={{ color: "#8a2028", display: "flex", fontSize: 22, fontWeight: 700, letterSpacing: "5px", textTransform: "uppercase" }}>
            Padhar, Betul
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "serif", fontSize: 66, fontWeight: 600, letterSpacing: "-3px", lineHeight: 0.95 }}>
              Veena Vadini
            </div>
            <div style={{ color: "#8a2028", display: "flex", fontFamily: "serif", fontSize: 66, fontWeight: 600, letterSpacing: "-3px", lineHeight: 0.95 }}>
              Public School
            </div>
            <div style={{ color: "#8a2028", display: "flex", fontSize: 27, marginTop: "20px" }}>
              {schoolConfig.tagline}
            </div>
          </div>
          <div style={{ color: "#1b1b4c", display: "flex", fontSize: 23, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
            {schoolConfig.motto}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
