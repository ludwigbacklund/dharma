import { Express } from 'express';
import next from 'next';
import { parse } from 'url';

if (!process.env.NODE_ENV) {
  throw new Error('No NODE_ENV envvar! Try `export NODE_ENV=development`');
}

const isDev = process.env.NODE_ENV === 'development';

export default async function installNextJs(app: Express) {
  const nextApp = next({
    dev: isDev,
    dir: `${__dirname}/../../../client`,
    quiet: !isDev,
  });

  const handlerPromise = (async () => {
    await nextApp.prepare();
    return nextApp.getRequestHandler();
  })();

  handlerPromise.catch((e) => {
    console.error('Error occurred starting Next.js; aborting process');
    console.error(e);
    process.exit(1);
  });

  app.get('*', async (req, res) => {
    const handler = await handlerPromise;
    const parsedUrl = parse(req.url, true);
    handler(req, res, {
      ...parsedUrl,
      query: { ...parsedUrl.query },
    });
  });
}
