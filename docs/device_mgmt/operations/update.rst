===============================================================================
Device Management Operations - Update
===============================================================================

.. _update-location:

Update Location
------------------

Devices can change their location over time. The update of the location can happen in two ways:

- The device itself notifies the Internet of Things Foundation about the location update: The device retrieves its location from a GPS receiver and sends a device management message to the Internet of Things Foundation to update its location. The timestamp captures the time at which the location was retrieved from the GPS receiver. This means that the timestamp is valid, even if the transmission of the location message was delayed. In the event that the timestamp is omitted from the device management message sent, the current date and time on message receipt will be used when the device's location metadata is updated.

- A user / app updates the location of a device using the Rest API: The Internet of Things Foundation REST API is used to set the location metadata of a static device. This can be done at the time that the device is registered, or later if required. It is optional whether to include a timestamp. If omitted, the current date and time will be set as the device’s location metadata.

Location update triggered by device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Devices that can determine their location can choose to notify the Internet of Things Foundation device management server about location changes.

Topic
~~~~~~

.. code::

	iotdevice-1/device/update/location


Location update triggered by user or app
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A user can update the location of a device using the Internet of Things Foundation web interface. An app updates the location of a device using the Rest API (Version 2). In case the device, for which the location update is triggered, is currently active and managed, the device retrieves an update message on topic: 

Topic
~~~~~~

.. code::

	iotdm-1/device/update

	
Message Format
~~~~~~~~~~~~~~~

The "measuredDateTime" is the date of location measurement. The "updatedDateTime" is the date of the update to the device information. For efficiency reasons, IoTF may batch updates to location information so the updates may be slightly delayed. The "latitude" and "longitude" should be specified in decimal degrees using WGS84. 

Whenever location is updated, the values provided for latitude, longitude, elevation and uncertainty are considered as a single multi-value update. The latitude and longitude are mandatory and must both be provided with each update.  Elevation and uncertainty are optional and can be omitted. 

If an optional value is provided on an update and then omitted on a later update, the earlier value is deleted by the later update. Each update is considered as a complete multi-value set.

Location update triggered by device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~~~~~

- 200: The operation was successful.
- 400: The input message does not match the expected format, or one of the values is out of the valid range.
- 404: The topic name is incorrect, or the device is not in the database.
- 409: A conflict occurred during the device database update. To resolve this, simplify the operation is necessary.

Location update triggered by user or app
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Payload Format:

.. code:: 
	{
		"d": {
			"fields": [
				{ 
					"field": "location",
					"value": {
						"latitude": number,
						"longitude": number,
						"elevation": number,
						"accuracy": "The accuracy of the position",
						"measuredDateTime": "string in ISO8601 format"
					}
				}
			]
		}
	}


Please note: there is no reqId as no response by device is required.

.. _update-attributes:

Update Device Attributes
---------------------------

The Internet of Things Foundation can send this request to a device to update values of one or more device attributes. Attributes that can be updated by the Rest API are location, metadata, device information and firmware.

The "value" is the new value of the device attribute. It is a complex field matching the device model. Only writeable fields should be updated as a result of this operation. Values can be updated in:

- location (see Update location section for details)
- metadata (Optional)
- deviceInfo (Optional)
- mgmt.firmware	(see Firmware update process for details)


Topic
~~~~~~~

.. code:: 

	iotdm-1/device/update

	
Message format
~~~~~~~~~~~~~~~~

Payload Format:

.. code:: 

	{
		"d": {
			"fields": [
				{ 
					"field": "location",
					"value": ""
				}
			]
		}
	}
