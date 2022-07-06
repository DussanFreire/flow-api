export class UserAddressFlowDto {
  id: number;
  name: string;
  region: string;
  city: string;
  telephone: string;
  country: string;
  street: [string, string];
  lat: string | null;
  lng: string | null;
}
