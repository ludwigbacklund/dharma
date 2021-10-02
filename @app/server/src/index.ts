import chalk from 'chalk';
import express from 'express';

import installNextJs from './middleware/installNextJs';
import installPostgraphile from './middleware/installPostgraphile';

async function main() {
  const app = express();

  await installNextJs(app);
  installPostgraphile(app);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(' ');
    console.log(
      chalk.greenBright(`  App listening on port ${chalk.bold(PORT)}`),
    );
    console.log(' ');
    console.log(
      `  Site:     ${chalk.bold.underline(`http://localhost:${PORT}`)}`,
    );
    console.log(
      `  GraphiQL: ${chalk.bold.underline(
        `http://localhost:${PORT}/graphiql`,
      )}`,
    );
    console.log(' ');
  });
}

main().catch((e) => {
  console.error('Fatal error occurred starting server!');
  console.error(e);
  process.exit(101);
});
