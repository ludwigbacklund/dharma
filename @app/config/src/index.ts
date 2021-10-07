// @ts-ignore
const packageJson = require('../../../package.json');
export const projectName = packageJson.name.replace(/[-_]/g, ' ');
