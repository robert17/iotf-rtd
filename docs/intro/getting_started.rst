==========================================================================
Getting started with the Internet of Things Foundation Quickstart Service
==========================================================================

The Internet of Things Foundation Quickstart service 

Connecting to Quickstart
--------------------------------------------------------------------------------

These instructions are intended to allow users to connect devices to the Internet of Things Foundation Quickstart service. However, there are several restrictions as a part of the Quickstart service which are not present in the registered service.

If you are writing device code for use with Quickstart you must take into account the following features present in the
registered service that are not supported in Quickstart: 

-  Subscribing to commands
-  MQTT connection over SSL
-  Clean or durable sessions

To connect to the Quickstart service, users must speak MQTT. MQTT 3.1 is the minimum level required, however, version 3.1.1 provides better functionality. See below for more details on the additional functionality of MQTT 3.1.1.

Connecting to Quickstart:

1. Connect to quickstart.messaging.internetofthings.ibmcloud.com at port 1883.
2. Supply a client-id of the form d:quickstart:<type-id>:<device-id>, where:
- type-id is an identifier you provide, for example, "acme-thing". If you have a number of similar devices; perhaps all running the same code, you should use the same type-id for all of them.
- device-id is a 12 hexadecimal character MAC address in lower case, without delimiting characters. For example, a36d7c91bf9e.
3. Publish to topic iot-2/evt/status/fmt/json.
4. The message payload should be encoded in JSON, and contain some defined elements. The payload must not exceed the Quickstart limit of 4096 bytes.
5. It must contain a single top-level property called "d". This property may contain an arbitrary number of child properties, these having either integer or string datatypes. For example:

.. code:: 

    {
        "d": {
            "myName": "Stuart's Pi",
            "cputemp": 46,
            "sine": -10,
            "cpuload": 1.45
       }
    }

6. Publish messages using MQTT QoS 0.

You may also like to know...
--------------------------------------------------------------------------------

- The retained flag is not currently honored.
- Devices subscribing to commands is not possible in the Quickstart service.
    - Devices connected to registered organizations can subscribe to, and receive commands from applications, see the "command recipe" for more details.
- You can write an application to subscribe to events from devices even using the Quickstart service, see the "application recipe" for more details.

Why is MQTT 3.1.1 better?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The primary mechanism that devices use to communicate with the IBM Internet of Things Foundation service is MQTT; this is a protocol designed for the efficient exchange of real-time data with sensor and mobile devices.

MQTT runs over TCP/IP and, while it is possible to code directly to TCP/IP, you might prefer to use a library that handles the details of the MQTT protocol for you. You will find there’s a wide range of MQTT client libraries available at http://mqtt.org/wiki/doku.php/libraries, with the best place to start looking being the Eclipse Paho project - http://eclipse.org/paho/. IBM contributes to the development and support of many of these libraries.

- MQTT version 3.1 is the version of the protocol that is in widest use today. Version 3.1.1 contains a number of minor enhancements, and is currently a Candidate OASIS Standard (ratification by the OASIS standards development organization is expected later this year). The IBM Internet of Things Foundation service offers informal support for version 3.1.1 now, with formal support to follow ratification.
- An advantage of version 3.1.1 is that the maximum length of the MQTT Client Identifier (ClientId) is increased from the 23 character limit imposed by 3.1. The IoT service will often require longer ClientId’s and will accept long ClientId’s with either version of the protocol however some 3.1 client libraries check the ClientId and enforce the 23 character limit.


What is ClientId?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The MQTT Client Identifier (ClientId) is made up of four colon delimited sub-fields:
- "d" indicates the client is a device (as opposed to an application)
- "organization id" is a field is a unique identifying value for your organization. If you want to use the Quickstart service without registering the device, provide the value "quickstart"
- "type-id" is a name which you can compose to indicate the type of device connected. In the registered service this identifier is free for you to use as you like. In the Quickstart service, the data visualizer makes use of some known type-ids, however, if you use anything else the data visualizer will use best efforts based on the data received. The example code provided has type-ids starting with "iotsample-"
- "device-id" is a field that is used to identify the particular device instance. Each device connected to a given organization must have a distinct device-id. If you use the Quickstart service, you must ensure that the unique device-id is the MAC address of the device with colons removed, and character in lower case format only. This is to ensure confidence in the uniqueness of the device-id.

Id values can be up to 32 characters can be up to 32 characters, and contain the characters 'A-Z', 'a-z', '-', '_', and '.'.

The third component of the topic name - “status” - is the event-type-id. Devices can send events with different payloads identified by event-type-id, however, for the Quickstart visualization application an event-type-id of “status” should be set.

The final component shows the payload format. The Quickstart service requires the format to be 'json'.

MQTT Quality of Service Limitations in Quickstart
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Quickstart service does not currently support MQTT Quality of Service (QoS) levels greater than 0. This is the fastest and offers no confirmation of receipt. 

Please note, the Quickstart service might drop messages that are sent more frequently than 1 per second.
