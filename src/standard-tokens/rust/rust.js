export default {
  tokenPostfix: '.rust',
  defaultToken: '',
  keywords: [
    'as', 'box', 'break', 'const', 'continue', 'crate', 'else', 'enum',
    'extern', 'false', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop',
    'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return', 'self',
    'static', 'struct', 'super', 'trait', 'true', 'type', 'unsafe', 'use',
    'where', 'while', 'catch', 'default', 'union', 'static', 'abstract',
    'alignof', 'become', 'do', 'final', 'macro', 'offsetof', 'override',
    'priv', 'proc', 'pure', 'sizeof', 'typeof', 'unsized', 'virtual',
    'yield',
  ],

  typeKeywords: [
    'Self', 'm32', 'm64', 'm128', 'f80', 'f16', 'f128', 'int', 'uint',
    'float', 'char', 'bool', 'u8', 'u16', 'u32', 'u64', 'f32', 'f64', 'i8',
    'i16', 'i32', 'i64', 'str', 'Option', 'Either', 'c_float', 'c_double',
    'c_void', 'FILE', 'fpos_t', 'DIR', 'dirent', 'c_char', 'c_schar',
    'c_uchar', 'c_short', 'c_ushort', 'c_int', 'c_uint', 'c_long',
    'c_ulong', 'size_t', 'ptrdiff_t', 'clock_t', 'time_t', 'c_longlong',
    'c_ulonglong', 'intptr_t', 'uintptr_t', 'off_t', 'dev_t', 'ino_t',
    'pid_t', 'mode_t', 'ssize_t',
  ],

  constants: [
    'true', 'false', 'Some', 'None', 'Left', 'Right', 'Ok', 'Err',
  ],

  supportConstants: [
    'EXIT_FAILURE', 'EXIT_SUCCESS', 'RAND_MAX', 'EOF', 'SEEK_SET',
    'SEEK_CUR', 'SEEK_END', '_IOFBF', '_IONBF', '_IOLBF', 'BUFSIZ',
    'FOPEN_MAX', 'FILENAME_MAX', 'L_tmpnam', 'TMP_MAX', 'O_RDONLY',
    'O_WRONLY', 'O_RDWR', 'O_APPEND', 'O_CREAT', 'O_EXCL', 'O_TRUNC',
    'S_IFIFO', 'S_IFCHR', 'S_IFBLK', 'S_IFDIR', 'S_IFREG', 'S_IFMT',
    'S_IEXEC', 'S_IWRITE', 'S_IREAD', 'S_IRWXU', 'S_IXUSR', 'S_IWUSR',
    'S_IRUSR', 'F_OK', 'R_OK', 'W_OK', 'X_OK', 'STDIN_FILENO',
    'STDOUT_FILENO', 'STDERR_FILENO',
  ],

  supportMacros: [
    'format!', 'print!', 'println!', 'panic!', 'format_args!', 'unreachable!',
    'write!', 'writeln!'
  ],

  operators: [
    '!', '!=', '%', '%=', '&', '&=', '&&', '*', '*=', '+', '+=', '-', '-=',
    '->', '.', '..', '...', '/', '/=', ':', ';', '<<', '<<=', '<', '<=', '=',
    '==', '=>', '>', '>=', '>>', '>>=', '@', '^', '^=', '|', '|=', '||', '_',
    '?', '#'
  ],

  escapes: /\\([nrt0\"''\\]|x\h{2}|u\{\h{1,6}\})/,
  delimiters: /[,]/,
  symbols: /[\#\!\%\&\*\+\-\.\/\:\;\<\=\>\@\^\|_\?]+/,

  tokenizer: {
    root: [
      [/[a-zA-Z][a-zA-Z0-9_]*!?|_[a-zA-Z0-9_]+/,
         { cases: { '@typeKeywords': 'keyword.type',
                    '@keywords': 'keyword',
                    '@supportConstants': 'keyword',
                    '@supportMacros': 'keyword',
                    '@constants': 'keyword',
                    '@default': 'identifier', }
         }
      ],
      // Designator
      [/\$/, 'identifier'],
      // Lifetime annotations
      [/'[a-zA-Z_][a-zA-Z0-9_]*(?=[^\'])/, 'identifier'],
      // Byte literal
      [/'\S'/, 'string.single.quote'],
      // Strings
      [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' }],
      {include: '@numbers'},
      // Whitespace + comments
      { include: '@whitespace' },
      [/@delimiters/, { cases: { '@keywords': 'keyword',
                                 '@default': 'delimiter' }}],

      [/[{}()\[\]<>]/, '@brackets'],
      [/@symbols/, { cases: {'@operators': 'operator', '@default'  : '' }}],
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
    ],

    comment: [
      [/[^\/*]+/, 'comment' ],
      [/\/\*/, 'comment', '@push' ],
      ["\\*/", 'comment', '@pop'],
      [/[\/*]/, 'comment' ]
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' } ]
    ],
    numbers: [
      //Integer Decimal
      [/[0-9][0-9_]*([ui](8|16|32|64)?)?/, 'number'],
      // Float Typed
      [/[0-9][0-9_]*(\.[0-9][0-9_]*)?([eE][+-][0-9_]+)?(f32|f64)/, 'number'],
      // Float Exponent
      [/[0-9][0-9_]*(\.[0-9][0-9_]*)?[eE][+-][0-9_]+(f32|f64)?/, 'number'],
      // Float Fraction
      [/[0-9][0-9_]*\.[0-9][0-9_]*([eE][+-][0-9_]+)?(f32|f64)?/, 'number'],
    ]
  }
}

