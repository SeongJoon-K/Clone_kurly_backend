
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const password = 'password';
const saltRounds = 12;

const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
}

const main = async () => {
    const hashedPassword = await makeHash(password, saltRounds);
    console.log(hashedPassword);
}

main() {
=> b'$2b$12$Fm3qBQocDZJfzCTbJeICWOIzaTgP2OzDrO0A2nHhVrMktR6GjiAk2';
}

