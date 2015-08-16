===========================
Device Actions Operations
===========================

Operation Details
------------------

Initiate reboot
''''''''''''''''

The Internet of Things Foundation can send this request to reboot a device. The action is considered complete when the device sends a Manage device request following its reboot.
	
If this operation can be initiated immediately, set "rc" to 202, if reboot attempt fails, the "rc" is set to 500 and the "message" field should be set accordingly, if the reboot is not supported, set "rc" to 501 and optionally set "message" accordingly.


Topic
~~~~~~

.. code:: 

	iotdm-1/mgmt/initiate/device/reboot

	
Message format
~~~~~~~~~~~~~~~

Example Request:

.. code:: 

	{
		"reqId": "string"
	}
Example Response:

.. code::

	{
		"rc": "response_code",
		"message": "string",
		"reqId": "string"
	}

Initiate factory reset
'''''''''''''''''''''''

The Internet of Things Foundation can send this request to reset the device to factory settings, as part of this process, the device also reboots. The action is considered complete when the device sends a Manage device request following its reboot.

The response code should be 202 if this action can be initiated immediately. If the factory reset attempt fails, the "rc" should be 500 and the "message" field should be set accordingly, if the factory reset action is not supported, set "rc" to 501 and optionally set "message" accordingly.

Topic
~~~~~~

.. code::

	iotdm-1/mgmt/initiate/device/factory_reset


Message format
~~~~~~~~~~~~~~~

Example Request:

.. code::

	{
		"reqId": "string"
	}

Example Response:

.. code::

	{
		"rc": "response_code",
		"message": "string",
		"reqId": "string"
	}
