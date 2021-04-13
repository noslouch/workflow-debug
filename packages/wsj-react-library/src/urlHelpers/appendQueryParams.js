export default function appendQueryParams(url, params = {}) {
  let resultUrl = new URL(url);
  Object.entries(params).forEach(([key, value]) => resultUrl.searchParams.append(key, value));
  return resultUrl.toString();
}
