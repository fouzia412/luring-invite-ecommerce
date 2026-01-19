export type VideoPlatform = "local" | "youtube" | "instagram" | "pinterest";

export function isLocalVideoUrl(url: string): boolean {
  const lower = url.toLowerCase().split("?")[0].split("#")[0];
  return (
    lower.endsWith(".mp4") ||
    lower.endsWith(".webm") ||
    lower.endsWith(".ogg") ||
    lower.startsWith("/videos/") ||
    lower.startsWith("videos/")
  );
}

export function inferPlatform(url: string, declared?: VideoPlatform): VideoPlatform {
  if (isLocalVideoUrl(url)) return "local";

  try {
    const u = new URL(url, window.location.origin);
    const host = u.hostname.toLowerCase();

    if (host.includes("youtube.com") || host.includes("youtu.be")) return "youtube";
    if (host.includes("instagram.com")) return "instagram";
    if (host.includes("pinterest.") || host.includes("pin.it")) return "pinterest";
  } catch {
    // ignore
  }

  return declared ?? "local";
}

export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url, window.location.origin);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    const v = u.searchParams.get("v");
    if (v) return v;

    const parts = u.pathname.split("/").filter(Boolean);

    const shortsIndex = parts.indexOf("shorts");
    if (shortsIndex >= 0 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];

    const embedIndex = parts.indexOf("embed");
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];

    return null;
  } catch {
    return null;
  }
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function getYouTubeEmbed(url: string): string | null {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&autoplay=1`;
}

export function normalizeInstagramUrl(url: string) {
  try {
    const u = new URL(url, window.location.origin);
    u.protocol = "https:";
    if (!u.pathname.endsWith("/")) u.pathname += "/";
    u.search = "";
    u.hash = "";
    return u.toString();
  } catch {
    return url;
  }
}

export function getPinterestEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url, window.location.origin);
    const parts = u.pathname.split("/").filter(Boolean);
    const pinIndex = parts.indexOf("pin");
    const id = pinIndex >= 0 ? parts[pinIndex + 1] : null;
    if (!id) return null;
    return `https://assets.pinterest.com/ext/embed.html?id=${id}`;
  } catch {
    return null;
  }
}
