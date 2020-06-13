import through2 from 'through2';
import path from 'path';
import fs from 'fs';
import prettier, { Options } from 'prettier';

const fsPromises = fs.promises;
const prettierConfigPath = '../../.prettierrc';

export default function prettierFormat(userOptions: Options) {
  return through2.obj(async (chunk, enc, callback) => {
    const fileContent = chunk.contents.toString(enc);
    const defaultOptionBuffer = await fsPromises.readFile(
      path.resolve(__dirname, prettierConfigPath)
    );
    const defaultOptions = JSON.parse(defaultOptionBuffer.toString());
    const options = Object.assign({}, defaultOptions, userOptions);
    const formattedContent = prettier.format(fileContent, options);
    chunk.contents = Buffer.from(formattedContent);
    callback(null, chunk);
  });
}
