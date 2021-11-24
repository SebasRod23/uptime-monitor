export interface StringAsKey {
  [key: string]: string;
}

export interface SendEmailData extends StringAsKey {
  to_name: string;
  message: string;
  to_email: string;
  date: string;
}
