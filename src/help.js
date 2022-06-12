export const help = {
  "up": "Go level up from current. If current is higher do nothing",
  "ls": "List all folders and files in current directory",
  "cd": "Change current directory, can accept relative or absolute paths. Usage: cd <path>",
  "cat": "Print content of file to stdout",
  "add": "Create empty file with given name. Works as unix touch command, if file with given name already exists, it will be overwrited to empty file. Also can accept relative and absolute paths",
  "hash": "Calculate sha256 hash from given file and print it to stdout",
  "rn": "Rename given file to new name. Works with filenames or paths. Have similar behavior as unix mv command. Usage rn <oldName> <newName>",
  "cp": "Copy file, accept relative path and absolute path. Usage cp <srcFile> <destDirectoty>\nWarning work not as unix cp!!! second argument is directory, not a new file name, name will be kept!\nIf destDirectory does not exist, try to create it",
  "mv": "Move given file to new location. First argument is path to src file. Second argument is path to destination folder. Don't change the file name. Usage mv <pathToSrcFile> <pathToDestFolder>\n Warning not as unix mv! second argument is directory, not a nwe file name!!!",
  "rm": "Remove given file, accept relative and absolute paths",
  "compress": "Compress given file using Brotli compression algorithm, and create archive with given name. Usage compress <pathToFile> <archiveName>",
  "decompress": "Decompress given file from Brotli to given location and name. Usage decompress <pathToFile> <uncompressedName>",
  "os": "Print os info to stdout. Should using with one of these flags : --EOL --cpus --homedir --username --architecture"
}
