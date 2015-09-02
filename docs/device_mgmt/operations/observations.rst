===============================================================================
Device Management Operations - Observations
===============================================================================

.. important:: Devices must implement observe, notify & cancel operations in order to support :ref:`firmware-actions-update`.

.. _observations-observe:

Observe Attribute Changes
-------------------------

The Internet of Things Foundation can send this request to a device to observe changes of one or more device attributes. When the device receives this request, it must send a notification request ("notify" message) to the Internet of Things Foundation whenever the observed attributes value changes.

Topic
~~~~~~

.. code:: 

	iotdm-1/observe

Message format
~~~~~~~~~~~~~~~

The "fields" field is an array of the device attribute names from the device model. For example, values could be "location", "mgmt.firmware" or "mgmt.firmware.state". If a complex field, such as "mgmt.firmware" is specified, it is expected that its underlying fields are updated at the same time, such that only a single notify message is generated.

The "message" field used in the response can be specified if "rc" is not 200. If any field value which was to be observed could not be retrieved, "rc" should be set to 404 (if not found) or 500 (any other reason). When values for fields to be observed cannot be found, "fields" should contain an array of elements with "field" set to the name of each field that could not be read, "value" fields should be omitted. For the response code to be set to 200, both "field" and "value" must be specified, "value" is the current value of an attribute identified by "field" content.

Request Format:

.. code::

	{
		"d": {
			"fields": [
				"string"
			]
		},
		"reqId": "string"
	}

Response Format:

.. code::

	{
		"rc": number,
		"message": "string",
		"d": {
			"fields": [
				{ 
					"field": "field_name",
					"value": "field_value"
				}
			]
		},
		"reqId": "string"  
	}


.. _observations-cancel:

Cancel Attribute Observation
----------------------------

The Internet of Things Foundation can send this request to a device to cancel the current observation of one or more device attributes. The "fields" is an array of the device attribute names from the device model, for example, values could be "location", "mgmt.firmware" or "mgmt.firmware.state".

The "message" field must be specified if "rc" is not 200.

Topic
~~~~~~

.. code::

	iotdm-1/cancel


Message format
~~~~~~~~~~~~~~~~

Request Format:

.. code::

	{
		"d": {
			"fields": [
				"string"
			]
		},
		"reqId": "string"
	}

Response Format:

.. code:: 

	{
		"rc": number,
		"message": "string",
		"reqId": "string"  
	}


.. _observations-notify:

Notify Attribute Changes
------------------------

The Internet of Things Foundation can make an observation request referring to a specific attribute or set of values. When the value of the attribute or attributes changes, the device must send a notification containing the latest value.

The "field_name" value is the name of the attribute that has changed, the "field_value" is the current value of the attribute. The attribute can be a complex field, if multiple values in a complex field are updated as a result of a single operation, only a single notification message should be sent.

If notify request is processed successfully, "rc" should be set to 200. If the request is not correct, "rc" should be set to 400. If the field specified in the notify request is not being observed, "rc" should be set to 404.


Topic
~~~~~~

.. code::

	iotdevice-1/notify
	
Message format
~~~~~~~~~~~~~~~

Request Format:

.. code::

	{
		"d": {
			"field": "field_name",
			"value": "field_value"
		}
		"reqId": "string"
	}
	
Response Format:

.. code::

	{
		"rc": number,
		"reqId": "string"
	}

Possible Response Codes:
~~~~~~~~~~~~~~~~~~~~~~~~

- 200: The operation was successful.
- 400: The input message does not match the expected format, or one of the values is out of the valid range.
- 404: THe topic name is incorrect, the device is not in the database, or there is no observation for the field reported.
- 409: A conflict occurred during the device database update. To resolve this, simplify the operation is necessary.
- 500: An internal error occurred, contact IBM Support.
