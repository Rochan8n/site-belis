import { describe, expect, it } from "vitest";
import { analyticsPageLocation, analyticsReferrer } from "../analytics-page";

describe("analytics URL allowlist", () => {
  it("preserves campaign labels and supported Google click IDs, stripping arbitrary fields and fragments", () => {
    const href = "https://www.belis.agency/comunicacao-visual?utm_campaign=letras-caixa&utm_id=24455227861&utm_content=hero&utm_term=letra+caixa&gclid=Test_1&gbraid=Test-2&wbraid=Test_3&dclid=Test4&message=private&phone=11999999999#private";
    const url = new URL(analyticsPageLocation(href));
    expect([...url.searchParams.keys()]).toEqual(["utm_campaign", "utm_id", "utm_content", "utm_term", "gclid", "dclid", "gbraid", "wbraid"]);
    expect(url.searchParams.get("utm_id")).toBe("24455227861");
    expect(url.searchParams.get("utm_term")).toBe("letra caixa");
    expect(url.hash).toBe("");
  });

  it("drops obvious personal data, invalid click tokens and oversized campaign values", () => {
    const url = new URL(analyticsPageLocation(`https://www.belis.agency/?utm_source=test%40example.com&utm_campaign=11999999999&gclid=invalid%40token&utm_term=${"a".repeat(201)}`));
    expect(url.search).toBe("");
  });

  it("restricts external referrers to HTTP origins without query/path data", () => {
    expect(analyticsReferrer("https://www.google.com/search?q=private")).toBe("https://www.google.com");
    expect(analyticsReferrer("invalid")).toBe("");
    expect(analyticsReferrer("about:blank")).toBe("");
  });
});
