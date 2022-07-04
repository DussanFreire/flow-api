export class UserAddressFlowDto {
  id: number;
  name: String;
  region: String;
  city: String;
  telephone: number;
  country: String;
  street: [String, String];
  lat: string | null;
  lng: string | null;
}
