const http = require("http");

const requestListener = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Powered-By", "NodeJS");

  const { method, url } = req;

  if (url === "/") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: "<h1>Ini adalah homepage</h1>",
        }),
      );
    } else {
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          message: `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`,
        }),
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: "<h1>Halo! Ini adalah halaman about</h1>",
        }),
      );
    } else if (method === "POST") {
      res.statusCode = 200;
      let body = [];

      req.on("data", (chunck) => {
        body.push(chunck);
      });

      req.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        res.end(
          JSON.stringify({
            message: `<h1>Halo, ${name}! Ini adalah halaman about</h1>`,
          }),
        );
      });
    } else {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: `<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`,
        }),
      );
    }
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        message: `Halaman tidak dapat diakses dengan ${method} req`,
      }),
    );
  }
};

const server = http.createServer(requestListener);

let port = 5000;
let host = "localhost";
server.listen(port, host, () => {
  console.log(`Server berjalan pada port http://${host}:${port}`);
});
