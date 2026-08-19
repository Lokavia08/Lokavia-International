#!/usr/bin/env node

import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OUTPUT_DIR = path.join(__dirname, "../public/blog");

async function generateGingerCoverImage() {
  if (!GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY not found in environment variables");
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const prompt = `Create a professional, premium food photography style blog cover image (1200x630px) for a blog article about "Ginger Powder Applications in Food Manufacturing".

Key composition elements:
- Central focus: High-quality dehydrated ginger powder displayed on an elegant white ceramic plate or glass bowl, showing natural golden-brown color and fine texture
- Scattered around: Whole ginger root pieces, ground ginger powder trail, showing authenticity and quality
- Background (soft focus/blurred): Hint of bakery items (artisan ginger cookies), a glass of ginger beverage (amber-colored ginger ale), and a functional snack bar
- Professional food styling: Natural window lighting, soft shadows, warm color temperature
- Color palette: Warm golden-brown tones, cream whites, natural lighting, rich browns
- Modern minimalist design: Clean, premium, elevated
- Text overlay safe zone: Keep top 200px clear for blog title
- Photography style: Premium food photography, editorial quality, appetizing presentation

The image should convey: Quality, authenticity, versatility across food applications, premium ingredient sourcing

Dimensions: 1200x630 pixels (standard blog hero image)
Style: Professional, modern, food-focused, commercial quality`;

  try {
    console.log("🎨 Generating ginger powder blog cover image via Gemini API...");
    console.log(`📍 Output directory: ${OUTPUT_DIR}`);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ API Error (${response.status}):`, error);
      process.exit(1);
    }

    const data = await response.json();
    console.log("✅ Image generation successful!");

    // Extract image data from response
    if (
      data.candidates &&
      data.candidates[0]?.content?.parts[0]?.inlineData?.data
    ) {
      const imageData = Buffer.from(
        data.candidates[0].content.parts[0].inlineData.data,
        "base64"
      );
      const outputPath = path.join(
        OUTPUT_DIR,
        "ginger-powder-applications-food-manufacturing.jpg"
      );

      fs.writeFileSync(outputPath, imageData);
      console.log(`✅ Image saved to: ${outputPath}`);
      console.log(`📊 Image size: ${imageData.length} bytes`);

      return outputPath;
    } else if (data.error) {
      console.error(`❌ Gemini API Error:`, data.error.message);
      process.exit(1);
    } else {
      console.error(`❌ Unexpected response format:`, JSON.stringify(data));
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Error generating image:`, error);
    process.exit(1);
  }
}

// Run the function
generateGingerCoverImage();
