import * as contentful from "contentful";
console.log(process.env.contentfulAccessToken, process.env.contentfulSpaceId);

export const client = contentful.createClient({
  space: process.env.contentfulSpaceId,
  accessToken: process.env.contentfulAccessToken,
  // retryOnError: false,
});
