const server = require("./api/server");

const port = process.env.PORT || 6000;
server.listen(port, () => console.log(`\nAPI running on ${port}\n`));
