import del from 'del';

export default function cleanDirectories() {
  return del(['src/icons', 'src/views/icons']);
}
