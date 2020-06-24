export default function getMemory(size: number, args: string = 'MB') {
  if (!size) {
    return '0MB'
  }
  if (args === 'MB') {
    return (size / 1024 / 1024).toFixed(3) + 'MB';
  }
}
