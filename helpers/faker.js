import faker from 'faker';

export const generateRandomFirstName = () => {
    return faker.name.firstName();
};

export const generateRandomLastName = () => {
    return faker.name.lastName();
};

export const generateRandomEmail = () => {
    return faker.internet.email();
};

export const generateRandomPassword = (length = 8, includeSpecialChars = false) => {
    return faker.internet.password(length, includeSpecialChars);
};