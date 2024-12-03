import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
const PORT = process.env.PORT;

// Get path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create server with node

const server = http.createServer(async (req, res) => {
  try {
    //check if GET request
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/contact") {
        filePath = path.join(__dirname, "public", "contact.html");
      } else {
        throw new Error("Not Found");
      }
      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Not Found  </h1>");
  }
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
