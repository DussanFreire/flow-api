export class UserAddressFlowDto {
  id: number;
  region: String;
  city: String;
  telephone: number;
  country: String;
  street: [String, String];
}
