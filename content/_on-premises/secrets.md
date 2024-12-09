---
layout: article
title: Secrets
order: 4
section: Helm3 deployments
version: 22.38
description: Document describes the secrets required by the HELM3 deployment of the platform.
category: helm3
---

{: .no_toc}
[Platform release](https://docs.elastic.io/releases/{{page.version}}#helm3) - **v{{page.version}}**
{: .note.normal}

{{page.description}} From the platform version 21.37 we separated the secrets from
the platform HELM3 charts to provide best practices for kubernetes secret management.

Please note, **you must create all the required secrets before the installation of the platform**. Without secrets in place the platform deployment is not possible.
{: .note.errors}

We present the secrets and their structure assuming the platform has default
namespaces called `platform` and `tasks`. If you are using other
[values for namespaces](namespaces) do not forget to use them instead of the
default ones while applying these secrets.
{: .note.info}

## Internal docker registry secrets

These are the secrets used by the internal docker registry service. Depending on
the type of platform installation you can ommit some of them.

### Docker registry htpasswd secret

**REQUIRED** by the [`docker-registry service`](common-values#dockerRegistry) if the `internal` docker-registry is used. Platform uses this secret in the configuration of username/password authentication for internal docker registry.

Set value of this secret as a simple [htpasswd](https://linux.die.net/man/1/htpasswd) string.

**IMPORTANT**: The credentials used in this secret should match the credentials
used to generate [Docker registry push secret](#docker-registry-push-secret)
and [Docker registry pull secret](#docker-registry-pull-secret).
{: .note.info}

The **_secret_name_** should match the [`.Values.global.secrets.dockerRegistryHtpasswdSecret`](common-values#dockerRegistryHtpasswdSecret) value from the platform chart.

```yaml
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  name: secret_name
  namespace: platform
data:
  htpasswd: "<value>"
```

### Docker registry tls secret

**REQUIRED** by the [`docker-registry service`](common-values#dockerRegistry) if the `internal` docker-registry is used and it should use secure connection (E.g. if [`.Values.global.services.dockerRegistry.secured`](common-values#dockerRegistry) set to `true`).

The **_secret_name_** should match the `.Values.global.services.dockerRegistry.tlsSecretName` value from the platform chart.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret_name
  namespace: platform
type: "kubernetes.io/tls"
data:
  tls.crt: "<value>"
  tls.key: "<value>"
```

### Docker registry push secret

**REQUIRED** by the [`docker-registry service`](common-values#dockerRegistry) and [`git-receiver-service`](common-values#gitReceiver). Platform uses this secret to push component docker container images to the `docker-registry-service`.

It's a simple [.dockerconfigjson kubernetes](https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets) secret.

The **_secret_name_** should match the [`.Values.global.secrets.dockerRegistryPush`](common-values#dockerRegistryPush)
value from the platform chart.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret_name
  namespace: platform
type: "kubernetes.io/dockerconfigjson"
data:
  .dockerconfigjson: "<value>"
```

### Docker registry pull secret

**REQUIRED** by the [`docker-registry service`](common-values#dockerRegistry) and [`admiral`](common-values#admiral)
.
It's a simple [.dockerconfigjson kubernetes](https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets) secret.

The **_secret_name_** should match the [`.Values.global.secrets.dockerRegistry`](common-values#dockerRegistry) value from the platform chart.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret_name
  namespace: tasks
type: "kubernetes.io/dockerconfigjson"
data:
  .dockerconfigjson: "<value>"
```

## Platform docker registry secret

**REQUIRED** by the whole platform. Since it's used to pull elastic.io images from the dockerhub.

It's a simple [.dockerconfigjson kubernetes](https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets) secret.

The **_secret_name_** should match the [`.Values.global.secrets.imagePull`](common-values#imagePull) value from the platform chart.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret_name
  namespace: platform
type: "kubernetes.io/dockerconfigjson"
data:
  .dockerconfigjson: "<value>"
```

## Git-receiver secret

**REQUIRED** by the [`git-receiver-service`](common-values#gitReceiver).

The value of this key is an rsa private key.

The **_secret_name_** should match the [`.Values.global.secrets.gitReceiverPrivateKey`](common-values#gitReceiverPrivateKey) value from the platform chart.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret_name
  namespace: platform
type: Opaque
data:
  key: <value>
```

## Ingress tls secret

**REQUIRED** by the [`handmaiden-service`](common-calues#handmaiden) and [`ingress`](common-values#ingress) service.

The secret is the simple [kubernetes tls](https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets) secret.

You also should provide the **_secret_name_** to the [Platform environment secret](#platform-environment-secret):

```yaml
DEFAULT_INGRESS_CERT_NAME: secret_name
```

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret_name
  namespace: platform
type: "kubernetes.io/tls"
data:
  tls.crt: "<value>"
  tls.key: "<value>"
```

## Knight of the bloody gate tls secret

**REQUIRED** if the [VPM agents feature](common-values#knightOfTheBloodyGate) is enabled.

The secret is the simple [kubernetes tls](https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets) secret.

**Important**: At the moment the name of the secret should be `knight-of-the-bloody-gate-ca`.
{: .note.warning}

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: knight-of-the-bloody-gate-ca
  namespace: platform
type: "kubernetes.io/tls"
data:
  tls.crt: <value>
  tls.key: <value>
```

## Platform environment secret

**REQUIRED** by the [elastic.io platform](common-values#platform).

We use this secret to store the platform environment variables.

It's an simple [opaque](https://kubernetes.io/docs/concepts/configuration/secret/#opaque-secrets) kubernetes secret.


The secret must have the following structure:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: elasticio
  namespace: platform
type: Opaque
stringData:
  ENVIRONMENT_VARIABLES: ""
  ...
```
The list of environment variables and their explanations follows.



### ACCOUNTS_PASSWORD:
{: .charts.h3}
`accounts_password` - A secret key, used for payload encryption of user credentials in DB.
{: .charts.level_h3}
### ADMIRAL_SERVICE_ACCOUNT_USERNAME:
{: .charts.h3}
`admiral` - API service account for admiral, leave as is.
{: .charts.level_h3}
### ADMIRAL_SERVICE_ACCOUNT_PASSWORD:
{: .charts.h3}
`admiral_service_acc_password` - API service account password for admiral, any random string.
{: .charts.level_h3}
### ADMIRAL_QUOTA_SERVICE_TYPE
{: .charts.h3}
`gold-dragon-coin` - Can have values `gold-dragon-coin` or `quota-service` (for now it should be `gold-dragon-coin`).
{: .charts.level_h3}
### AGENT_VPN_ENTRYPOINT:
{: .charts.h3}
`agent_vpn_entrypoint` - entry point ip/domain for vpn local agent. Should be set if agents are enabled.
{: .charts.level_h3}
### ALLOW_EMPTY_CONTRACT_AFTER_THE_LAST_USER_REMOVING:
{: .charts.h3}
### AMQP_URI:
{: .charts.h3}
URI used to connect platform services to RabbitMQ. MUST include the same vhost as in "RABBITMQ_VIRTUAL_HOST" secret
{: .charts.level_h3}

### APPRUNNER_IMAGE:
{: .charts.h3}
Docker image used for running flow steps containers. Default value `"elasticio/apprunner:production"`
{: .charts.level_h3}

### BRAN_PREFETCH_COUNT:
{: .charts.h3}
`30`
{: .charts.level_h3}
### BRAN_CLICKHOUSE_URI:
{: .charts.h3}
If bran enabled: provide clickhouse uri.
{: .charts.level_h3}
### BRAN_CLICKHOUSE_NO_REPLICA:
{: .charts.h3}
If bran uses replicated clickhouse. Default value `true`.
{: .charts.level_h3}
### BRAN_RETENTION_MONTHS_MESSAGES:
{: .charts.h3}
Default value "1"
{: .charts.level_h3}
### BRAN_RETENTION_MONTHS_EVENTS:
{: .charts.h3}
Default value "1"
{: .charts.level_h3}

### CACHE_REDIS_URI:
{: .charts.h3}
Set if the cache service supplied with the platform disabled in favour of
external one and Redis sentinels are NOT USED.
{: .charts.level_h3}
### CACHE_REDIS_SENTINELS:
{: .charts.h3}
`- host`: ""
{: .charts.h4}
`port`: ""
{: .charts.h4}
Set if the cache service supplied with the platform disabled in favour
of external one and Redis sentinels are USED. Configuration for our caching solution
based on Redis. List of sentinels to connect to. Format: array of objects with
`host` and `port` values.
{: .charts.level_h3}
### CACHE_REDIS_SENTINEL_NAME:
{: .charts.h3}
Set if the cache service supplied with the platform disabled in favour of
external one and Redis sentinels are USED. Configuration for our caching solution based on Redis. Identifies a group of Redis instances composed of a master and one or more slaves.
{: .charts.level_h3}
### CACHE_REDIS_SENTINEL_PASSWORD:
{: .charts.h3}
Set if the cache service supplied with the platform disabled in favour of external
one and Redis sentinels are USED. Configuration for our caching solution based on
Redis. Password to authenticate with Sentinel.
{: .charts.level_h3}
### CACHE_REDIS_PASSWORD:
{: .charts.h3}
### CERTIFICATE_STORE_ENCRYPTION_PASSWORD:
{: .charts.h3}
`certificate_store_encryption_password` - Password for encrypting tenant certs store (provided during creating new tenant)
{: .charts.level_h3}
### CERTIFICATE_SUBJECT:
{: .charts.h3}
Optional value. The ubject for `bloody-gate` server CA.
{: .charts.level_h3}

### COMPANY_NAME:
{: .charts.h3}
The default contract name where the main components are deployed.
{: .charts.level_h3}
### COMPONENT_CPU:
{: .charts.h3}
`0.08` - CPU allocated for each integration flow step pod running in the Kubernetes cluster.
{: .charts.level_h3}
### COMPONENT_CPU_LIMIT:
{: .charts.h3}
`1` - CPU limit for each integration flow step pod running in the Kubernetes cluster.
{: .charts.level_h3}
### COMPONENT_MEM_DEFAULT:
{: .charts.h3}
`90` - Allocated memory in MB for each integration flow step pod running with Node.js code in the Kubernetes cluster.
{: .charts.level_h3}
### COMPONENT_MEM_DEFAULT_LIMIT:
{: .charts.h3}
`256` - Memory limit in MB or each integration flow step pod running with Node.js code in the Kubernetes cluster.
{: .charts.level_h3}
### COMPONENT_MEM_JAVA:
{: .charts.h3}
`400` - Allocated memory in MB for each integration flow step pod running with JAVA code in the Kubernetes cluster.
{: .charts.level_h3}
### COMPONENT_MEM_JAVA_LIMIT:
{: .charts.h3}
`512` - Memory limit in MB or each integration flow step pod running with JAVA code in the Kubernetes cluster.
{: .charts.level_h3}
### DEBUG_DATA_SIZE_LIMIT_MB:
{: .charts.h3}
`5` - Limits the size in MB of data samples to be stored into the DB.
{: .charts.level_h3}
### DEFAULT_DRIVER_BACKEND: `"kubernetes"`
{: .charts.h3}

### DOCKER_REGISTRY_STORAGE_S3_ACCESSKEY:
{: .charts.h3}
Configuration for docker registry for components if an s3 storage driver is used.
{: .charts.level_h3}
### DEFAULT_INGRESS_CERT_NAME:
{: .charts.h3}
### DEFAULT_PER_CONTRACT_QUOTA:
{: .charts.h3}
`5`- Default limit of quota tokens per contract. Will work only when the `enforce_quota` is set to `true`.
{: .charts.level_h3}
### TEAM_DOCKER_REGISTRY:
{: .charts.h3}
An optional environment variable to use for deploying the custom developed components.
{: .charts.level_h3}
#### uri:
{: .charts.h4}
For the `uri` system expects `string` containg the address of docker registry like `"https://index.docker.io/v1/"`
{: .charts.level_h4}
##### credentials:
{: .charts.h5}
The credentials object can be `authFile` - path of the authentication file, `registryToken` - bearer token for accessing the source registry or `username` and `password`.
{: .charts.level_h5.note.info}
###### username:
{: .charts.h6}
###### password:
{: .charts.h6}
### DOCKER_REGISTRIES_ENCRYPTION_KEY:
{: .charts.h3}
Encryption key for docker registry credentials.
{: .charts.level_h3}

### DOCKER_REGISTRY_STORAGE_S3_SECRETKEY:
{: .charts.h3}
### DOCKER_REGISTRY_STORAGE_S3_REGION:
{: .charts.h3}
### DOCKER_REGISTRY_STORAGE_S3_REGIONENDPOINT:
{: .charts.h3}
### DOCKER_REGISTRY_STORAGE_S3_BUCKET:
{: .charts.h3}
### DOCKER_REGISTRY_STORAGE_S3_ENCRYPT:
{: .charts.h3}
### DOCKER_REGISTRY_STORAGE_S3_KEYID:
{: .charts.h3}
### DOCKER_REGISTRY_STORAGE_S3_SECURE:
{: .charts.h3}
### DOCKER_REGISTRY_STORAGE_S3_SKIPVERIFY:
{: .charts.h3}
### DOCKER_REGISTRY_STORAGE_S3_V4AUTH:
{: .charts.h3}
### DOCKER_REGISTRY_STORAGE_S3_CHUNKSIZE:
{: .charts.h3}
### DOCKER_REGISTRY_STORAGE_S3_ROOTDIRECTORY:
{: .charts.h3}
### DOCKER_REGISTRY_STORAGE_S3_STORAGECLASS:
{: .charts.h3}
### ELASTIC_SEARCH_URI:
{: .charts.h3}
`elastic_search_uri` - Elasticsearch URI used as a backend for the GrayLog.
{: .charts.level_h3}
### ENFORCE_QUOTA:
{: .charts.h3}
Default "false" - If enabled all quota limits would apply.
{: .charts.level_h3}
### ENVIRONMENT:
{: .charts.h3}
`production` - Takes part in queue naming in RabbitMQ.
{: .charts.level_h3}
### ENV_PASSWORD:
{: .charts.h3}
`env_password` - A secret key used to encrypting the environment variables payload in the DB.
{: .charts.level_h3}
### COMPONENTS_PUSHER_AUTH_USERNAME:
{: .charts.h3}
Environment variable used to authenticate to components-pusher server.
{: .charts.level_h3}
### COMPONENTS_PUSHER_AUTH_PASSWORD:
{: .charts.h3}
Environment variable used to authenticate to components-pusher server.
{: .charts.level_h3}
### FACELESS_ENCRYPTION_KEY:
{: .charts.h3}
Set this if you need to encrypt the faceless data. It should be `base64` encoded and have at least 256 bit (32 bytes) length. You can create it using `openssl rand -base64 32` command.
{: .charts.level_h3}
### FACELESS_AUTH_USERNAME:
{: .charts.h3}
### FACELESS_AUTH_PASSWORD:
{: .charts.h3}
### FORCE_DESTROY_DEBUG_TASK_TIMEOUT_SEC:
{: .charts.h3}
### FORCE_DESTROY_ONE_TIME_EXEC_SEC:
{: .charts.h3}
### FRONTEND_SERVICE_ACCOUNT_USERNAME:
{: .charts.h3}
`frontend` - eio API service acc frontend, leave as is.
{: .charts.level_h3}
### FRONTEND_SERVICE_ACCOUNT_PASSWORD:
{: .charts.h3}
`frontend_service_acc_password` - eio API service acc frontend, any random string.
{: .charts.level_h3}
### FRONTEND_SESSION_SECRET:
{: .charts.h3}
### FRONTEND_NO_EXTERNAL_RESOURCES:
{: .charts.h3}
Should be set if frontend should not use external resources.
{: .charts.level_h3}

### GELF_HOST:
{: .charts.h3}
`gelf_host` - Hostname where Platform’s Graylog GELF input is running (usually the same as Graylog’s hostname).
{: .charts.level_h3}
### GELF_PORT:
{: .charts.h3}
`12203` - Port where Platform’s Graylog GELF input is running (usually 12201).
{: .charts.level_h3}
### GELF_PROTOCOL:
{: .charts.h3}
`udp` - Protocol of Platform’s Graylog GELF input (usually `udp`).
{: .charts.level_h3}

### GENDRY_SERVICE_ACCOUNTS:
{: .charts.h3}
Optional value. Object with username/password.
{: .charts.level_h3}

### GIT_RECEIVER_HOST:
{: .charts.h3}
`git_receiver_host` - The domain name for gitreceiver.
{: .charts.level_h3}
### GIT_RECEIVER_PRIVATE_KEY_PATH:
{: .charts.h3}
"/etc/gitreceiver/private-key/key"
{: .charts.level_h3}
### HOOKS_DATA_PASSWORD:
{: .charts.h3}
`hooks_data_password` - It’s a secret key, used for encryption of payload of sailor hooks data in DB.
{: .charts.level_h3}

### INTERCOM_ACCESS_TOKEN:
{: .charts.h3}
`intercom_token` - Token in case when Intercom integration is used.
{: .charts.level_h3}
### INTERCOM_APP_ID:
{: .charts.h3}
`app_id` - App ID in case when Intercom integration is used.
{: .charts.level_h3}
### INTERCOM_SECRET_KEY:
{: .charts.h3}
`intercom_secret_key` - Secret Key in case when Intercom integration is used.
{: .charts.level_h3}

### IRON_BANK_CLICKHOUSE_NODES:
{: .charts.h3}
List of clickhouse cluster nodes for iron-bank service.
{: .charts.level_h3}
`- host`: the internal address of the clickhouse node
{: .charts.h4}
`port`: the port number of node
{: .charts.h4}
`user`: The user name to use for access.
{: .charts.h4}
`password`: The password to use for access.
{: .charts.h4}

### IRON_BANK_CLICKHOUSE_NO_REPLICA:
{: .charts.h3}
`false` if iron-bank uses replicated clickhouse. Default value is `true`.
{: .charts.level_h3}
### IGNORE_CONTAINER_ERRORS:
{: .charts.h3}
Optional value.
{: .charts.level_h3}

### LIMITED_WORKSPACE_FLOW_TTL_IN_MINUTES:
{: .charts.h3}
### LOG_LEVEL:
{: .charts.h3}
The logging level for the platform services.
{: .charts.level_h3}
### LOOKOUT_PREFETCH_COUNT:
{: .charts.h3}

### MAESTER_JWT_SECRET:
{: .charts.h3}
If maester enabled you need provide jwt secret:
{: .charts.level_h3}
### MAESTER_MONGO_URI:
{: .charts.h3}
Starting from 22.20, you can use a dedicated database for storing Maester objects
and the run-time attachments. Use this environment variable to target this new database.
Otherwise use the same values as in the `MONGO_URI` to use the same database.
{: .charts.level_h3.note.info}
### MAESTER_REDIS_URI:
{: .charts.h3}
Set if the maesterRedis service supplied with the platform disabled in favour of
external one and Redis sentinels are NOT USED.
{: .charts.level_h3}
### MAESTER_REDIS_SENTINELS:
{: .charts.h3}
`- host`: ""
{: .charts.h4}
`port`: ""
{: .charts.h4}
Set if the maesterRedis service supplied with the platform disabled in favour of
external one and Redis sentinels are USED. Maester's Redis config. List of
sentinels to connect to. Format: array of objects with `host` and `port` values
{: .charts.level_h3}
### MAESTER_REDIS_SENTINEL_NAME:
{: .charts.h3}
Set if the maesterRedis service supplied with the platform disabled in favour of
external one and Redis sentinels are USED. Maester's Redis config. Identifies a
group of Redis instances composed of a master and one or more slaves.
{: .charts.level_h3}
### MAESTER_REDIS_SENTINEL_PASSWORD:
{: .charts.h3}
Set if the maesterRedis service supplied with the platform disabled in favour of
external one and Redis sentinels are USED. Maester's Redis config. Password to
authenticate with Sentinel.
{: .charts.level_h3}
### MAESTER_REDIS_PASSWORD:
{: .charts.h3}
### MAESTER_OBJECTS_TTL_IN_SECONDS:
{: .charts.h3}
`900` - Object storage time in Maester.
{: .charts.level_h3}
### MAESTER_OBJECT_STORAGE_SIZE_THRESHOLD:
{: .charts.h3}
`1048576` - Limit in Bits when the object are redirected to Maester instead of regular queues in RabbitMQ.
{: .charts.level_h3}
### MAESTER_MAX_SIZE_PER_OBJECT:
{: .charts.h3}
**Value in bytes** - you can use to control the maximum object size accepted by the Maester
service. The default maximum value is set 1GB. The recommended range is from 100MB to 1GB.
{: .charts.level_h3}
### MANDRILL_API_KEY:
{: .charts.h3}
`mandrill_api_key` - Mandrill API key for sending platform emails (Leave empty if using SMTP).
{: .charts.level_h3}
### MAX_FORCE_DESTROY_DEBUG_TASK_TIMEOUT_SEC:
{: .charts.h3}
### MAX_FORCE_DESTROY_ONE_TIME_EXEC_SEC:
{: .charts.h3}
### MAX_LOGIN_ATTEMPTS:
{: .charts.h3}
Sets the number of failed login attempts allowed before users are locked out of the system. Default value is `5`.
(case 1) If you don’t 2FA enabled, this is the number of failed login attempts. (case 2) If you have 2FA enabled, this is combined number of failed 2FA code and login attempts. This means if your user has 2FA enabled and succeeded with login but failed with 2FA more than the value of `MAX_LOGIN_ATTEMPTS` then your user will be locked out of the system. To unlock such users the tenant administration must first disable 2FA for this user and instruct users to navigate to `/forgot` address of the tenant to reset their password. This will reset the counter and user can login again.
{: .charts.level_h3 .note.info }
### MESSAGE_CRYPTO_IV:
{: .charts.h3}
`message_crypto_iv` - The initial vector used for encryption of the message payloads between flow containers. [More details here](https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options).
{: .charts.level_h3}
### MESSAGE_CRYPTO_PASSWORD:
{: .charts.h3}
`message_crypto_password` - The secret key used for encryption of message payloads between flow containers. Used in conjunction with the `message_crypto_iv`.
{: .charts.level_h3}
### MIN_PASSWORD_LENGTH:
{: .charts.h3}
Default: `8`. The user password must have at least this number of symbols.
{: .charts.level_h3}
### MIN_PASSWORD_RULES_MATCHES:
{: .charts.h3}
Default: `3`. The number of minimum different character groups (uppercase, lowercase, numbers, special symbols) should be matched.
{: .charts.level_h3}
### MONGO_URI:
{: .charts.h3}
`mongo_uri` - The main MongoDB instance, used by most of the services and carrying almost all payload for DB storage.
{: .charts.level_h3}
### NODE_ENV: `"production"`
{: .charts.h3}
Environment variable used in all platform microservices, default is `production`, do not change.
{: .charts.level_h3}
### PETSTORE_API_HOST:
{: .charts.h3}
`petstore_api_host` - Petstore API hostname. Service for tests.
{: .charts.level_h3}
### PREDEFINED_USERS:
{: .charts.h3}
A set of users, which are used as default credentials for internal communications
with platform-storage-slugs service. The value is a string with the JSON-encoded
object, which contains key-value pairs which represent username-passwords accordingly.
{: .charts.level_h3}
#### PSS:
{: .charts.h4}

### PUSH_GATEWAY_URI:
{: .charts.h3}
### QUOTA_SERVICE_MONGO_URI:
{: .charts.h3}
If quota service enabled you need provide mongodb uri.
{: .charts.level_h3}

### RABBITMQ_STATS_LOGIN:
{: .charts.h3}
`rabbitmq_stats_login` - Username for accessing HTTP API of RabbitMQ Management Plugin. The username must have granted admin privileges in RabbitMQ since it used by services for modifying data in RabbitMQ (asserting/removing users, exchanges and queues).
{: .charts.level_h3}
### RABBITMQ_STATS_PASS:
{: .charts.h3}
`rabbitmq_stats_pass` - Corresponding password for `rabbitmq_stats_login`. See above.
{: .charts.level_h3}
### RABBITMQ_STATS_URI:
{: .charts.h3}
`rabbitmq_stats_uri` - URI of HTTP API of RabbitMQ Management Plugin. See `rabbitmq_stats_login` for more details.
{: .charts.level_h3}

### RABBITMQ_URI_SAILOR:
{: .charts.h3}
URI used to connect sailors (aka "flow steps") to RabbitMQ. MUST include the same
vhost as in "RABBITMQ_VIRTUAL_HOST" secret.
{: .charts.level_h3}
### RABBITMQ_VIRTUAL_HOST:
{: .charts.h3}
RabbitMQ virtual host where users, policies and default queues will be created.
{: .charts.level_h3}
### RABBITMQ_MAX_MESSAGES_PER_QUEUE:
{: .charts.h3}
`75000` - The count of messages, allowed to be in each queue at the same time. In case, there are more messages then set via this variable, new messages will be rejected.
{: .charts.level_h3}
### RABBITMQ_MAX_MESSAGES_MBYTES_PER_QUEUE:
{: .charts.h3}
`200` - The total size of messages (in MB), allowed to be in each queue at the same time. In case, there are huge messages in queue (by size) then set via this variable, new messages will be rejected.
{: .charts.level_h3}
### RABBITMQ_EXTEND_POLICIES:
{: .charts.h3}
Object with extend policies.
{: .charts.level_h3}

### SENSITIVE_ACTION_AUTH_LIFETIME:
{: .charts.h3}
Value in milliseconds - an environment variable to configure platform user
re-authentication for the sensitive actions. The default value is `21600000` (6 hours).
{: .charts.level_h3}

### SERVER_PORT_RANGE:
{: .charts.h3}
Optional value. `1025:32767` - The port range for `bloody-gate` (VPN agents service).
{: .charts.level_h3}
### SERVER_PRIVATE_NETWORK:
{: .charts.h3}
Optional value. `172.19.0.0/16` - The VPN network for `bloody-gate`.
{: .charts.level_h3}

### SERVICE_ACCOUNT_USERNAME:
{: .charts.h3}
`serviceaccount` - Username for service account (used for communications between API and other platform apps).
{: .charts.level_h3}
### SERVICE_ACCOUNT_PASSWORD:
{: .charts.h3}
`service_account_password` - Password for service account (used for communications between API and other platform apps).
{: .charts.level_h3}

### SESSION_IDLE_TIMEOUT:
{: .charts.h3}
In seconds, default value `86400` (24 hours) - replaces `COOKIE_MAX_AGE`. Frontend's session IDLE timeout as [described here](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#idle-timeout).
{: .charts.level_h3}
### SESSION_ABSOLUTE_TIMEOUT:
{: .charts.h3}
Default value is `2 x SESSION_IDLE_TIMEOUT`.
{: .charts.level_h3}

### SESSION_MONGO_URI:
{: .charts.h3}
`session_mongo_uri` - URI connection string for the additional DB used only as session storage by the frontend (platform UI).
{: .charts.level_h3}

### SMTP_URI:
{: .charts.h3}
Optional value. URI of SMTP server for sending emails (leave blank if using Mandrill).
{: .charts.level_h3}
### STATUS_PAGE_ID:
{: .charts.h3}
`id_from_status_pages` - Special ID to enable integration with statuspages.
{: .charts.level_h3}

### STEWARD_ATTACHMENTS_LIFETIME_DAYS:
{: .charts.h3}

### SUSPENDED_TASK_MAX_MESSAGES_COUNT:
{: .charts.h3}
`50` - Limit for unconsumed flow step messages after which to suspend the flow.
{: .charts.level_h3}
### SUSPEND_WATCH_KUBERNETES_MAX_EVENTS:
{: .charts.h3}
`5` - Limit of flow step start fail events after which to suspend the flow.
{: .charts.level_h3}

### TASK_STAT_START_INDEX_TTL:
{: .charts.h3}
`432000 seconds` (5 days) - A mandatory environment variable which controls the
retention period of to Dashboard Runlog data in the MongoDB by enforcing
`expireAfterSeconds` option in the Database index. The platform will store the
Dashboard Runlog records for 5 days in the Database. Modify the value according
to your needs.
{: .charts.level_h3 .note.info}
### TEAM_NAME:
{: .charts.h3}
`team_name` - The developer team name where out-of-the-box system crytical components are deployed. The team will be created in the contract set with **COMPANY_NAME** parameter. Every run of **gendry** service will use this parameter.
{: .charts.level_h3}
### TENANT_CODE:
{: .charts.h3}
`tenant_code` - Code of the default tenant, which will be created by the **gendry** on deployment at initialization.
{: .charts.level_h3}
### TENANT_DOMAIN:
{: .charts.h3}
`tenant_domain` - The domain of the default tenant, which will be created by the gendry on deploy initialization.
{: .charts.level_h3}
### TENANT_API_DOMAIN:
{: .charts.h3}
`tenant_api_domain` - The default tenant API domain, e.g. `api.elastic.io`
{: .charts.level_h3}
### TENANT_WEBHOOKS_DOMAIN:
{: .charts.h3}
`tenant_webhooks_domain` - The default tenant webhooks domain, e.g. `in.elastic.io`
{: .charts.level_h3}
### TENANT_NAME:
{: .charts.h3}
`tenant_name` - Name of the default tenant, which will be created by gendry on deploy initialization.
{: .charts.level_h3}
### TENANT_OPERATOR_SERVICE_ACCOUNT_USERNAME:
{: .charts.h3}
`tenant-operator` - service account username for tenant-operator, leave as is
{: .charts.level_h3}
### TENANT_OPERATOR_SERVICE_ACCOUNT_PASSWORD:
{: .charts.h3}
`tenant-operator-pass` - service account password for tenant-operator, any random string
{: .charts.level_h3}
### TENANT_ADMIN_EMAIL:
{: .charts.h3}
`tenant_admin_email` - Email of the first user of the platform, who is going to be a Tenant Admin. This will be created by gendry on deployment initialization.
{: .charts.level_h3}
### TENANT_ADMIN_PASSWORD:
{: .charts.h3}
`tenant_admin_password` - Corresponding password for `tenant_admin_email`.
{: .charts.level_h3}

### USER_AMQP_CRYPTO_PASSWORD:
{: .charts.h3}
`user_amqp_crypto_password` - A secret key, used for encryption of `amqpPassword` (which is used for dedicated per-workspace rabbitMQ users) in DB.
{: .charts.level_h3}
### USER_API_CRYPTO_PASSWORD:
{: .charts.h3}
`user_api_crypto_password` - A secret key, used for encryption of `apiSecret` in DB.
{: .charts.level_h3}
### USER_TOTP_CRYPTO_PASSWORD:
{: .charts.h3}
Password used to encrypt/decrypt TOTP secrets for 2FA. Has to be set before enabling 2FA feature as tenant feature flag.
{: .charts.level_h3}
### WEBHOOKS_BASE_URI:
{: .charts.h3}
Should be in the format: `https://%WEBHOOKS_DOMAIN%/hook`.
{: .charts.level_h3}
### WIPER_SERVICE_ACCOUNT_USERNAME:
{: .charts.h3}
`wiper` - eio API service account for the wiper service, leave as is.
{: .charts.level_h3}
### WIPER_SERVICE_ACCOUNT_PASSWORD:
{: .charts.h3}
`wiper_pass` - eio API service account for the wiper, any random string.
{: .charts.level_h3}
### WIPER_CLEAR_DELETED_FLOWS_AGE_SECONDS:
{: .charts.h3}
Time in seconds the job must wait before deleting the flow permanently after it is marked as DELETED in MongoDB. We set the default value to `86400` seconds (1 day).
{: .charts.level_h3}
### WIPER_CLEAR_DELETED_FLOWS_LIMIT:
{: .charts.h3}
`100` - the number of flows to remove during each run of the service.
{: .charts.level_h3}