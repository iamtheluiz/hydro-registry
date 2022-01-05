/**
 * Returns user current location:
 * @returns [lat, lng] in devices with geolocation
 * @returns null in devices without geolocation
 */
export function getCurrentPosition(): [number, number] | null {
  if ("geolocation" in navigator) {
    let location: [number, number] = [0, 0];

    navigator.geolocation.getCurrentPosition(function(position) {
      const { latitude, longitude } = position.coords;

      location = [latitude, longitude]
    });

    return location;
  }

  return null;
}