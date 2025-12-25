/**
 * AWS Example: Serverless Web Application
 *
 * A serverless web application architecture using API Gateway, Lambda, DynamoDB,
 * and CloudFront for static content delivery.
 */

import { Diagram, Cluster } from "../../../src";
import { Lambda } from "../../../src/aws/compute";
import { Dynamodb } from "../../../src/aws/database";
import { S3 } from "../../../src/aws/storage";
import { APIGateway, CloudFront } from "../../../src/aws/network";
import { Cognito } from "../../../src/aws/security";

async function createServerlessWebAppDiagram() {
  const diagram = new Diagram({
    name: "Serverless Web Application",
    filename: "aws_serverless_web_app",
    show: false,
    outformat: "png",
  });

  await diagram.use(async () => {
    // Frontend
    const s3 = new S3("static-website");
    const cdn = new CloudFront("cdn");

    s3.to(cdn);

    // Authentication
    const auth = new Cognito("user-auth");

    // API Layer
    const apiGw = new APIGateway("rest-api");

    cdn.to(apiGw);
    apiGw.to(auth);

    // Backend Services
    const backendCluster = new Cluster({ label: "Backend Services" });
    await backendCluster.use(async () => {
      const userFunc = new Lambda("user-service");
      const productFunc = new Lambda("product-service");
      const orderFunc = new Lambda("order-service");

      const userDb = new Dynamodb("users-table");
      const productDb = new Dynamodb("products-table");
      const orderDb = new Dynamodb("orders-table");

      userFunc.to(userDb);
      productFunc.to(productDb);
      orderFunc.to(orderDb);
    });
  });

  console.log("AWS Serverless Web Application diagram created!");
  console.log("Output: aws_serverless_web_app.png");
}

createServerlessWebAppDiagram().catch(console.error);
