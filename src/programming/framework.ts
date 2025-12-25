/**
 * Programming Frameworks
 */

import { ProgrammingNode } from './base';

class FrameworkNode extends ProgrammingNode {
  protected static type = 'framework';
  protected static iconDir = 'resources/programming/framework';
}

export class Angular extends FrameworkNode {
  protected static icon = 'angular.png';
}

export class Django extends FrameworkNode {
  protected static icon = 'django.png';
}

export class Dotnet extends FrameworkNode {
  protected static icon = 'dotnet.png';
}

export class Fastapi extends FrameworkNode {
  protected static icon = 'fastapi.png';
}

export class Flask extends FrameworkNode {
  protected static icon = 'flask.png';
}

export class Flutter extends FrameworkNode {
  protected static icon = 'flutter.png';
}

export class Graphql extends FrameworkNode {
  protected static icon = 'graphql.png';
}

export class Laravel extends FrameworkNode {
  protected static icon = 'laravel.png';
}

export class Nextjs extends FrameworkNode {
  protected static icon = 'nextjs.png';
}

export class React extends FrameworkNode {
  protected static icon = 'react.png';
}

export class Spring extends FrameworkNode {
  protected static icon = 'spring.png';
}

export class Svelte extends FrameworkNode {
  protected static icon = 'svelte.png';
}

export class Vue extends FrameworkNode {
  protected static icon = 'vue.png';
}

// Aliases
export const FastAPI = Fastapi;
export const DotNet = Dotnet;
export const GraphQL = Graphql;
export const NextJs = Nextjs;
