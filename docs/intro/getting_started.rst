==========================================================================
Getting started with the Internet of Things Foundation Quickstart Service
==========================================================================

The Internet of Things Foundation Quickstart service is a tool demonstrating how quickly and easily you can get devices connected with the Internet of Things Foundation. The Quickstart service can be used with a device or, if you don't have a device to hand, you can simulate a device using the IoT Sensor which you can find `here <https://quickstart.internetofthings.ibmcloud.com/iotsensor/>`__.

To connect to the Quickstart service, users must speak MQTT. MQTT 3.1 is the minimum level required, however, version 3.1.1 provides better functionality. For more information on the additional functionality of MQTT 3.1.1 see `here <../messaging/mqtt.html#/>`__.

There are several programming guides which you can use to connect to Quickstart in a language of your preference, you can find documentation for them `here <../libraries/programmingguides.html#/>`__.

Connecting to Quickstart
--------------------------

1. Connect to quickstart.messaging.internetofthings.ibmcloud.com at port 1883.
2. Supply a client-id of the form d:quickstart:<type-id>:<device-id>, where:
    - type-id is an identifier you provide, for example, "acme-thing". If you have a number of similar devices; perhaps all running the same code, you should use the same type-id for all of them.
    - device-id is a 12 hexadecimal unique identifier. For example, a36d7c91bf9e.
    - when connecting to the Quickstart service, no authentication is required, and org_id should be set to "quickstart".
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

Limitations of the Quickstart service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are writing device code for use with Quickstart you must take into account the following features present in the
registered service that are not supported in Quickstart: 

-  Subscribing to commands, however devices connecting to registered organizations can subscribe to and receive commands from applications
-  MQTT connection over SSL
-  Durable sessions
    - The Quickstart service does not currently support MQTT Quality of Service (QoS) levels greater than 0. This is the fastest QoS level and offers no confirmation of receipt.

Also, in Quickstart:

- The retained flag is not currently honored.
- You can write an application to subscribe to events from devices even using the Quickstart service, see the "application recipe" for more details.

Please note, the Quickstart service might drop messages that are sent more frequently than 1 per second.
