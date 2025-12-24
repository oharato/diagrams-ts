import { randomBytes } from 'crypto';
import { digraph, toDot } from 'ts-graphviz';
import * as path from 'path';
import * as fs from 'fs';

// Global contexts for diagrams and clusters
let currentDiagram: Diagram | null = null;
let currentCluster: Cluster | null = null;

export function getDiagram(): Diagram | null {
  return currentDiagram;
}

export function setDiagram(diagram: Diagram | null): void {
  currentDiagram = diagram;
}

export function getCluster(): Cluster | null {
  return currentCluster;
}

export function setCluster(cluster: Cluster | null): void {
  currentCluster = cluster;
}

type Direction = 'TB' | 'BT' | 'LR' | 'RL';
type CurveStyle = 'ortho' | 'curved';
type OutFormat = 'png' | 'jpg' | 'svg' | 'pdf' | 'dot';

interface DiagramOptions {
  name?: string;
  filename?: string;
  direction?: Direction;
  curvestyle?: CurveStyle;
  outformat?: OutFormat | OutFormat[];
  autolabel?: boolean;
  show?: boolean;
  strict?: boolean;
  graph_attr?: Record<string, string>;
  node_attr?: Record<string, string>;
  edge_attr?: Record<string, string>;
}

export class Diagram {
  private static readonly DIRECTIONS: Direction[] = ['TB', 'BT', 'LR', 'RL'];
  private static readonly CURVESTYLES: CurveStyle[] = ['ortho', 'curved'];
  private static readonly OUTFORMATS: OutFormat[] = ['png', 'jpg', 'svg', 'pdf', 'dot'];

  public readonly name: string;
  public readonly filename: string;
  public readonly show: boolean;
  public readonly autolabel: boolean;
  public readonly outformat: OutFormat | OutFormat[];
  private readonly _direction: Direction;
  private readonly _curvestyle: CurveStyle;
  private readonly _graph_attr: Record<string, string>;
  private readonly _node_attr: Record<string, string>;
  private readonly _edge_attr: Record<string, string>;
  
  // ts-graphviz digraph instance
  public readonly dot: ReturnType<typeof digraph>;

  constructor(options: DiagramOptions = {}) {
    const {
      name = '',
      filename = '',
      direction = 'LR',
      curvestyle = 'ortho',
      outformat = 'png',
      autolabel = false,
      show = true,
      strict = false,
      graph_attr = {},
      node_attr = {},
      edge_attr = {},
    } = options;

    this.name = name;
    
    if (!name && !filename) {
      this.filename = 'diagrams_image';
    } else if (!filename) {
      this.filename = name.split(' ').join('_').toLowerCase();
    } else {
      this.filename = filename;
    }

    if (!this.validateDirection(direction)) {
      throw new Error(`"${direction}" is not a valid direction`);
    }
    this._direction = direction;

    if (!this.validateCurveStyle(curvestyle)) {
      throw new Error(`"${curvestyle}" is not a valid curvestyle`);
    }
    this._curvestyle = curvestyle;

    if (Array.isArray(outformat)) {
      for (const fmt of outformat) {
        if (!this.validateOutFormat(fmt)) {
          throw new Error(`"${fmt}" is not a valid output format`);
        }
      }
    } else {
      if (!this.validateOutFormat(outformat)) {
        throw new Error(`"${outformat}" is not a valid output format`);
      }
    }
    this.outformat = outformat;

    this._graph_attr = graph_attr;
    this._node_attr = node_attr;
    this._edge_attr = edge_attr;

    this.dot = digraph(this.name);

    this.show = show;
    this.autolabel = autolabel;
  }

  private validateDirection(direction: string): direction is Direction {
    const upperDir = direction.toUpperCase();
    return Diagram.DIRECTIONS.includes(upperDir as Direction);
  }

  private validateCurveStyle(curvestyle: string): curvestyle is CurveStyle {
    const lowerStyle = curvestyle.toLowerCase();
    return Diagram.CURVESTYLES.includes(lowerStyle as CurveStyle);
  }

