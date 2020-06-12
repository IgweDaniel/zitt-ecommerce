const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    require("dotenv").config();
  }

  return {
    ...defaultConfig,
    env: {
      contentfulSpaceId: process.env["CMS_ID"],
      contentfulAccessToken: process.env["CMS_ACCESS_TOKEN"],
    },
  };
};
