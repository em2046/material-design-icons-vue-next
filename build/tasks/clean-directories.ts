import del from 'del';

export async function cleanSrc() {
  return await del(['src/icons', 'src/views/icons']);
}

export async function cleanDist() {
  return await del(['dist', 'temp']);
}
