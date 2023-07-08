export interface baseEntity {
  $id?: string;
  $createdAt?: Date;
  $updatedAt?: Date;
  emailVerification: boolean;
  passwordUpdate: Date;
  phone: string;
  prefs: Object;
  phoneVerification: boolean;
  registration: Date;
  status: string;
}
