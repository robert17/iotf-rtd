Message Payload
===============

The Foundation supports sending and recieving messages in any format,
however we recommend the use of JSON and the IoTF event format
specification.

IoTF Maximum Payload Size
-------------------------

The maximum payload size is 4 kilobytes (kB).  If messages with payloads larger
than this limit are sent, the client will be disconnected and the following log
message will appear in the Diagnostic Logs if the client is a device:

Closed connection from x.x.x.x. The message size is too large for this endpoint.


----


IoTF JSON Payload Specification
-------------------------------

It is simple to create a JSON message that meets the IoTF specification.

* The message must be a valid JSON object (not an array) with only two top level
  elements: **d** and **ts**
* The message must be UTF-8 encoded

Data
~~~~
The **d** element is where you include all data for the event (or
command) being transmitted in the message. 

* This element is required for your message to meet the IoTF message specification.
* This must always be a JSON object (not an array)
* In the case where you wish to send no data the **d** element should 
  still be present, but contain an empty object.

Example 1 - Simple Data
^^^^^^^^^^^^^^^^^^^^^^^

.. code:: json

    {
      "d": {"msg": "Hello World"}
    }

Example 2 - Complex data
^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: json

    {
      "d": {
        "host": "IBM700-R9E683D", 
        "mem": 54.9, 
        "network": {
          "up": 1.22, 
          "down": 0.55
        },
        "cpu": 1.3, 
      }
    }

Example 3 - No data
^^^^^^^^^^^^^^^^^^^

.. code:: json

    {
      "d": {}
    }

Timestamp
~~~~~~~~~

The **ts** element allows you to associate a timestamp with the event
(or command). This is an optional element, if included its value should
be a valid ISO8601 encoded timestamp string.

.. code:: json

    {
      "d": {
        "host": "IBM700-R9E683D", 
        "mem": 54.9, 
        "network": {
          "up": 1.22, 
          "down": 0.55
        },
        "cpu": 1.3, 
      },
      "ts": "2014-12-30T14:47:36+00:00"
    }

Custom JSON payloads
-------------------------------------------------------------------------------
The IoT Foundation is designed to be open, you may send your event and command data in any 
format you choose, however if you choose to send data in a custom format it will limit some 
features of the service which can only function with a known payload format.

Below are a number of example payloads that are close to the IoTF specification, but 
do not quite match it.  Each would be treated as a custom JSON payload.

**Example 1**

Root node is a JSON array

.. code:: json

  [
    {
      "d": {
        "myName": "Stuart's Pi",
        "cputemp": 46,
        "sine": -10,
        "cpuload": 1.45
      }
    },
    {
      "d": {
        "myName": "Stuart's Pi",
        "cputemp": 46,
        "sine": -10,
        "cpuload": 1.45
      }
    }
  ]


**Example 2**

"d" node is a JSON array

.. code:: json

  {
    "d": ["green", "yellow"]
  }


**Example 3**

Unexpected node at root level

.. code:: json

  {
    "d": {},
    "temp": 60,
    "ts": "2014-12-30T14:47:36+00:00"
  }
