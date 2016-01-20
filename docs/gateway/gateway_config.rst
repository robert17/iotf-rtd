ClientId Configuration for Gateways
=====================================

Gateway Connection Setup using MQTT
------------------------------------

Connecting a gateway is largely the same as connecting a regular device, however, the *clientId* replaces ``d`` with ``g``. For more information on connecting gateway devices, 

When connecting a gateway device to the IoT Foundation using HTTP, the clientId must take the following format:

``g:<orgId>:<typeId>:<deviceId>``

----------

Gateway Connection Setup using HTTP
------------------------------------

When connecting a gateway to the IoT Foundation using HTTP, the clientId must take the following format:

``g/<orgId>/<typeId>/<deviceId>``

An authorization header must be supplied if connecting to a registered organization. The header must contain a username and password. Basic authentication is the only method supported.

Username
~~~~~~~~~

When connecting a gateway device, the username supplied must take the following format:

``g-<orgId>-<gwDeviceTypeId>-<gwId>``

Password
~~~~~~~~~

The password must be the authentication token generated when adding the gateway to your IoT Foundation organization.
