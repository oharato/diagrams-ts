/**
 * Programming Example: Web Application Stack
 * 
 * A modern web application stack using React, Node.js, and PostgreSQL
 * with Redis for caching.
 */

import { Diagram, Cluster } from '../../../src';
import { React } from '../../../src/programming/framework';
import { JavaScript, TypeScript, NodeJS } from '../../../src/programming/language';
import { PostgreSQL, MongoDB } from '../../../src/onprem/database';
import { Nginx } from '../../../src/onprem/network';

async function createWebAppStackDiagram() {
  const diagram = new Diagram({
    name: 'Web Application Stack',
    filename: 'programming_web_app_stack',
    show: false,
    outformat: 'png',
  });

  await diagram.use(async () => {
    // Frontend
    const frontendCluster = new Cluster({ label: 'Frontend' });
    await frontendCluster.use(async () => {
      const reactApp = new React('react-spa');
      const typescript = new TypeScript('typescript');
      
      reactApp.to(typescript);
    });

    // Reverse Proxy
    const proxy = new Nginx('reverse-proxy');

    // Backend
    const backendCluster = new Cluster({ label: 'Backend' });
    await backendCluster.use(async () => {
      const nodeApp = new NodeJS('express-api');
      const javascript = new JavaScript('business-logic');
      
      nodeApp.to(javascript);
    });

    // Data Layer
    const dataCluster = new Cluster({ label: 'Data Layer' });
    await dataCluster.use(async () => {
      const postgres = new PostgreSQL('primary-db');
      const documentDb = new MongoDB('session-data');
      
      postgres.to(documentDb);
    });
  });

  console.log('Web Application Stack diagram created!');
  console.log('Output: programming_web_app_stack.png');
}

createWebAppStackDiagram().catch(console.error);
