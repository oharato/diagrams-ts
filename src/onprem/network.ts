/**
 * OnPrem Network services
 */

import { OnPremNode } from './base';

class NetworkNode extends OnPremNode {
  protected static type = 'network';
  protected static iconDir = 'resources/onprem/network';
}

export class Apache extends NetworkNode {
  protected static icon = 'apache.png';
}

export class Consul extends NetworkNode {
  protected static icon = 'consul.png';
}

export class Envoy extends NetworkNode {
  protected static icon = 'envoy.png';
}

export class Etcd extends NetworkNode {
  protected static icon = 'etcd.png';
}

export class Haproxy extends NetworkNode {
  protected static icon = 'haproxy.png';
}

export class Internet extends NetworkNode {
  protected static icon = 'internet.png';
}

export class Istio extends NetworkNode {
  protected static icon = 'istio.png';
}

export class Kong extends NetworkNode {
  protected static icon = 'kong.png';
}

export class Nginx extends NetworkNode {
  protected static icon = 'nginx.png';
}

export class Traefik extends NetworkNode {
  protected static icon = 'traefik.png';
}

export class Zookeeper extends NetworkNode {
  protected static icon = 'zookeeper.png';
}

// Aliases
export const HAProxy = Haproxy;
export const ETCD = Etcd;
