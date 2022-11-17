const http = require("http");
const server = http.createServer();

const users = [
  {
    id: 1,
    name: "apple",
    email: "apple@gmail.com",
    password: "1234",
  },
  {
    id: 2,
    name: "banana",
    email: "banana@gmail.com",
    password: "12341234",
  },
  {
    id: 3,
    name: "melon",
    email: "melon@gmail.com",
    password: "1234",
  },
];

const posts = [
  {
    id: 1,
    title: "첫 게시물",
    content: "첫 게시물1",
    userId: 1,
  },
  {
    id: 2,
    title: "두번째 게시물",
    content: "두번째 게시물2",
    userId: 1,
  },
  {
    id: 3,
    title: "바나나 게시물",
    content: "바나나 게시물1",
    userId: 2,
  },
  {
    id: 4,
    title: "멜론 게시물",
    content: "멜론 게시물2",
    userId: 3,
  },
];

const httpRequestListener = function (request, response) {
  const { url, method } = request;

  if (method === "GET") {
    if (url === "/ping") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "pong" }));
    }
  }
  if (method === "POST") {
    if (url === "/users/singup") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const user = JSON.parse(body);

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });

        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ users: users }));
      });
    }
  }
  if (method === "POST") {
    if (url === "/users/newpost") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const posts = JSON.parse(body);

        posts.push({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          userId: posts.userId,
        });
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ posts: posts }));
      });
    }
  }
};

server.on("request", httpRequestListener);

const IP = "127.0.0.1";
const PORT = 8009;

server.listen(PORT, IP, function () {
  console.log(`Listening to request on ip ${IP} & port ${PORT}`);
});
