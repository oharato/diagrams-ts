/**
 * AWS Network services
 */

import { AWSNode } from "./base";

class NetworkNode extends AWSNode {
  protected static type = "network";
  protected static iconDir = "resources/aws/network";
}

export class APIGateway extends NetworkNode {
  protected static icon = "api-gateway.png";
}

export class CloudFront extends NetworkNode {
  protected static icon = "cloudfront.png";
}

export class DirectConnect extends NetworkNode {
  protected static icon = "direct-connect.png";
}

export class ElasticLoadBalancing extends NetworkNode {
  protected static icon = "elastic-load-balancing.png";
}

export class ElbApplicationLoadBalancer extends NetworkNode {
  protected static icon = "elb-application-load-balancer.png";
}

export class ElbClassicLoadBalancer extends NetworkNode {
  protected static icon = "elb-classic-load-balancer.png";
}

export class ElbNetworkLoadBalancer extends NetworkNode {
  protected static icon = "elb-network-load-balancer.png";
}

export class GlobalAccelerator extends NetworkNode {
  protected static icon = "global-accelerator.png";
}

export class InternetGateway extends NetworkNode {
  protected static icon = "internet-gateway.png";
}

export class NATGateway extends NetworkNode {
  protected static icon = "nat-gateway.png";
}

export class Route53 extends NetworkNode {
  protected static icon = "route-53.png";
}

export class TransitGateway extends NetworkNode {
  protected static icon = "transit-gateway.png";
}

export class VPC extends NetworkNode {
  protected static icon = "vpc.png";
}

export class VpnConnection extends NetworkNode {
  protected static icon = "vpn-connection.png";
}

export class VpnGateway extends NetworkNode {
  protected static icon = "vpn-gateway.png";
}

// Aliases
export const CF = CloudFront;
export const ELB = ElasticLoadBalancing;
export const ALB = ElbApplicationLoadBalancer;
export const CLB = ElbClassicLoadBalancer;
export const NLB = ElbNetworkLoadBalancer;
export const GAX = GlobalAccelerator;
export const IGW = InternetGateway;
export const TGW = TransitGateway;
