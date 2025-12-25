/**
 * K8S Network resources
 */

import { K8SNode } from "./base";

class NetworkNode extends K8SNode {
  protected static type = "network";
  protected static iconDir = "resources/k8s/network";
}

export class Ep extends NetworkNode {
  protected static icon = "ep.png";
}

export class Ing extends NetworkNode {
  protected static icon = "ing.png";
}

export class Netpol extends NetworkNode {
  protected static icon = "netpol.png";
}

export class SVC extends NetworkNode {
  protected static icon = "svc.png";
}

// Aliases
export const Endpoint = Ep;
export const Ingress = Ing;
export const NetworkPolicy = Netpol;
export const Service = SVC;
