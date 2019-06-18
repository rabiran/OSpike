// client.interface

import { IBaseModel } from '../generic/generic.interface';

export interface IClient extends IBaseModel {
  name: string;
  id: string;
  secret: string;
  audienceId: string | IClient; // Audience id used for mention the client in access token
  redirectUris: string[];
  hostUris: string[];
  scopes: string[]; // Optional field for usage of client_credentials flow, may be empty
  registrationToken: string;
}

export const collectionName = 'Client';
