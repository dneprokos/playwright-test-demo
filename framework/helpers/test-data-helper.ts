import { faker } from '@faker-js/faker';

const generateRandomFullName = () => faker.person.fullName();

const generateRandomEmail = () => faker.internet.email();

const generateRandomStreet = () => faker.location.streetAddress();

module.exports = {
    generateRandomFullName,
    generateRandomEmail,
    generateRandomStreet,
};