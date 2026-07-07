import { storePage, loadPage } from "./src/lib/page-store";
import type { PageSnapshot } from "./src/types";

const testPage: PageSnapshot = {
  id: "test-blob-read",
  templateSlug: "love-note",
  title: "Test page",
  sections: [{ id: "intro", values: { recipientName: "Test" } }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

async function main() {
  console.log("Storing...");
  await storePage(testPage);
  console.log("Loading...");
  const loaded = await loadPage("test-blob-read");
  console.log("Loaded:", loaded ? "OK" : "FAILED");
  if (loaded) {
    console.log("Recipient:", loaded.sections[0]?.values.recipientName);
  }
}

main().catch(console.error);
