"use client";

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

// Photo pixels are usually too dark/desaturated to read as a glow. Push
// saturation and lightness into a visible range while keeping the hue,
// so the ambient effect reads as vivid color rather than dim mud.
function vivify(r: number, g: number, b: number) {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rN:
        h = ((gN - bN) / d) % 6;
        break;
      case gN:
        h = (bN - rN) / d + 2;
        break;
      default:
        h = (rN - gN) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  const s2 = Math.min(1, Math.max(s * 1.5, 0.6));
  const l2 = Math.min(0.62, Math.max(l, 0.38));

  const c = (1 - Math.abs(2 * l2 - 1)) * s2;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l2 - c / 2;
  let [r2, g2, b2] = [0, 0, 0];
  if (h < 60) [r2, g2, b2] = [c, x, 0];
  else if (h < 120) [r2, g2, b2] = [x, c, 0];
  else if (h < 180) [r2, g2, b2] = [0, c, x];
  else if (h < 240) [r2, g2, b2] = [0, x, c];
  else if (h < 300) [r2, g2, b2] = [x, 0, c];
  else [r2, g2, b2] = [c, 0, x];

  return rgbToHex(
    Math.round((r2 + m) * 255),
    Math.round((g2 + m) * 255),
    Math.round((b2 + m) * 255),
  );
}

/**
 * Samples an image client-side and returns its most common vivid colors.
 * Resolves to an empty array (never rejects) if the image can't be read —
 * e.g. blocked by CORS — so callers can fall back to a static palette.
 */
export function extractPalette(src: string, count = 3): Promise<string[]> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";

    img.onload = () => {
      try {
        const size = 32;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve([]);

        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        const buckets = new Map<string, { r: number; g: number; b: number; n: number }>();
        for (let i = 0; i < data.length; i += 4) {
          const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
          if (a < 200) continue;

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;
          if (saturation < 0.15 || max < 30 || max > 250) continue;

          const key = `${r >> 5}-${g >> 5}-${b >> 5}`;
          const bucket = buckets.get(key) ?? { r: 0, g: 0, b: 0, n: 0 };
          bucket.r += r;
          bucket.g += g;
          bucket.b += b;
          bucket.n += 1;
          buckets.set(key, bucket);
        }

        const colors = [...buckets.values()]
          .sort((a, b) => b.n - a.n)
          .slice(0, count)
          .map(({ r, g, b, n }) => vivify(r / n, g / n, b / n));

        resolve(colors);
      } catch {
        resolve([]);
      }
    };

    img.onerror = () => resolve([]);
    img.src = src;
  });
}
