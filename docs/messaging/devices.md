#MQTT client identifier
* Supply a client id of the form **d**:**org_id**:**device_type**:**device_id**
 * **d** indicates the client is a device (as opposed to an application)
 * **org_id** is your unique organization ID, assigned when you sign up with the service.  
 It will be a 6 character alphanumeric string.
 * **device_type** is intended to be used as an identifer of the type of device connecting, it may be useful to think of this 
 as analogous to a model number.  This can be up to 32 characters in length and can contain the 
 characters A-Z a-z 0-9 - _ and .
 * **device_id** must uniquely identify a device acorss all devices of a specific device_type, it may be useful to think of this 
 as analogous to a serial number.  This can be up to 32 characters in length and can contain the 
 characters A-Z a-z 0-9 - _ and .


# MQTT authentication

##Username
As the Foundation currently only supports token based authentication for devices, there is only one valid username 
for devices today.

A value of **use-token-auth** indicates to the service that the authentication token for the device will be passed 
as the password for the MQTT connection.

##Password
When using token based authentication submit the device authentication token as the password when making your MQTT connection


# Publishing Events
 * Publish to topic iot-2/evt/**event_id**/fmt/**format_string**


# Subscribing to Commands
 * Subscribe to topic iot-2/cmd/**command_id**/fmt/**format_string**


# QuickStart Restrictions
If you are writing device code that wants to support use with QuickStart you must take into account the following 
features present in the registered service that are not supported in QuickStart:
   * Subscribing to commands
   * Secure MQTT connection
