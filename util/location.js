const TOMTOM_API_KEY = "SBH6slEIxLXIeJ1DKp3gT3xspuAPz3r9";

export function getMapPreview(latitude, longitude) {
  const imagePreviewUrl = `https://api.tomtom.com/map/1/staticimage?key=${TOMTOM_API_KEY}&zoom=14&center=${longitude},${latitude}&layer=basic&style=main&width=400&height=200&view=Unified&language=en-GB`;
  console.log(imagePreviewUrl);
  return imagePreviewUrl;
}
