const fs = require("fs");
const path = require("path");

const searchDirs = ["./"];

function getHtmlFiles(dirs) {
    let htmlFiles = [];
    dirs.forEach((dir) => {
        if (fs.existsSync(dir)) {
            fs.readdirSync(dir).forEach((file) => {
                const fullPath = path.join(dir, file);
                if (fs.statSync(fullPath).isDirectory()) {
                    htmlFiles = htmlFiles.concat(getHtmlFiles([fullPath]));
                } else if (file.endsWith(".html")) {
                    htmlFiles.push(fullPath);
                }
            });
        }
    });
    return htmlFiles;
}

const files = getHtmlFiles(searchDirs);

const componentsDir = "components";
const header = fs.readFileSync(`${componentsDir}/header.html`, "utf8");
const footer = fs.readFileSync(`${componentsDir}/footer.html`, "utf8");
const links = fs.readFileSync(`${componentsDir}/head.html`, "utf8");
// const bread_crumbs = fs.readFileSync(`${componentsDir}/bread-crumbs.html`, "utf8");
const block_contacts = fs.readFileSync(`${componentsDir}/block-contacts.html`, "utf8");
//
files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  content = content
      .replace(/<header[\s\S]*?<\/header>/gi, header)
      .replace(/<footer[\s\S]*?<\/footer>/gi, footer)
      .replace(/<!-- global options -->[\s\S]*?<!--finish global options-->/gi, links)
// //       .replace(/<section class="bread-crumbs"[\s\S]*?<\/section>/gi, bread_crumbs)
      .replace(/<section id="quote"[\s\S]*?<\/section>/gi, block_contacts);
  fs.writeFileSync(file, content, "utf8");
  console.log(`Обновлен файл: ${file}`);
});
// //
console.log("HTML components updated!");