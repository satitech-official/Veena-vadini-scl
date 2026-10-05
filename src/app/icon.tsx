import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#8a2028",
          color: "#f7f3ec",
          display: "flex",
          fontFamily: "serif",
          fontSize: 30,
          fontWeight: 600,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-2px",
          width: "100%",
        }}
      >
        VV
      </div>
    ),
    size,
  );
}
