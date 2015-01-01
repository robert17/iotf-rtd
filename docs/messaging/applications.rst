===============================================================================
MQTT Connectivity for Applications
===============================================================================

An Application must authenticate using a client ID in the following format

	a:**org\_id**:**app_id**

- We do not impose any rules on the **app\_id** component of the client ID
- When connecting to the QuickStart service no authentication is required
- An Application does not need to be registered before it can connect


----


MQTT client identifier
-------------------------------------------------------------------------------

-  Supply a client id of the form
   **a**:**org\_id**:**app\_id**
-  **a** indicates the client is an application
-  **org\_id** is your unique organization ID, assigned when you sign up
   with the service.  It will be a 6 character alphanumeric string.
-  **app\_id** is a user-defined unique string identifier for this client.

.. note:: Only one MQTT client can connect using any given client ID.  As soon 
    as a secnd client in your organization connects using an **app\_id** that you 
    have already connected the first client will be disconnected.


----


MQTT authentication
-------------------------------------------------------------------------------

Applications require an API Key to connect into an Organization.  When an API Key 
is registered a token will be generated that must be used with that API key.  

The API key will look something like this: a:**org\_id**:a84ps90Ajs

The token will look something like this: MP$08VKz!8rXwnR-Q*

When making an MQTT connection using an API key the following applies:

- MQTT client ID: a:**org\id**:**app\_id**
- MQTT username must be the API key: a:$org:a84ps90Ajs
- MQTT password must be the authentication token: MP$08VKz!8rXwnR-Q*


----


Publishing device events
-------------------------------------------------------------------------------
An application may publish events as if they came from any registered device.

-  Publish to topic iot-2/type/**device\_type**/id/**device\_id**/evt/**event\_id**/fmt/**format\_string**

.. tip:: You may have a number of devices that are already generating bespoke data
    that you wish to send to IOTF.  One way to get that data into the service would
    be to write an application that processes the data and publishes it to IOTF.

----


Publishing device commands
-------------------------------------------------------------------------------
An application may publish command to any registered device.

-  Publish to topic iot-2/type/**device\_type**/id/**device\_id**/cmd/**command\_id**/fmt/**format\_string**

----


Subscribing to device events
-------------------------------------------------------------------------------
An application may subscribe to events from one or more devices.

-  Subscribe to topic iot-2/type/**device\_type**/id/**device\_id**/evt/**event\_id**/fmt/**format\_string**

.. note:: The MQTT "any" wildcard character (+) may be used for any of the following 
    components if you want to subscribe to more than one type of event, or events 
    from more than a single device.

    - device\_type
    - device\_id
    - event\_id
    - format\_string


----


Subscribing to device commands
-------------------------------------------------------------------------------
An application may subscribe to commands being sent to one or more devices.

-  Subscribe to topic iot-2/type/**device\_type**/id/**device\_id**/cmd/**command\_id**/fmt/**format\_string**

.. note:: The MQTT "any" wildcard character (+) may be used for any of the following 
    components if you want to subscribe to more than one type of event, or events 
    from more than a single device.

    - device\_type
    - device\_id
    - cmd\_id
    - format\_string


----

	
Subscribing to device status messages
-------------------------------------------------------------------------------
An application may subscribe to monitor status of one or more devices.

-  Subscribe to topic iot-2/type/**device\_type**/id/**device\_id**/mon

.. note:: The MQTT "any" wildcard character (+) may be used for any of the following 
    components if you want to subscribe to updates more than one device.

    - device\_type
    - device\_id


----


Subscribing to application status messages
-------------------------------------------------------------------------------
An application may subscribe to monitor status of one or more applications.

-  Subscribe to topic iot-2/app/**app\_id**/mon

.. note:: The MQTT "any" wildcard character (+) may be used for **app\_id** if you 
    want to subscribe for updates for all applications


----


QuickStart restrictions
-------------------------------------------------------------------------------

If you are writing application code that wants to support use with QuickStart
you must take into account the following features present in the
registered service that are not supported in QuickStart: 

- Publishing commands
- Subscribing to commands
- Use of the MQTT "any" wildcard character (+) for the following topic components

  - device\_type
  - app\_id
- MQTT connection over SSL
