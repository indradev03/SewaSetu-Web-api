export function getImageUrl(
  folder: "profile" | "rewards",
  filename?: string | null,
): string | null {
  if (!filename) return null;

  if (filename.startsWith("http")) return filename;

  return `/uploads/${folder}/${filename}`;
}
