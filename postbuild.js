const fs = require("fs-extra");
const path = require("path");

// Define the paths
const sourceStatic = path.join(__dirname, ".next", "static");
const destStatic = path.join(
  __dirname,
  ".next",
  "standalone",
  ".next",
  "static"
);

const sourcePublic = path.join(__dirname, "public");
const destPublic = path.join(__dirname, ".next", "standalone", "public");

// Copy function to handle file transfers
async function copyAssets() {
  try {
    // Ensure the destination directories exist
    await fs.ensureDir(destStatic);
    await fs.ensureDir(destPublic);

    // Copy .next/static without overwriting other files
    await fs.copy(sourceStatic, destStatic, { overwrite: true });
    console.log("Copied .next/static to standalone/.next/static");

    // Copy public folder without overwriting other files
    await fs.copy(sourcePublic, destPublic, { overwrite: true });
    console.log("Copied public folder to standalone/public");
  } catch (error) {
    console.error("Error copying assets:", error);
  }
}

// Call the copy function
copyAssets();
