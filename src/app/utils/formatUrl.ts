export function formatTitleToUrl(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-zа-я0-9\-]/gi, '')
}
