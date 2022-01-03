export const BaseAPIURL = "https://frontend-test-api.aircall.io/";

export const userObject = {
    username: String,
    password: String
};

export function isEmpty(str ) {
    return (!str || str.length === 0);
}