export class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = {
      latitude: location.latitude,
      longitude: location.longitude,
    }; // { lat: 0.1234, lng: 0.1234 }
    this.id = new Date().toString() + Math.random().toString();
  }
}
