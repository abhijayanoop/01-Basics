const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.message;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");

    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body"
    );
    res.write("</html>");
    res.end();
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    }); //listen to events
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  // console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<body>Hello</body");
  res.write("</html>");
  res.end();
};

module.exports = {
  handler: requestHandler,
  someText: "some text",
};
