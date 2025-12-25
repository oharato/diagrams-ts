#!/usr/bin/env node

/**
 * Verification script to demonstrate that circular dependencies are fixed.
 * 
 * This script checks:
 * 1. All provider base classes can be imported without circular dependency errors
 * 2. Service modules can be imported independently
 * 3. Public API remains consistent
 */

console.log('🔍 Verifying circular dependency fix...\n');

// Test 1: Import base classes directly
console.log('Test 1: Importing base classes...');
try {
  const { AWSNode } = require('./dist/aws/base.js');
  const { GCPNode } = require('./dist/gcp/base.js');
  const { AzureNode } = require('./dist/azure/base.js');
  const { K8SNode } = require('./dist/k8s/base.js');
  const { OnPremNode } = require('./dist/onprem/base.js');
  const { ProgrammingNode } = require('./dist/programming/base.js');
  console.log('✅ All base classes imported successfully\n');
} catch (error) {
  console.error('❌ Failed to import base classes:', error.message);
  process.exit(1);
}

// Test 2: Import service modules independently
console.log('Test 2: Importing service modules...');
try {
  const { EC2 } = require('./dist/aws/compute.js');
  const { RDS } = require('./dist/aws/database.js');
  const { GCE } = require('./dist/gcp/compute.js');
  const { PostgreSQL } = require('./dist/onprem/database.js');
  console.log('✅ All service modules imported successfully\n');
} catch (error) {
  console.error('❌ Failed to import service modules:', error.message);
  process.exit(1);
}

// Test 3: Import from provider index (public API)
console.log('Test 3: Importing from provider index...');
try {
  const aws = require('./dist/aws/index.js');
  const gcp = require('./dist/gcp/index.js');
  const azure = require('./dist/azure/index.js');
  const k8s = require('./dist/k8s/index.js');
  const onprem = require('./dist/onprem/index.js');
  const programming = require('./dist/programming/index.js');
  
  // Verify exports are available
  if (!aws.AWSNode || !aws.EC2) throw new Error('AWS exports missing');
  if (!gcp.GCPNode || !gcp.GCE) throw new Error('GCP exports missing');
  if (!azure.AzureNode || !azure.VM) throw new Error('Azure exports missing');
  if (!k8s.K8SNode || !k8s.Pod) throw new Error('K8s exports missing');
  if (!onprem.OnPremNode || !onprem.PostgreSQL) throw new Error('OnPrem exports missing');
  if (!programming.ProgrammingNode || !programming.Python) throw new Error('Programming exports missing');
  
  console.log('✅ All provider index exports available\n');
} catch (error) {
  console.error('❌ Failed to import from provider index:', error.message);
  process.exit(1);
}

// Test 4: Create instances to verify runtime behavior
console.log('Test 4: Creating node instances...');
try {
  const { Diagram, setDiagram } = require('./dist/index.js');
  const { EC2, RDS } = require('./dist/aws/index.js');
  const { GCE } = require('./dist/gcp/index.js');
  const { VM } = require('./dist/azure/index.js');
  const { Pod } = require('./dist/k8s/index.js');
  
  const diagram = new Diagram({ name: 'Test', show: false });
  setDiagram(diagram);
  
  const ec2 = new EC2('test-ec2');
  const rds = new RDS('test-rds');
  const gce = new GCE('test-gce');
  const vm = new VM('test-vm');
  const pod = new Pod('test-pod');
  
  if (ec2.label !== 'test-ec2') throw new Error('EC2 label incorrect');
  if (rds.label !== 'test-rds') throw new Error('RDS label incorrect');
  if (gce.label !== 'test-gce') throw new Error('GCE label incorrect');
  if (vm.label !== 'test-vm') throw new Error('VM label incorrect');
  if (pod.label !== 'test-pod') throw new Error('Pod label incorrect');
  
  console.log('✅ All node instances created successfully\n');
} catch (error) {
  console.error('❌ Failed to create node instances:', error.message);
  process.exit(1);
}

// Test 5: Verify no circular reference errors
console.log('Test 5: Checking for circular reference errors...');
try {
  // This would throw "Cannot access 'AWSNode' before initialization" if circular deps exist
  const module1 = require('./dist/aws/index.js');
  const module2 = require('./dist/aws/compute.js');
  const module3 = require('./dist/aws/database.js');
  
  // Re-require should work without errors
  const module4 = require('./dist/aws/index.js');
  
  console.log('✅ No circular reference errors detected\n');
} catch (error) {
  console.error('❌ Circular reference error:', error.message);
  process.exit(1);
}

console.log('🎉 All verification tests passed!');
console.log('✅ Circular dependencies have been successfully resolved');
console.log('✅ Public API remains consistent');
console.log('✅ All provider modules work correctly');
