// refreshToken.model

import { Schema, model } from 'mongoose';
import { IRefreshToken, collectionName } from './refreshToken.interface';
import { refreshTokenUniqueValueValidator } from './refreshToken.validator';
import { accessTokenRefValidator } from '../accessToken/accessToken.validator';
import {
  IAccessToken,
  collectionName as AccessTokenModelName,
} from '../accessToken/accessToken.interface';
import config from '../config';

// TODO: Check if multiple refresh token reference the same access token

const refreshTokenSchema = new Schema({
  value: {
    type: String,
    unique: true,
    required: true,
    validate: refreshTokenUniqueValueValidator,
  },
  accessTokenId: {
    type: String,
    ref: AccessTokenModelName,
    unique: true,
    required: true,
    validate: accessTokenRefValidator,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: config.REFRESH_TOKEN_EXPIRATION_TIME,
  },
});

const refreshTokenModel = model<IRefreshToken>(collectionName, refreshTokenSchema);

export default refreshTokenModel;
