export default function resolveProductionUrl(document) {
  return `https://[appName].klosser.app/preview/${document._id}`;
}
