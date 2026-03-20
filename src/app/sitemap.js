export default function sitemap() {
  const baseUrl = "https://eidisend.com";

  // Add static routes
  const routes = ["", "/send", "/fun-zone", "/top-senders", "/contact", "/privacy-policy", "/terms-of-service"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
    })
  );

  return routes;
}