  private validateOutFormat(outformat: string): outformat is OutFormat {
    const lowerFormat = outformat.toLowerCase();
    return Diagram.OUTFORMATS.includes(lowerFormat as OutFormat);
  }

  public node(nodeid: string, label: string, attrs: Record<string, string> = {}): void {
    this.dot.node(nodeid, { label, ...attrs });
  }

  public connect(node1: Node, node2: Node, edge: Edge): void {
    this.dot.edge([node1.nodeid, node2.nodeid], edge.attrs);
  }

  public subgraph(cluster: Cluster): void {
    // Subgraph handling
  }

  public render(): void {
    console.log('Rendering diagram:', this.filename);
    const dotSource = toDot(this.dot);
    fs.writeFileSync(`${this.filename}.dot`, dotSource);
    console.log(`DOT source written to ${this.filename}.dot`);
  }

  public toString(): string {
    return toDot(this.dot);
  }

  public async use<T>(callback: () => Promise<T> | T): Promise<T> {
    setDiagram(this);
    try {
      const result = await callback();
      return result;
    } finally {
      this.render();
      setDiagram(null);
    }
  }
}

interface ClusterOptions {
  label?: string;
  direction?: Direction;
  graph_attr?: Record<string, string>;
}

export class Cluster {
  private static readonly DIRECTIONS: Direction[] = ['TB', 'BT', 'LR', 'RL'];
  private static readonly BGCOLORS = ['#E5F5FD', '#EBF3E7', '#ECE8F6', '#FDF7E3'];

  public readonly label: string;
  public readonly name: string;
  public readonly depth: number;
  private readonly diagram: Diagram;
  private readonly parent: Cluster | null;

  constructor(options: ClusterOptions = {}) {
    const { label = 'cluster', direction = 'LR', graph_attr = {} } = options;

    this.label = label;
    this.name = 'cluster_' + this.label;

    if (!this.validateDirection(direction)) {
      throw new Error(`"${direction}" is not a valid direction`);
    }

    const diagram = getDiagram();
    if (!diagram) {
      throw new Error('Global diagrams context not set up');
    }
    this.diagram = diagram;
    this.parent = getCluster();

    this.depth = this.parent ? this.parent.depth + 1 : 0;
  }

  private validateDirection(direction: string): direction is Direction {
    return Cluster.DIRECTIONS.includes(direction.toUpperCase() as Direction);
  }

  public node(nodeid: string, label: string, attrs: Record<string, string> = {}): void {
    this.diagram.node(nodeid, label, attrs);
  }

  public subgraph(cluster: Cluster): void {
    // Handle nested clusters
  }

  public async use<T>(callback: () => Promise<T> | T): Promise<T> {
    setCluster(this);
    try {
      const result = await callback();
      return result;
    } finally {
      setCluster(this.parent);
    }
  }
}

interface NodeOptions {
  nodeid?: string;
  [key: string]: any;
}

export class Node {
  protected static provider: string | null = null;
  protected static type: string | null = null;
  protected static iconDir: string | null = null;
  protected static icon: string | null = null;
  protected static height: number = 1.9;

  private readonly id: string;
  public label: string;
  private readonly diagram: Diagram;
  private readonly cluster: Cluster | null;
  private readonly attrs: Record<string, any>;

  constructor(label: string = '', options: NodeOptions = {}) {
    const { nodeid, ...attrs } = options;

    this.id = nodeid || this.randId();
    this.label = label;

    const diagram = getDiagram();
    if (!diagram) {
      throw new Error('Global diagrams context not set up');
    }
    this.diagram = diagram;

    if (this.diagram.autolabel) {
      const prefix = this.constructor.name;
      if (this.label) {
        this.label = prefix + '\n' + this.label;
      } else {
        this.label = prefix;
      }
    }

    const icon = this.loadIcon();
    const padding = 0.4 * (this.label.split('\n').length - 1);
    
    this.attrs = icon
      ? {
          shape: 'none',
          height: String((this.constructor as typeof Node).height + padding),
          image: icon,
        }
      : {};

    Object.assign(this.attrs, attrs);

    this.cluster = getCluster();

    if (this.cluster) {
      this.cluster.node(this.id, this.label, this.attrs);
    } else {
      this.diagram.node(this.id, this.label, this.attrs);
    }
  }

