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
    // Check if sourceStatic exists
    if (await fs.pathExists(sourceStatic)) {
      // Ensure the destination directories exist
      await fs.ensureDir(destStatic);
      // Copy .next/static without overwriting other files
      await fs.copy(sourceStatic, destStatic, { overwrite: true });
      console.log("Copied .next/static to standalone/.next/static");
    } else {
      console.log("Source .next/static does not exist, skipping.");
    }

    // Check if sourcePublic exists
    if (await fs.pathExists(sourcePublic)) {
      // Ensure the destination directories exist
      await fs.ensureDir(destPublic);
      // Copy public folder without overwriting other files
      await fs.copy(sourcePublic, destPublic, { overwrite: true });
      console.log("Copied public folder to standalone/public");
    } else {
      console.log("Source public folder does not exist, skipping.");
    }
  } catch (error) {
    console.error("Error copying assets:", error);
  }
}

// Call the copy function
copyAssets();
