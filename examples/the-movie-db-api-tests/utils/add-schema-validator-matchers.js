const { expect } = require('@jest/globals');
const fs = require('fs');
const schemaFiles = fs.readdirSync('./schemas');
const { camelCase, startCase } = require('lodash');

const Ajv = require('ajv');
const ajv = new Ajv();
const addFormats = require('ajv-formats');
addFormats(ajv);

const { inspect } = require("util");

const validatorFactory = (schemaName) => {
  const schema = require(`../schemas/${schemaName}.schema.js`);
  const validate = ajv.compile(schema);

  const verify = (data) => {
    const pass = validate(data);
    if (pass) {
      return {
        message: () =>
          `expected object to match ${schemaName} schema`,
        pass: true
      }
    } else {
      const errorText = ajv.errorsText(
        validate.errors?.filter((err) => err.keyword !== "if"),
        { dataVar: "schemaValidation" } + "\n\n" + inspect(data)
      );
      return {
        message: () =>
          `expected object to match ${schemaName} schema: ${errorText}`,
        pass: false
      }
    }
  };

  return { verify };
};

let schemaValidatorMatchers = {};

schemaFiles.forEach((schemaFile) => {
    
    const schemaName = schemaFile.slice(0, -10);
    const schemaValidator = validatorFactory(schemaName);
    const propertyName = `toMatch${startCase(camelCase(schemaName))}Schema`;

    Object.defineProperty(schemaValidatorMatchers, propertyName, { value: schemaValidator.verify, writable: false, enumerable: true });
});

expect.extend(schemaValidatorMatchers);