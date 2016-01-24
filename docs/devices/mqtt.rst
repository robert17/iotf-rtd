===============================================================================
MQTT Connectivity for Devices
===============================================================================



.. note:: **Device Support in Quickstart**
    
    When connecting to the Quickstart service no authentication (or registration) is required, and ``orgId`` must be set to ``quickstart``
    
    The Quickstart service does not currently support MQTT Quality of Service (QoS) levels greater than 0. This is the fastest and offers no confirmation of receipt.  If you are writing device code for use with Quickstart you must also take into account the following features present in the registered service that are not supported in Quickstart: 

    -  Subscribing to commands
    -  MQTT connection over SSL
    -  Clean or durable sessions
    
    Also, messages sent from devices at a rate greater than 1 per second may be discarded.


----


MQTT client identifier
-------------------------------------------------------------------------------

A Device must authenticate using a client ID in the following format:

    d:**org\_id**:**device_type**:**device\_id**

-  **d** idenfities your client as a device
-  **org\_id** is your unique organization ID, assigned when you sign up
   with the service.  It will be a 6 character alphanumeric string.
-  **type\_id** is intended to be used as an identifier of the type
   of device connecting, it may be useful to think of this as analogous
   to a model number. 
-  **device\_id** must uniquely identify a device across all devices of
   a specific device\_type, it may be useful to think of this as
   analogous to a serial number.

.. note:: You can use any scheme of your choice when assigning values for 
    ``type_id`` and ``device_id``, however the following restrictions apply to both:

    - Maximum length of 36 characters 
    - Must comprise only alpha-numeric characters (``a-z``, ``A-Z``, ``0-9``) and the following special characters:

      - dash (``-``)
      - underscore (``_``)
      - dot (``.``)


----


MQTT authentication
-------------------------------------------------------------------------------

Username
~~~~~~~~

The service currently only supports token-based authentication for
devices, as such there is only one valid username for devices today.

A value of ``use-token-auth`` indicates to the service that the
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

.. important:: The message payload is limited to a maximum of 4096 bytes.  Messages larger than this will be rejected.

----


Subscribing to commands
-------------------------------------------------------------------------------

-  Subscribe to topic iot-2/cmd/\ **command\_id**/fmt/**format\_string**


----

Managed Devices
-------------------------------------------------------------------------------

Support for device lifecycle management is optional, the device management protocol 
used by IoTF utilises the same MQTT connection that your device already uses for events 
and command control.

Quality of Service Levels and Clean Session
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Managed devices can publish messages with Quality of Service (QoS) level of 0 or 1. If 
QoS 1 is used, messages from the device will be queued if necessary. Messages from 
the device must not be retained messages. 

The Internet of Things Foundation publishes requests with a QoS level of 1 to support 
queuing of messages.  In order to queue messages sent while a managed device is not 
connected, the device should use ``cleansession=false``.

.. warning::
  If your managed device uses a durable subscription (cleansession=false) you need to be 
  aware that device management commands sent to your device while it is offline will be 
  reported as failed operations, however, when the device later connects those requests will 
  be actioned by the device.
  
  When handling failures it is important to take this into account if you are using durable
  subscriptions for your managed devices.


Topics
~~~~~~

A managed device is required to subscribe to two topics to handle requests and responses from IoTF:

- The managed device will subscribe to device management reponses on ``iotdm-1/response/+``
- The managed device will subscribe to device management requests on ``iotdm-1/+``


A managed device will publish to two topics:

- The managed device will publish device management responses on ``iotdevice-1/response/``
- The managed device will publish device management requests on ``iotdevice-1/``


Message Format
~~~~~~~~~~~~~~

All messages are sent in JSON format. There are two types of message.

1. Request
    Requests are formatted as follows:
    
    .. code:: json
        
        {  "d": {...}, "reqId": "b53eb43e-401c-453c-b8f5-94b73290c056" }

    - ``d`` carries any data relevant to the request
    - ``reqId`` is an identifier of the request, and must be copied into a response. 
      If a response is not required, the field should be omitted.
    
2. Response
    Responses are formatted as follows:
    
    .. code::

        {
            "rc": 0,
            "message": "success",
            "d": {...},
            "reqId": "b53eb43e-401c-453c-b8f5-94b73290c056"
        }
    
    - "rc" is a result code of the original request.
    - ``message`` is an optional element with a text description of the response code.
    - ``d`` is an optional data element accompanying the response.
    - ``reqId`` is the request ID of the original request. This is used to correlate responses with 
      requests, and the device needs to ensure that all request IDs are unique.  When responding to Internet of Things 
      Foundation requests, the correct ``reqId`` value must be sent in the response.


