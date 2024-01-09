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