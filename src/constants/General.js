export const EMAIL_PATTERN = /^(?=.*[^a-zA-Z0-9])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/;

export const SPACE_VALIDATIOR = '^\\S+[a-zA-Z0-9\\S#$%=+&-_\\s]*$'; 

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_INFO: 'USER_INFO',
};

export const NOTIFICATION_DURATION = 5;

export const STATUS_CODES = {
  SUCCESS: 200,
  SUCCESS_2:201,
  SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
}

export const LISTING_DATA = {
  FIRST_PAGE: 0,
  PAGE_SIZE: 10,
};

export const DATE_FORMAT = 'DD-MM-YYYY';


