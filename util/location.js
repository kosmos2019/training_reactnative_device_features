const TOMTOM_API_KEY = "SBH6slEIxLXIeJ1DKp3gT3xspuAPz3r9";

export function getMapPreview(latitude, longitude) {
  const imagePreviewUrl = `https://api.tomtom.com/map/1/staticimage?key=${TOMTOM_API_KEY}&zoom=14&center=${longitude},${latitude}&layer=basic&style=main&width=400&height=200&view=Unified&language=en-GB`;
  // console.log(imagePreviewUrl);
  return imagePreviewUrl;
}

export async function getAddress(latitude, longitude) {
  const url = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${TOMTOM_API_KEY}&radius=100`;
  // console.log(url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  // console.log(data.addresses);
  const address = data.addresses[0].address.freeformAddress;
  // console.log(address);

  return address;
}
