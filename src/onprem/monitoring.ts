/**
 * OnPrem Monitoring services
 */

import { OnPremNode } from './index';

class MonitoringNode extends OnPremNode {
  protected static type = 'monitoring';
  protected static iconDir = 'resources/onprem/monitoring';
}

export class Datadog extends MonitoringNode {
  protected static icon = 'datadog.png';
}

export class Grafana extends MonitoringNode {
  protected static icon = 'grafana.png';
}

export class Nagios extends MonitoringNode {
  protected static icon = 'nagios.png';
}

export class Newrelic extends MonitoringNode {
  protected static icon = 'newrelic.png';
}

export class Prometheus extends MonitoringNode {
  protected static icon = 'prometheus.png';
}

export class Splunk extends MonitoringNode {
  protected static icon = 'splunk.png';
}

export class Thanos extends MonitoringNode {
  protected static icon = 'thanos.png';
}

// Aliases
export const NewRelic = Newrelic;
