/**
 * Programming Languages
 */

import { ProgrammingNode } from './base';

class LanguageNode extends ProgrammingNode {
  protected static type = 'language';
  protected static iconDir = 'resources/programming/language';
}

export class Bash extends LanguageNode {
  protected static icon = 'bash.png';
}

export class C extends LanguageNode {
  protected static icon = 'c.png';
}

export class Cpp extends LanguageNode {
  protected static icon = 'cpp.png';
}

export class Csharp extends LanguageNode {
  protected static icon = 'csharp.png';
}

export class Dart extends LanguageNode {
  protected static icon = 'dart.png';
}

export class Elixir extends LanguageNode {
  protected static icon = 'elixir.png';
}

export class Erlang extends LanguageNode {
  protected static icon = 'erlang.png';
}

export class Go extends LanguageNode {
  protected static icon = 'go.png';
}

export class Java extends LanguageNode {
  protected static icon = 'java.png';
}

export class Javascript extends LanguageNode {
  protected static icon = 'javascript.png';
}

export class Kotlin extends LanguageNode {
  protected static icon = 'kotlin.png';
}

export class Nodejs extends LanguageNode {
  protected static icon = 'nodejs.png';
}

export class Php extends LanguageNode {
  protected static icon = 'php.png';
}

export class Python extends LanguageNode {
  protected static icon = 'python.png';
}

export class Ruby extends LanguageNode {
  protected static icon = 'ruby.png';
}

export class Rust extends LanguageNode {
  protected static icon = 'rust.png';
}

export class Scala extends LanguageNode {
  protected static icon = 'scala.png';
}

export class Swift extends LanguageNode {
  protected static icon = 'swift.png';
}

export class Typescript extends LanguageNode {
  protected static icon = 'typescript.png';
}

// Aliases
export const JavaScript = Javascript;
export const NodeJS = Nodejs;
export const PHP = Php;
export const TypeScript = Typescript;
