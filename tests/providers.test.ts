import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { Diagram, setDiagram } from '../src';
import { GCP } from '../src/gcp';
import { GCE, GKE, CloudRun } from '../src/gcp/compute';
import { Azure } from '../src/azure';
import { VM, AKS, ACR } from '../src/azure/compute';
import { K8S } from '../src/k8s';
import { Pod, Deployment, StatefulSet } from '../src/k8s/compute';

// Mock ts-graphviz to avoid ES module issues in tests
vi.mock('ts-graphviz', () => ({
  digraph: vi.fn(() => {
    const attrs = new Map();
    const createSubgraphMock = () => {
      const subAttrs = new Map();
      return {
        node: vi.fn(),
        edge: vi.fn(),
        set: vi.fn((key, value) => subAttrs.set(key, value)),
        get: vi.fn((key) => subAttrs.get(key)),
      };
    };
    return {
      node: vi.fn(),
      edge: vi.fn(),
      set: vi.fn((key, value) => attrs.set(key, value)),
      get: vi.fn((key) => attrs.get(key)),
      subgraph: vi.fn(() => createSubgraphMock()),
    };
  }),
  toDot: vi.fn(() => 'digraph {}'),
}));

// Mock fs to avoid file system operations in tests
vi.mock('fs', () => ({
  default: {
    writeFileSync: vi.fn(),
  },
  writeFileSync: vi.fn(),
}));

describe('GCP Provider', () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram({ name: 'GCP Test', show: false });
    setDiagram(diagram);
  });

  afterEach(() => {
    setDiagram(null);
  });

  test('should create GCP node', () => {
    const gcp = new GCP('my-gcp');
    expect(gcp).toBeDefined();
    expect(gcp.label).toBe('my-gcp');
  });

  test('should create GCP Compute Engine node', () => {
    const gce = new GCE('my-instance');
    expect(gce).toBeDefined();
    expect(gce.label).toBe('my-instance');
  });

  test('should create GCP Kubernetes Engine node', () => {
    const gke = new GKE('my-cluster');
    expect(gke).toBeDefined();
    expect(gke.label).toBe('my-cluster');
  });

  test('should create GCP Cloud Run node', () => {
    const run = new CloudRun('my-service');
    expect(run).toBeDefined();
    expect(run.label).toBe('my-service');
  });
});

describe('Azure Provider', () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram({ name: 'Azure Test', show: false });
    setDiagram(diagram);
  });

  afterEach(() => {
    setDiagram(null);
  });

  test('should create Azure node', () => {
    const azure = new Azure('my-azure');
    expect(azure).toBeDefined();
    expect(azure.label).toBe('my-azure');
  });

  test('should create Azure VM node', () => {
    const vm = new VM('my-vm');
    expect(vm).toBeDefined();
    expect(vm.label).toBe('my-vm');
  });

  test('should create Azure AKS node', () => {
    const aks = new AKS('my-cluster');
    expect(aks).toBeDefined();
    expect(aks.label).toBe('my-cluster');
  });

  test('should create Azure ACR node', () => {
    const acr = new ACR('my-registry');
    expect(acr).toBeDefined();
    expect(acr.label).toBe('my-registry');
  });
});

describe('K8S Provider', () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram({ name: 'K8S Test', show: false });
    setDiagram(diagram);
  });

  afterEach(() => {
    setDiagram(null);
  });

  test('should create K8S node', () => {
    const k8s = new K8S('my-k8s');
    expect(k8s).toBeDefined();
    expect(k8s.label).toBe('my-k8s');
  });

  test('should create K8S Pod node', () => {
    const pod = new Pod('my-pod');
    expect(pod).toBeDefined();
    expect(pod.label).toBe('my-pod');
  });

  test('should create K8S Deployment node', () => {
    const deployment = new Deployment('my-deployment');
    expect(deployment).toBeDefined();
    expect(deployment.label).toBe('my-deployment');
  });

  test('should create K8S StatefulSet node', () => {
    const sts = new StatefulSet('my-statefulset');
    expect(sts).toBeDefined();
    expect(sts.label).toBe('my-statefulset');
  });
});

describe('Multi-Provider Integration', () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram({ name: 'Multi-Cloud Test', show: false });
    setDiagram(diagram);
  });

  afterEach(() => {
    setDiagram(null);
  });

  test('should create nodes from different providers', () => {
    const gce = new GCE('gcp-instance');
    const vm = new VM('azure-vm');
    const pod = new Pod('k8s-pod');

    expect(gce).toBeDefined();
    expect(vm).toBeDefined();
    expect(pod).toBeDefined();
  });

  test('should connect nodes from different providers', () => {
    const gce = new GCE('gcp-instance');
    const vm = new VM('azure-vm');

    expect(() => gce.to(vm)).not.toThrow();
  });
});
