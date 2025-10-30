// deploy.js
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const distPath = path.resolve("dist/public");
const docsPath = path.resolve("docs");
const cnamePath = path.join(docsPath, "CNAME");

function copyRecursive(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
        const srcItem = path.join(src, item);
        const destItem = path.join(dest, item);
        const stat = fs.statSync(srcItem);
        if (stat.isDirectory()) copyRecursive(srcItem, destItem);
        else fs.copyFileSync(srcItem, destItem);
    }
}

try {
    console.log("🚀 Building project...");
    execSync("npm run build", { stdio: "inherit" });

    console.log("🧹 Cleaning old docs folder...");
    fs.rmSync(docsPath, { recursive: true, force: true });

    console.log("📂 Copying dist/public → docs ...");
    copyRecursive(distPath, docsPath);

    console.log("🧾 Creating 404.html (SPA fallback)...");
    const indexHtml = fs.readFileSync(path.join(docsPath, "index.html"));
    fs.writeFileSync(path.join(docsPath, "404.html"), indexHtml);

    console.log("🌐 Adding CNAME and .nojekyll ...");
    fs.writeFileSync(cnamePath, "alpinism-utilitar.pro\n");
    fs.writeFileSync(path.join(docsPath, ".nojekyll"), "");

    console.log("✅ Done! Folder 'docs' ready for GitHub Pages!");
} catch (err) {
    console.error("❌ Deploy failed:", err);
    process.exit(1);
}
