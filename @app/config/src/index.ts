// @ts-ignore
const packageJson = require('../../../package.json');

export const fromEmail = '"saas" <no-reply@backlund.dev>';
export const projectName = packageJson.name.replace(/[-_]/g, ' ');
export const companyName = projectName; // For copyright ownership
export const awsRegion = 'eu-west-1';
