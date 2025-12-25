import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { Diagram, setDiagram } from "../src";

// Programming provider
import { Programming } from "../src/programming";
import { Python, JavaScript, TypeScript } from "../src/programming/language";
import { React, Django, FastAPI } from "../src/programming/framework";

// OnPrem provider
import { OnPrem } from "../src/onprem";
import { PostgreSQL, MongoDB, MySQL } from "../src/onprem/database";
import { Nginx, HAProxy } from "../src/onprem/network";
import { Server } from "../src/onprem/compute";

// AWS services
import { RDS, Dynamodb, S3, VPC, IAM } from "../src/aws";

// GCP services
import { Bigtable, GCS, VPC as GCPVPC, KMS as GCPKMS } from "../src/gcp";

// Azure services
import { CosmosDb, BlobStorage, VirtualNetworks, KeyVaults } from "../src/azure";

// Mock ts-graphviz
vi.mock("ts-graphviz", () => ({
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
  toDot: vi.fn(() => "digraph {}"),
}));

// Mock fs
vi.mock("fs", () => ({
  default: { writeFileSync: vi.fn() },
  writeFileSync: vi.fn(),
}));

describe("Programming Provider", () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram({ name: "Programming Test", show: false });
    setDiagram(diagram);
  });

  afterEach(() => {
    setDiagram(null);
  });

  test("should create Programming node", () => {
    const prog = new Programming("my-prog");
    expect(prog).toBeDefined();
  });

  test("should create language nodes", () => {
    const python = new Python("python-app");
    const js = new JavaScript("js-app");
    const ts = new TypeScript("ts-app");

    expect(python).toBeDefined();
    expect(js).toBeDefined();
    expect(ts).toBeDefined();
  });

  test("should create framework nodes", () => {
    const react = new React("frontend");
    const django = new Django("backend");
    const fastapi = new FastAPI("api");

    expect(react).toBeDefined();
    expect(django).toBeDefined();
    expect(fastapi).toBeDefined();
  });
});

describe("OnPrem Provider", () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram({ name: "OnPrem Test", show: false });
    setDiagram(diagram);
  });

  afterEach(() => {
    setDiagram(null);
  });

  test("should create OnPrem node", () => {
    const onprem = new OnPrem("my-onprem");
    expect(onprem).toBeDefined();
  });

  test("should create database nodes", () => {
    const postgres = new PostgreSQL("pg-db");
    const mongo = new MongoDB("mongo-db");
    const mysql = new MySQL("mysql-db");

    expect(postgres).toBeDefined();
    expect(mongo).toBeDefined();
    expect(mysql).toBeDefined();
  });

  test("should create network nodes", () => {
    const nginx = new Nginx("web-server");
    const haproxy = new HAProxy("load-balancer");

    expect(nginx).toBeDefined();
    expect(haproxy).toBeDefined();
  });

  test("should create compute nodes", () => {
    const server = new Server("app-server");
    expect(server).toBeDefined();
  });
});

describe("AWS Additional Services", () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram({ name: "AWS Services Test", show: false });
    setDiagram(diagram);
  });

  afterEach(() => {
    setDiagram(null);
  });

  test("should create database services", () => {
    const rds = new RDS("my-rds");
    const dynamodb = new Dynamodb("my-table");

    expect(rds).toBeDefined();
    expect(dynamodb).toBeDefined();
  });

  test("should create storage services", () => {
    const s3 = new S3("my-bucket");
    expect(s3).toBeDefined();
  });

  test("should create network services", () => {
    const vpc = new VPC("my-vpc");
    expect(vpc).toBeDefined();
  });

  test("should create security services", () => {
    const iam = new IAM("my-iam");
    expect(iam).toBeDefined();
  });
});

describe("GCP Additional Services", () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram({ name: "GCP Services Test", show: false });
    setDiagram(diagram);
  });

  afterEach(() => {
    setDiagram(null);
  });

  test("should create database services", () => {
    const bigtable = new Bigtable("my-table");
    expect(bigtable).toBeDefined();
  });

  test("should create storage services", () => {
    const gcs = new GCS("my-bucket");
    expect(gcs).toBeDefined();
  });

  test("should create network services", () => {
    const vpc = new GCPVPC("my-vpc");
    expect(vpc).toBeDefined();
  });

  test("should create security services", () => {
    const kms = new GCPKMS("my-kms");
    expect(kms).toBeDefined();
  });
});

describe("Azure Additional Services", () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram({ name: "Azure Services Test", show: false });
    setDiagram(diagram);
  });

  afterEach(() => {
    setDiagram(null);
  });

  test("should create database services", () => {
    const cosmosdb = new CosmosDb("my-db");
    expect(cosmosdb).toBeDefined();
  });

  test("should create storage services", () => {
    const blob = new BlobStorage("my-storage");
    expect(blob).toBeDefined();
  });

  test("should create network services", () => {
    const vnet = new VirtualNetworks("my-vnet");
    expect(vnet).toBeDefined();
  });

  test("should create security services", () => {
    const kv = new KeyVaults("my-keyvault");
    expect(kv).toBeDefined();
  });
});
