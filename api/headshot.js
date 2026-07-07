const zlib = require('zlib');

const leadingHex = [
  require('./headshot-data/part-00'),
  require('./headshot-data/part-01')
].join('');

const compressedMiddleReversed = [
  require('./headshot-data/middle-a'),
  require('./headshot-data/middle-b'),
  require('./headshot-data/middle-c')
].join('');

const middleBytes = zlib.inflateSync(
  Buffer.from(compressedMiddleReversed.split('').reverse().join(''), 'base64')
);

const trailingHex = [
  require('./headshot-data/part-03'),
  require('./headshot-data/part-04').split('').reverse().join('')
].join('');

const jpeg = Buffer.concat([
  Buffer.from(leadingHex, 'hex'),
  middleBytes,
  Buffer.from(trailingHex, 'hex')
]);

module.exports = function headshotHandler(request, response) {
  try {
    const isValidJpeg =
      jpeg.length === 36158 &&
      jpeg[0] === 0xff &&
      jpeg[1] === 0xd8 &&
      jpeg[jpeg.length - 2] === 0xff &&
      jpeg[jpeg.length - 1] === 0xd9;

    if (!isValidJpeg) {
      throw new Error(`Invalid headshot image (${jpeg.length} bytes).`);
    }

    response.setHeader('Content-Type', 'image/jpeg');
    response.setHeader('Content-Length', String(jpeg.length));
    response.setHeader(
      'Cache-Control',
      'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable'
    );
    response.status(200).send(jpeg);
  } catch (error) {
    console.error('Unable to serve portfolio headshot:', error);
    response.status(502).send('Headshot unavailable');
  }
};
