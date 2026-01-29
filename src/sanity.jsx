import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "ozs82926",
  dataset: "production",
  apiVersion: "2022-10-25",
  useCdn: true,
});
