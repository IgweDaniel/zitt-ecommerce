import * as contentful from "contentful";

export const client = contentful.createClient({
  space: process.env.contentfulSpaceId,
  accessToken: process.env.contentfulAccessToken,
  // retryOnError: false,
});
