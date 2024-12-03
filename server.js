import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, name: "timothy" },
  { id: 2, name: "victor" },
  { id: 3, name: "temi" },
];

// create a simple restapi
const server = createServer(async (req, res) => {
  //get the entire users
  if (req.url === "/api/users" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(users));
    res.end();
    //get the user by id
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    const user = users.find((user) => user.id === parseInt(id));
    res.setHeader("Content-Type", "application/json");
    if (user) {
      res.write(JSON.stringify(user));
    } else {
      res.statusCode = 404;
      res.write(JSON.stringify({ message: "User not found" }));
    }
    res.end();
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "Route not found" }));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
