export const toSemanticUrl = (str: string) => {
  return str.replaceAll(' ', '-').toLowerCase()
}
