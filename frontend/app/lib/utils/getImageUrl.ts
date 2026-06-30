// app/lib/utils/getImageUrl.ts
export function getImageUrl(
  folder: "donor" | "ngo",
  filename?: string | null,
): string | null {
  if (!filename) return null;

  // NGO controller currently stores a full URL, donor stores just the filename.
  // Handle both so callers don't need to know which.
  if (filename.startsWith("http")) return filename;

  return `/uploads/profile/${filename}`;
}
