require("dotenv").config();
const app = require("./app");
const os = require("os");

const ServerIP = () => {
  const interfaces = os.networkInterfaces();

  for (const dev in interfaces) {
    const face = interfaces[dev];

    for (var i = 0; i < face.length; i++) {
      const alias = face[i];

      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }

  return "127.0.0.1";
};

app.listen(process.env.PORT || 3000, () => {
  const serverIP = ServerIP();

  console.log("[Server] Access URLs:");
  console.log("--------------------------");
  console.log(`   Local: http://localhost:${process.env.PORT || 3000}`);
  console.log(`   External: http://${serverIP}:${process.env.PORT || 3000} `);
  console.log("--------------------------");
});
