===============================================================================
Device Management Operations - Update
===============================================================================

.. _update-location:

Update Location
---------------

Devices that can determine their location can choose to notify the Internet of Things Foundation device management server about location changes.

Topic
~~~~~~

.. code::

	iotdevice-1/device/update/location
	
Message Format
~~~~~~~~~~~~~~~

The "measuredDateTime" is the date of location measurement. The "updatedDateTime" is the date of the update to the device information. For efficiency reasons, IoTF may batch updates to location information so the updates may be slightly delayed. The "latitude" and "longitude" should be specified in decimal degrees using WGS84. 

Whenever location is updated, the values provided for latitude, longitude, elevation and uncertainty are considered as a single multi-value update. The latitude and longitude are mandatory and must both be provided with each update.  Elevation and uncertainty are optional and can be omitted. 

If an optional value is provided on an update and then omitted on a later update, the earlier value is deleted by the later update. Each update is considered as a complete multi-value set.

Location can be updated in several ways:

- The device retrieves its location from a GPS receiver and sends a device management message to the Internet of Things Foundation to update its location. The timestamp captures the time at which the location was retrieved from the GPS receiver. This means that the timestamp is valid, even if the transmission of the location message was delayed. In the event that the timestamp is omitted from the device management message sent, the current date and time on message receipt will be used when the device's location metadata is updated.

- The Internet of Things Foundation REST API is used to set the location metadata of a static device. This can be done at the time that the device is registered, or later if required. It is optional whether to include a timestamp. If omitted, the current date and time will be set as the device’s location metadata.

Request Format:

.. code::

	{
		"d": {
			"longitude": number,
			"latitude": number,
	
			"elevation": number,
			"measuredDateTime": "string in ISO8601 format",
			"updatedDateTime": "string in ISO8601 format",
			"accuracy": "The accuracy of the position"
		},
		"reqId": "string"
	}

Response Format:

.. code:: 

	{
		"rc": 200,
		"reqId": "string"
	}
	
Possible Response Codes:
~~~~~~~~~~~~~~~~~~~~~~~~

- 200: The operation was successful.
- 400: The input message does not match the expected format, or one of the values is out of the valid range.
- 404: The topic name is incorrect, or the device is not in the database.
- 409: A conflict occurred during the device database update. To resolve this, simplify the operation is necessary.

.. _update-attributes:

Update Device Attributes
------------------------

The Internet of Things Foundation can send this request to a device to update values of one or more device attributes. Attributes that can be updated by this operation are location, metadata, device information and firmware.

The "value" is the new value of the device attribute. It is a complex field matching the device model. Only writeable fields should be updated as a result of this operation. Values can be updated in:

- location (see Update location section for details)
- metadata (Optional)
- deviceInfo (Optional)
- mgmt.firmware	(see Firmware update process for details)

If the update is successful, the "rc" should be set to 204. The "message" field can be specified if "rc" is not 204. If any field value could not be retrieved, "rc" should be set to 404 (if not found) or 500 (any other reason). The "fields" array should contain the name of each field that could not be updated.

Topic
~~~~~~

.. code:: 

	iotdm-1/device/update

	
Message format
~~~~~~~~~~~~~~~

Request Format:

.. code:: 

	{
		"d": {
			"field": "field_name"
			"value": "field_value"
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
				"string"
			]
		},
		"reqId": "string"
	}
