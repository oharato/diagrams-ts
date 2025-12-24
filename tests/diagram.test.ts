import { Diagram, Cluster, Node, Edge } from '../src';

describe('Diagram', () => {
  test('should create a diagram with default options', () => {
    const diagram = new Diagram();
    expect(diagram).toBeDefined();
    expect(diagram.name).toBe('');
    expect(diagram.filename).toBe('diagrams_image');
  });

  test('should create a diagram with custom name', () => {
    const diagram = new Diagram({ name: 'My Diagram' });
    expect(diagram.name).toBe('My Diagram');
    expect(diagram.filename).toBe('my_diagram');
  });

  test('should create a diagram with custom filename', () => {
    const diagram = new Diagram({ name: 'Test', filename: 'custom' });
    expect(diagram.filename).toBe('custom');
  });

  test('should validate direction', () => {
    expect(() => new Diagram({ direction: 'LR' })).not.toThrow();
    expect(() => new Diagram({ direction: 'TB' })).not.toThrow();
    expect(() => new Diagram({ direction: 'INVALID' as any })).toThrow();
  });

  test('should validate curvestyle', () => {
    expect(() => new Diagram({ curvestyle: 'ortho' })).not.toThrow();
    expect(() => new Diagram({ curvestyle: 'curved' })).not.toThrow();
    expect(() => new Diagram({ curvestyle: 'invalid' as any })).toThrow();
  });

  test('should validate outformat', () => {
    expect(() => new Diagram({ outformat: 'png' })).not.toThrow();
    expect(() => new Diagram({ outformat: 'svg' })).not.toThrow();
    expect(() => new Diagram({ outformat: ['png', 'svg'] })).not.toThrow();
    expect(() => new Diagram({ outformat: 'invalid' as any })).toThrow();
  });
});

describe('Node', () => {
  test('should throw error when created without diagram context', () => {
    expect(() => new Node('test')).toThrow('Global diagrams context not set up');
  });
});

describe('Cluster', () => {
  test('should throw error when created without diagram context', () => {
    expect(() => new Cluster({ label: 'test' })).toThrow('Global diagrams context not set up');
  });
});

describe('Edge', () => {
  test('should create an edge with default options', () => {
    const edge = new Edge();
    expect(edge).toBeDefined();
    expect(edge.forward).toBe(false);
    expect(edge.reverse).toBe(false);
  });

  test('should create an edge with label', () => {
    const edge = new Edge({ label: 'test label' });
    expect(edge.attrs.label).toBe('test label');
  });

  test('should create an edge with color and style', () => {
    const edge = new Edge({ color: 'red', style: 'dashed' });
    expect(edge.attrs.color).toBe('red');
    expect(edge.attrs.style).toBe('dashed');
  });

  test('should set correct direction attribute', () => {
    const edge1 = new Edge({ forward: true });
    expect(edge1.attrs.dir).toBe('forward');

    const edge2 = new Edge({ reverse: true });
    expect(edge2.attrs.dir).toBe('back');

    const edge3 = new Edge({ forward: true, reverse: true });
    expect(edge3.attrs.dir).toBe('both');

    const edge4 = new Edge();
    expect(edge4.attrs.dir).toBe('none');
  });
});
