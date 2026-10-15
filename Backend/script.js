const fs = require("fs");
require("dotenv").config();
const { argv } = require("yargs");
const nodeEnv = process.env.NODE_ENV || "development";
const environment = process.env.ENVIRONMENT || nodeEnv;

const services = [
  //   {
  //     name: "aws-services",
  //     dbName: process.env["AWS_DATABASE_NAME"],
  //     service: process.env["AWS_SERVICE_NAME"],
  //     stage: process.env["AWS_BASE_PATH"],
  //   },
  //   {
  //     name: "mebook-services",
  //     dbName: process.env["EBOOK_DATABASE_NAME"],
  //     service: process.env["EBOOK_SERVICE_NAME"],
  //     stage: process.env["EBOOK_BASE_PATH"],
  //   },
  //   {
  //     name: "pipeline-service",
  //     dbName: process.env["EBOOK_DATABASE_NAME"],
  //     service: process.env["PIPELINE_SERVICES_NAME"],
  //     stage: process.env["PIPELINE_BASE_PATH"],
  //   },
  {
    name: "auth-services",
    dbName: process.env["AUTH_DATABASE_NAME"],
    service: process.env["AUTH_SERVICE_NAME"],
    stage: process.env["AUTH_BASE_PATH"],
  },
  //   {
  //     name: "user-services",
  //     dbName: process.env["USER_DATABASE_NAME"],
  //     service: process.env["USER_SERVICE_NAME"],
  //     stage: process.env["USER_BASE_PATH"],
  //   },
  //   {
  //     name: "order-services",
  //     dbName: process.env["ORDER_DATABASE_NAME"],
  //     service: process.env["ORDER_SERVICE_NAME"],
  //     stage: process.env["ORDER_BASE_PATH"],
  //   },
  //   {
  //     name: "notification-services",
  //     dbName: process.env["NOTIFICATION_DATABASE_NAME"],
  //     service: process.env["NOTIFICATION_SERVICE_NAME"],
  //     stage: process.env["NOTIFICATION_BASE_PATH"],
  //   },
];
services.forEach((service) => {
  const serviceDir = `./${service.name}/`;
  const configDir = `${serviceDir}config/`;
  console.log(`\n🔹 Processing service: ${service.name}`);

  // Ensure directories exist
  [serviceDir, configDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
  console.log(
    "==result====>>>>>",
    service.name.toUpperCase().replace("-", "_"),
  );
  console.log(
    process.env[`${service.name.toUpperCase().replace("-", "_")}_API_PORT`],
  );

  // Environment variables for each servic0=
  const envVariables = {
    database_username: process.env["DATABASE_USERNAME"],
    password: process.env["DATABASE_PASSWORD"],
    database: service.dbName,
    host: process.env["DATABASE_HOST"],
    dialect: process.env["DIALECT"],
    use_env_variable: JSON.parse(process.env["DB_ENV_VARIABLE"] || false),
    s3_access_key: process.env["AWS_ACCESS_KEY_ID"],
    s3_secret_key: process.env["AWS_ACCESS_SECRET"],
    s3_region: process.env["AWS_REGION"],
    api_port:
      process.env[`${service.name.toUpperCase().replace("-", "_")}_API_PORT`],
    service: service.service,
    node_env: nodeEnv,
    stage: service.stage,
    language: process.env["LANGUAGES"],
    api_version: process.env["API_VERSION"],
    aws_host: process.env["AWS_HOST"],
    ebook_host: process.env["EBOOK_HOST"],
    auth_host: process.env["AUTH_HOST"],
    user_host: process.env["USER_HOST"],
    order_host: process.env["ORDER_HOST"],
    pipeline_host: process.env["PIPELINE_HOST"],
    notification_host: process.env["NOTIFICATION_HOST"],
    environment: process.env["ENVIRONMENT"],
    build_number: process.env["BUILD_NUMBER"],
    sqs_url: process.env["SQS_URL"],
    REDIS_HOST: process.env["REDIS_HOST"],
    REDIS_PORT: process.env["REDIS_PORT"],
    // REDIS_PASSWORD: process.env["REDIS_PASSWORD"],
    REDIS_ENABLE: process.env["REDIS_ENABLE"],
    REDIS_ENV: process.env["REDIS_ENV"],
    BATCH_BUCKET: process.env["BATCH_BUCKET"],
    SCONTENT_BUCKET: process.env["SCONTENT_BUCKET"],
    IS_SECURE_BOOK: process.env["IS_SECURE_BOOK"],
    INITIAL_PROMPT_ID: process.env["INITIAL_PROMPT_ID"],
  };
  // ✅ Only add these parameters if the service is `aws-services`
  //   if (service.name === "aws-services") {
  //     envVariables.api_port = process.env["AWS_SERVICES_API_PORT"];
  //     envVariables.image_url = process.env["IMAGE_URL"];
  //     envVariables.video_url = process.env["VIDEO_URL"];
  //     envVariables.bucket = process.env["BUCKET"];
  //     envVariables.video_bucket = process.env["VIDEO_BUCKET"];
  //     envVariables.sendgrid_api_key = process.env["SENDGRID_API_KEY"];
  //     envVariables.template_contact_us = process.env["TEMPLATE_CONTACT_US"];
  //     envVariables.template_order = process.env["TEMPLATE_ORDER"];
  //     envVariables.admin_email = process.env["ADMIN_EMAIL"];
  //     envVariables.mail_from_name = process.env["MAIL_FROM_NAME"];
  //     envVariables.copy_to_email = process.env["COPY_TO_EMAIL"];
  //     envVariables.s3_distribution = process.env["S3_DISTRIBUTION"];
  //     envVariables.kms_key_id = process.env["KMS_KEY_ID"];
  //     envVariables.template_order_received =
  //       process.env["TEMPLATE_ORDER_RECEIVED"];
  //     envVariables.template_publisher_inquiry =
  //       process.env["TEMPLATE_PUBLISHER_INQUIRY"];
  //     envVariables.template_academic_inquiry =
  //       process.env["TEMPLATE_ACADEMIC_INQUIRY"];
  //   }

  //   if (service.name === "mebook-services") {
  //     envVariables.api_port = process.env["MEBOOK_SERVICES_API_PORT"];
  //     envVariables.virtual_machine_host = process.env["VIRTUAL_MACHINE_HOST"];
  //     envVariables.cover_image_prefix = process.env["COVER_IMAGE_PREFIX"];
  //     envVariables.magic_link = process.env["MAGIC_LINK"];
  //     envVariables.pipeline_host_api = process.env["PIPELINE_HOST_API"];
  //   }

  if (service.name === "auth-services") {
    envVariables.api_port = process.env["AUTH_SERVICES_API_PORT"];
  }

  //   if (service.name === "user-services") {
  //     envVariables.api_port = process.env["USER_SERVICES_API_PORT"];
  //   }

  //   if (service.name === "order-services") {
  //     envVariables.api_port = process.env["ORDER_SERVICES_API_PORT"];
  //     envVariables.stripe_secret_key = process.env["STRIPE_SECRET_KEY"];
  //     envVariables.stripe_webhook_secret = process.env["STRIPE_WEBHOOK_SECRET"];
  //     envVariables.mail_chimp_key = process.env["MAIL_CHIMP_KEY"];
  //     envVariables.template_contact_us = process.env["TEMPLATE_CONTACT_US"];
  //     envVariables.admin_email = process.env["ADMIN_EMAIL"];
  //     envVariables.mail_from_name = process.env["MAIL_FROM_NAME"];
  //     envVariables.copy_to_email = process.env["COPY_TO_EMAIL"];
  //     envVariables.redirect_url = process.env["REDIRECT_URL"];
  //     envVariables.redirect_app_url = process.env["REDIRECT_APP_URL"];
  //     envVariables.apple_key_id = process.env["APPLE_KEY_ID"];
  //     envVariables.apple_issuer_id = process.env["APPLE_ISSUER_ID"];
  //     envVariables.apple_audience = process.env["APPLE_AUDIENCE"];
  //     envVariables.apple_bundle_id = process.env["APPLE_BUNDLE_ID"];
  //     envVariables.apple_verify_url_prod = process.env["APPLE_VERIFY_URL_PROD"];
  //     envVariables.apple_verify_url_dev = process.env["APPLE_VERIFY_URL_DEV"];
  //     envVariables.google_package_name = process.env["GOOGLE_PACKAGE_NAME"];
  //     envVariables.google_verify_url = process.env["GOOGLE_VERIFY_URL"];
  //     envVariables.cancel_app_url = process.env["CANCEL_APP_URL"];
  //     envVariables.mixpanel_token = process.env["MIXPANEL_TOKEN"];
  //     envVariables.mixpanel_token = process.env["MIXPANEL_TOKEN"];
  //     envVariables.amazon_shared_secret = process.env["AMAZON_SHARED_SECRET"];
  //   }

  //   if (service.name === "pipeline-service") {
  //     envVariables.api_port = process.env["PIPELINE_SERVICES_API_PORT"];
  //     envVariables.pipeline_sqs_url = process.env["PIPELINE_SQS_URL"];
  //     envVariables.virtual_machine_host = process.env["VIRTUAL_MACHINE_HOST"];
  //     envVariables.single_pipeline_sqs_url =
  //       process.env["SINGLE_PIPELINE_SQS_URL"];
  //     envVariables.domain_suffix = process.env["DOMAIN_SUFFIX"];
  //     envVariables.json_script_sqs_url = process.env["JSON_SCRIPT_SQS_URL"];
  //     envVariables.bucket = process.env["BUCKET"];
  //     envVariables.kms_key_id = process.env["KMS_KEY_ID"];
  //   }

  //   if (service.name === "notification-services") {
  //     envVariables.api_port = process.env["NOTIFICATION_SERVICES_API_PORT"];
  //     envVariables.web_favicon = process.env["WEB_FAVICON"];
  //     envVariables.bucket = process.env["BUCKET"];
  //     envVariables.amazon_client_id = process.env["AMAZON_CLIENT_ID"];
  //     envVariables.amazon_client_secret = process.env["AMAZON_CLIENT_SECRET"];
  //   }

  // JSON configuration for each service

  const jsonConfig = {
    node_env: nodeEnv,
    s3_region: process.env["AWS_REGION"],
    api_port:
      process.env[`${service.name.toUpperCase().replace("-", "_")}_API_PORT`],
    [environment]: {
      username: process.env["DATABASE_USERNAME"],
      password: process.env["DATABASE_PASSWORD"],
      database: service.dbName,
      host: process.env["DATABASE_HOST"],
      dialect: process.env["DIALECT"],
      use_env_variable: JSON.parse(process.env["DB_ENV_VARIABLE"] || "false"),
    },
  };

  // File paths
  const envFilePath = `${serviceDir}.env`;
  const configFilePath = `${configDir}config.json`;

  console.log("📝 Writing to:", envFilePath);

  // Write or update .env file
  let envContent = "";
  if (fs.existsSync(envFilePath)) {
    // Read existing content and update
    envContent = fs.readFileSync(envFilePath, "utf-8");
    // Remove unset values written by earlier versions of this script.
    envContent = envContent
      .split(/\r?\n/)
      .filter((line) => !/=\s*undefined\s*$/.test(line))
      .join("\n");
  }

  Object.entries(envVariables)
    .filter(([, value]) => value !== undefined)
    .forEach(([key, value]) => {
    const regex = new RegExp(`^${key.toUpperCase()}=.*`, "gm");
    const newEntry = `${key.toUpperCase()}=${value}`;
    if (envContent.match(regex)) {
      envContent = envContent.replace(regex, newEntry);
    } else {
      envContent += `\n${newEntry}`;
    }
    });

  fs.writeFileSync(envFilePath, envContent.trim());
  console.log(`✅ Updated .env for ${service.name} at ${envFilePath}`);

  // Write or update JSON config file
  let jsonConfigData = {};
  if (fs.existsSync(configFilePath)) {
    jsonConfigData = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
  }

  delete jsonConfigData.undefined;
  jsonConfigData = { ...jsonConfigData, ...jsonConfig };
  fs.writeFileSync(configFilePath, JSON.stringify(jsonConfigData, null, 2));
  console.log(
    `✅ Updated config.json for ${service.name} at ${configFilePath}`,
  );

  // Firebase configuration
  const firebaseConfig = {
    type: process.env["FIREBASE_TYPE"],
    project_id: process.env["FIREBASE_PROJECT_ID"],
    private_key_id: process.env["FIREBASE_PRIVATE_KEY_ID"],
    private_key: process.env["FIREBASE_PRIVATE_KEY"]?.replace(/\\n/g, "\n"), // Handle newline in private key
    client_email: process.env["FIREBASE_CLIENT_EMAIL"],
    client_id: process.env["FIREBASE_CLIENT_ID"],
    auth_uri: process.env["FIREBASE_AUTH_URI"],
    token_uri: process.env["FIREBASE_TOKEN_URL"],
    auth_provider_x509_cert_url:
      process.env["FIREBASE_AUTH_PROVIDER_X509_CERT_URL"],
    client_x509_cert_url: process.env["FIREBASE_CLIENT_E509_CERT_URL"],
    universe_domain: process.env["UNIVERSE_DOMAIN"],
  };

  const firebaseFilePath = `${configDir}firebase-config.json`;

  // Write Firebase config file
  fs.writeFileSync(
    firebaseFilePath,
    JSON.stringify(firebaseConfig, null, 2),
    (err) => {
      if (err) {
        console.error(
          `❌ Error writing Firebase config for ${service.name}:`,
          err,
        );
      } else {
        console.log(`✅ Firebase configuration written to ${firebaseFilePath}`);
      }
    },
  );
});
