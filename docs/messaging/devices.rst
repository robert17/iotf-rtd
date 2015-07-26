===============================================================================
MQTT Connectivity for Devices
===============================================================================

A Device must authenticate using a client ID in the following format:

	d:**org\_id**:**device_type**:**device\_id**

- A Device must be registered before it can connect
- When connecting to the Quickstart service no authentication (or registration) is required, and org_id should be set to "quickstart"


----


MQTT client identifier
-------------------------------------------------------------------------------

-  Supply a client id of the form
   **d**:**org\_id**:**device\_type**:**device\_id**
-  **d** idenfities your client as a device
-  **org\_id** is your unique organization ID, assigned when you sign up
   with the service.  It will be a 6 character alphanumeric string.
-  **device\_type** is intended to be used as an identifier of the type
   of device connecting, it may be useful to think of this as analogous
   to a model number. 
-  **device\_id** must uniquely identify a device across all devices of
   a specific device\_type, it may be useful to think of this as
   analogous to a serial number.


----


MQTT authentication
-------------------------------------------------------------------------------

Username
~~~~~~~~

The service currently only supports token-based authentication for
devices, as such there is only one valid username for devices today.

A value of **use-token-auth** indicates to the service that the
authentication token for the device will be passed as the password for
the MQTT connection.

Password
~~~~~~~~

When using token based authentication submit the device authentication
token as the password when making your MQTT connection.


----


Publishing events
-------------------------------------------------------------------------------

-  Publish to topic iot-2/evt/\ **event\_id**/fmt/**format\_string**

The message payload is limited to a maximum of 4096 bytes.

----


Subscribing to commands
-------------------------------------------------------------------------------

-  Subscribe to topic iot-2/cmd/\ **command\_id**/fmt/**format\_string**


----


Quickstart Restrictions
~~~~~~~~~~~~~~~~~~~~~~~
The Quickstart service does not currently support MQTT Quality of Service (QoS) levels greater than 0. This is the fastest and offers no confirmation of receipt.  If you are writing device code for use with Quickstart you must also take into account the following features present in the registered service that are not supported in Quickstart: 

-  Subscribing to commands
-  MQTT connection over SSL
-  Clean or durable sessions

Please note, the Quickstart service may drop messages that are sent more frequently than 1 per second.
