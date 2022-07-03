export class UserAddressFlowDto {
  id: number;
  name: String;
  region: String;
  city: String;
  telephone: string;
  country: String;
  street: [String, String];
}
