require("dotenv").config();

// const os = require("os");
// const ifaces = os.networkInterfaces();
// let address = null;
// for (let prop in ifaces) {
//   let iface = ifaces[prop].filter(function (details) {
//     return details.family === "IPv4" && details.internal === false;
//   });

//   if (iface.length > 0) address = iface[0].address;
// }

module.exports = {
  env: {
    contentfulSpaceId: process.env["CMS_ID"],
    contentfulAccessToken: process.env["CMS_ACCESS_TOKEN"],
  },
};
