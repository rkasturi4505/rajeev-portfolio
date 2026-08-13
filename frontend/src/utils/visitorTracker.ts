import { createVisitorSession } from "../api/visitorSessionApi";

export const trackVisitor = async () => {
  try {
    const userAgent = navigator.userAgent;

    // Browser
    let browser = "Unknown";

    if (userAgent.includes("Edg")) {
      browser = "Edge";
    } else if (userAgent.includes("Chrome")) {
      browser = "Chrome";
    } else if (userAgent.includes("Firefox")) {
      browser = "Firefox";
    } else if (userAgent.includes("Safari")) {
      browser = "Safari";
    }

    // Operating System
    let operatingSystem = "Unknown";

    if (userAgent.includes("Windows")) {
      operatingSystem = "Windows";
    } else if (userAgent.includes("Mac")) {
      operatingSystem = "macOS";
    } else if (userAgent.includes("Linux")) {
      operatingSystem = "Linux";
    } else if (userAgent.includes("Android")) {
      operatingSystem = "Android";
    } else if (userAgent.includes("iPhone")) {
      operatingSystem = "iOS";
    }

    // Device Type
    const deviceType = /Mobi|Android|iPhone/i.test(userAgent)
      ? "Mobile"
      : "Desktop";

    await createVisitorSession({
      browser,
      operatingSystem,
      deviceType,
      pageVisited: window.location.pathname,
      visitTime: new Date().toISOString(),
    });

    console.log("Visitor tracked successfully");
  } catch (error) {
    console.error("Visitor tracking failed", error);
  }
};
