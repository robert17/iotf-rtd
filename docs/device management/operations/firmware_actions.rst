================
Firmware Actions
================

Firmware Download
-----------------

The Internet of Things Foundation can send this request to download new firmware onto the device. The firmware update process is described in more detail in the corresponding section. The firmware download action is considered complete when the device sends a Notify attribute change request for the "mgmt.firmware.state" attribute reaching a final value, usually "Downloaded" for a successful download.

If the action can be initiated immediately, set "rc" to 202. If "mgmt.firmware.url" is not set or is not a valid URL, set "rc" to 400. If firmware download attempt fails, set "rc" to 500 and optionally set "message" accordingly. If firmware download is not supported, set "rc" to 501 and optionally set "message" accordingly.


Topic
~~~~~~

.. code::

	iotdm-1/mgmt/initiate/firmware/download

Message format
~~~~~~~~~~~~~~~

Request Format:

.. code::

	{
		"reqId": "string"
	}

	
Response Format:

.. code::

	{
		"rc": "response_code",
		"message": "string",
		"reqId": "string"
	}

Firmware Update
---------------

The Internet of Things Foundation sends this request to update the firmware on the device. See the detailed description of the firmware update process in the corresponding section. IoTF considers the action completed when the device sends a Notify attribute change request of the "mgmt.firmware.updateStatus" attribute reaching a final value, usually "Success" for a successful update.

If this operation can be initiated immediately, "rc" should be set to 202. If firmware was not previously downloaded successfully, "rc" should be set to 400. If firmware update attempt fails, "rc" should be set to 500 and the "message" field can optionally be set to contain relevant information. If firmware update is not supported, "rc" should be set to 501 and the "message" field can optionally be set to contain relevant information.

Topic
~~~~~~

.. code::

	iotdm-1/mgmt/initiate/firmware/update

	
Message format
~~~~~~~~~~~~~~~

Request Format:

.. code::

	{
		"reqId": "string"
	}

Response Format:

.. code::

	{
		"rc": "response_code",
		"message": "string",
		"reqId": "string"
	}
