export class CustomerUpdateInfoDtoMagento {
  email: string;
  firstname: string;
  lastname: string;
  website_id: number = 1;
  dob: string;
  extension_attributes: {
    is_subscribed: boolean;
  };
  constructor(
    firstname: string,
    lastname: string,
    email: string,
    is_subscribed: boolean,
    dob: string,
  ) {
    this.email = email;
    this.dob = dob;
    this.firstname = firstname;
    this.lastname = lastname;
    this.extension_attributes = {
      is_subscribed: is_subscribed,
    };
    this.website_id = 1;
  }
}
