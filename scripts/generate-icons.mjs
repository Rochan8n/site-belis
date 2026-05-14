// Generates favicon + PWA + logo assets from source PNGs.
// Usage: node scripts/generate-icons.mjs
//
// Sources expected at:
//   ./assets/favicon-master.png
//   ./assets/logo-navy.png
//
// Writes into ./public

import sharp from "sharp";
import pngToIco from "png-to-ico";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "src", "app");
const ASSETS_DIR = path.join(ROOT, "assets");

const FAVICON_SRC = path.join(ASSETS_DIR, "favicon-master.png");
const LOGO_SRC = path.join(ASSETS_DIR, "logo-navy.png");

const NAVY = { r: 5, g: 5, b: 8, alpha: 1 };

/**
 * Crops the source to a centered square (largest possible) and resizes to the
 * given size. Used for the favicon master which is rendered on solid navy and
 * must remain a perfect square.
 */
async function squarePng(srcPath, size, outPath) {
  const meta = await sharp(srcPath).metadata();
  const side = Math.min(meta.width, meta.height);
  const left = Math.floor((meta.width - side) / 2);
  const top = Math.floor((meta.height - side) / 2);

  await sharp(srcPath)
    .extract({ left, top, width: side, height: side })
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log(`  ✓ ${path.relative(ROOT, outPath)} (${size}x${size})`);
}

/**
 * Embeds the wide logo on a square canvas of `size`, padding with solid navy
 * (matches site background). Used for the JSON-LD `logo.png` reference —
 * Google prefers a square logo near 512x512 with a clean background.
 */
async function logoSquare(srcPath, size, outPath) {
  await sharp(srcPath)
    .resize(size, size, {
      fit: "contain",
      background: NAVY,
    })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log(`  ✓ ${path.relative(ROOT, outPath)} (${size}x${size})`);
}

/**
 * Generates an OG image (1200x630) by cover-cropping the source logo (which
 * already has a navy background) and writing it as JPEG.
 */
async function ogImage(srcPath, outPath) {
  await sharp(srcPath)
    .resize(1200, 630, {
      fit: "cover",
      position: "center",
      background: NAVY,
    })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outPath);

  console.log(`  ✓ ${path.relative(ROOT, outPath)} (1200x630 jpeg)`);
}

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true });
  await mkdir(APP_DIR, { recursive: true });
  await mkdir(path.join(PUBLIC_DIR, "images"), { recursive: true });

  console.log("Favicons (square, solid navy bg):");
  await squarePng(FAVICON_SRC, 16, path.join(PUBLIC_DIR, "favicon-16x16.png"));
  await squarePng(FAVICON_SRC, 32, path.join(PUBLIC_DIR, "favicon-32x32.png"));
  await squarePng(FAVICON_SRC, 48, path.join(PUBLIC_DIR, "favicon-48x48.png"));

  console.log("\nfavicon.ico (multi-res, browsers prefer this over PNG alone):");
  const icoBuf = await pngToIco([
    await readFile(path.join(PUBLIC_DIR, "favicon-16x16.png")),
    await readFile(path.join(PUBLIC_DIR, "favicon-32x32.png")),
    await readFile(path.join(PUBLIC_DIR, "favicon-48x48.png")),
  ]);
  const icoPath = path.join(PUBLIC_DIR, "favicon.ico");
  await writeFile(icoPath, icoBuf);
  console.log(`  ✓ ${path.relative(ROOT, icoPath)}`);
  // App Router: app/favicon.ico wins over public/ — keep in sync with public
  const appIcoPath = path.join(APP_DIR, "favicon.ico");
  await writeFile(appIcoPath, icoBuf);
  console.log(`  ✓ ${path.relative(ROOT, appIcoPath)}`);

  await squarePng(FAVICON_SRC, 180, path.join(PUBLIC_DIR, "apple-touch-icon.png"));
  await squarePng(
    FAVICON_SRC,
    192,
    path.join(PUBLIC_DIR, "android-chrome-192x192.png")
  );
  await squarePng(
    FAVICON_SRC,
    512,
    path.join(PUBLIC_DIR, "android-chrome-512x512.png")
  );

  console.log("\nBrand logo (square, transparent bg, for JSON-LD):");
  await logoSquare(LOGO_SRC, 512, path.join(PUBLIC_DIR, "logo.png"));

  console.log("\nOG image (1200x630 jpeg):");
  await ogImage(LOGO_SRC, path.join(PUBLIC_DIR, "images", "og-image.jpg"));

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