  get nodeid(): string {
    return this.id;
  }

  public connect(node: Node, edge: Edge): Node {
    if (!(node instanceof Node)) {
      throw new Error(`${node} is not a valid Node`);
    }
    if (!(edge instanceof Edge)) {
      throw new Error(`${edge} is not a valid Edge`);
    }
    this.diagram.connect(this, node, edge);
    return node;
  }

  private randId(): string {
    return randomBytes(16).toString('hex');
  }

  private loadIcon(): string | null {
    const ctor = this.constructor as typeof Node;
    if (!ctor.iconDir || !ctor.icon) {
      return null;
    }
    const basedir = path.resolve(__dirname, '..');
    return path.join(basedir, ctor.iconDir, ctor.icon);
  }

  public toString(): string {
    const ctor = this.constructor as typeof Node;
    return `<${ctor.provider}.${ctor.type}.${this.constructor.name}>`;
  }

  public to(other: Node | Node[]): Node | Node[] {
    if (Array.isArray(other)) {
      for (const node of other) {
        this.connect(node, new Edge({ node: this }));
      }
      return other;
    } else {
      return this.connect(other, new Edge({ node: this }));
    }
  }

  public forward(other: Node | Node[]): Node | Node[] {
    if (Array.isArray(other)) {
      for (const node of other) {
        this.connect(node, new Edge({ node: this, forward: true }));
      }
      return other;
    } else {
      return this.connect(other, new Edge({ node: this, forward: true }));
    }
  }

  public reverse(other: Node | Node[]): Node | Node[] {
    if (Array.isArray(other)) {
      for (const node of other) {
        this.connect(node, new Edge({ node: this, reverse: true }));
      }
      return other;
    } else {
      return this.connect(other, new Edge({ node: this, reverse: true }));
    }
  }
}

interface EdgeOptions {
  node?: Node;
  forward?: boolean;
  reverse?: boolean;
  label?: string;
  color?: string;
  style?: string;
  [key: string]: any;
}

export class Edge {
  private static readonly DEFAULT_EDGE_ATTRS: Record<string, string> = {
    fontcolor: '#2D3436',
    fontname: 'Sans-Serif',
    fontsize: '13',
  };

  public node: Node | null;
  public forward: boolean;
  public reverse: boolean;
  private _attrs: Record<string, any>;

  constructor(options: EdgeOptions = {}) {
    const { node = null, forward = false, reverse = false, label = '', color = '', style = '', ...attrs } = options;

    if (node !== null && !(node instanceof Node)) {
      throw new Error('node must be an instance of Node');
    }

    this.node = node;
    this.forward = forward;
    this.reverse = reverse;

    this._attrs = { ...Edge.DEFAULT_EDGE_ATTRS };

    if (label) {
      this._attrs.label = label;
    }
    if (color) {
      this._attrs.color = color;
    }
    if (style) {
      this._attrs.style = style;
    }
    Object.assign(this._attrs, attrs);
  }

  get attrs(): Record<string, any> {
    let direction: string;
    if (this.forward && this.reverse) {
      direction = 'both';
    } else if (this.forward) {
      direction = 'forward';
    } else if (this.reverse) {
      direction = 'back';
    } else {
      direction = 'none';
    }
    return { ...this._attrs, dir: direction };
  }

  public connect(other: Node | Edge | Node[]): any {
    if (Array.isArray(other)) {
      for (const node of other) {
        if (this.node) {
          this.node.connect(node, this);
        }
      }
      return other;
    } else if (other instanceof Edge) {
      this._attrs = { ...other._attrs };
      return this;
    } else {
      if (this.node) {
        return this.node.connect(other, this);
      } else {
        this.node = other;
        return this;
      }
    }
  }
}

export const Group = Cluster;
