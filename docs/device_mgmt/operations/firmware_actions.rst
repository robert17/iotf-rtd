===============================================================================
Device Management Operations - Firmware Actions
===============================================================================

The firmware level currently known to be on a given device is stored in the ``deviceInfo.fwVersion`` attribute. 
The ``mgmt.firmware`` attributes are used to perform a firmware update and observe its status.

The firmware update process is separated into two distinct actions, Downloading Firmware, and Updating Firmware. 
The status of each of these actions is stored in a separate attribute on the device. The ``mgmt.firmware.state`` 
attribute describes the status of the firmware download. The possible values for ``mgmt.firmware.state`` are:

+--------------+-------------+------------------------------------------------------------------------------------------+
| Value        | State       | Meaning                                                                                  |
+==============+=============+==========================================================================================+
| 0            | Idle        | The device is currently not in the process of downloading firmware                       |
+--------------+-------------+------------------------------------------------------------------------------------------+
| 1            | Downloading | The device is currently downloading firmware                                             |
+--------------+-------------+------------------------------------------------------------------------------------------+
| 2            | Downloaded  | The device has successfully downloaded a firmware update and it is ready to install      |
+--------------+-------------+------------------------------------------------------------------------------------------+



The ``mgmt.firmware.updateStatus`` attribute describes the status of firmware update. The possible values for ``mgmt.firmware.status`` are:

+--------------+---------------------+----------------------------------------------------------------------+
| Value        | State               | Meaning                                                              |
+==============+=====================+======================================================================+
| 0            | Success             | The firmware has been successfully updated                           |
+--------------+---------------------+----------------------------------------------------------------------+
| 1            | In Progress         | The firmware update has been initiated but is not yet complete       |
+--------------+---------------------+----------------------------------------------------------------------+
| 2            | Out of Memory       | An out of memory condition has been detected during the operation.   |
+--------------+---------------------+----------------------------------------------------------------------+
| 3            | Connection Lost     | The connection was lost during the firmware download                 |
+--------------+---------------------+----------------------------------------------------------------------+
| 4            | Verification Failed | The firmware did not pass verification                               |
+--------------+---------------------+----------------------------------------------------------------------+
| 5            | Unsupported Image   | The downloaded firmware image is not supported by the device         |
+--------------+---------------------+----------------------------------------------------------------------+
| 6            | Invalid URL         | The device could not download the firmware from the provided URL     |
+--------------+---------------------+----------------------------------------------------------------------+


.. _firmware-actions-download:

Firmware Download
-----------------
The Download Firmware action can be initiated by using either the Internet of Things Foundation dashboard, or the REST API.

To initiate a firmware download using the REST API, issue a POST request to /mgmt/requests. The information provided is:

- The action ``firmware/download``
- The URL for the firmware image
- A list of devices to receive the image, with a maximum of 5000 devices
- Optional verifier string to validate the image
- Optional firmware name
- Optional firmware version

The device management server in the Internet of Things Foundation uses the Device Management Protocol to send a request to the devices, initiating the firmware download. There are two steps: 

1. Firmware details update request sent on topic ``iotdm-1/device/update``
2. Initiate the download request sent on topic ``iotdm-1/mgmt/initiate/firmware/download``
 
- If ``mgmt.firmware.state`` is not ``0`` ("Idle") an error should be reported with response code ``400``, and an optional message text.
- If the action can be initiated immediately, set ``rc`` to ``202``. 
- If ``mgmt.firmware.url`` is not set or is not a valid URL, set ``rc`` to ``400``. 
- If firmware download attempt fails, set ``rc`` to ``500`` and optionally set ``message`` accordingly. 
- If firmware download is not supported, set ``rc`` to ``501`` and optionally set ``message`` accordingly.
- When an excecute request is received by the device, ``mgmt.firmware.state`` should change from ``0`` (Idle) to ``1`` (Downloading). 
- When the download has been completed successfully, ``mgmt.firmware.state`` should be set to ``2`` (Downloaded).
- If an error occurrs during download ``mgmt.firmware.state`` should be set to ``0`` (Idle) and ``mgmt.firmware.updateStatus`` should be set to one of the error status values: 

  - 2 (Out of Memory)
  - 3 (Connection Lost)
  - 6 (Invalid URL)

- If a firmware verifier has been set, the device should attempt to verify the firmware image. If the image verification fails, ``mgmt.firmware.state`` should be set to ``0`` (Idle) and ``mgmt.firmware.updateStatus`` should be set to the error status value ``4`` (Verification Failed).
- If download and verification were successful, ``mgmt.firmware.state`` should be set to ``2`` (Downloaded) and ``mgmt.firmware.updateStatus`` should be set to ``0`` (Success). The downloaded firmware is now ready to be installed.


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


.. _firmware-actions-update:

Firmware Update
---------------

The installation of the downloaded firmware is initiated using the REST API by issuing a POST request to /mgmt/requests. The information which should be provided is:

- The action ``firmware/update``
- The list of devices to receive the image, all of the same device type

The device management server in the Internet of Things Foundation uses the device management protocol to request that the devices specified initiate the firmware installation by publishing using the topic ``iotdm-1/mgmt/initiate/firmware/update``.

- If this operation can be initiated immediately, ``rc`` should be set to ``202``.
- If firmware was not previously downloaded successfully, ``rc`` should be set to ``400``.
- If firmware update attempt fails, ``rc`` should be set to ``500`` and the ``message`` field can optionally be set to contain relevant information.
- If firmware update is not supported ``rc`` should be set to ``501`` and the ``message`` field can optionally be set to contain relevant information.
- If ``mgmt.firmware.state`` is not ``2`` (Downloaded), an error should be reported with ``rc`` set to ``400`` and an optional message text. 
- Otherwise, ``mgmt.firmware.updateStatus`` should be set to ``1`` (In Progress) and firmware installation should start. 
- If firmware installation fails, ``mgmt.firmware.updateStatus`` should be set to either:

  - ``2`` (Out of Memory)
  - ``5`` (Unsupported Image)
  
- Once firmware update is complete, ``mgmt.firmware.updateStatus`` should be set to ``0`` (Success), ``mgmt.firmware.state`` should be set to ``0`` (Idle), downloaded firmware image can be deleted from the device and ``deviceInfo.fwVersion`` should be set to the value of ``mgmt.firmware.version``.

.. important:: All fields under ``mgmt.firmware`` must be set at the same time, so that if there is a current observation for ``mgmt.firmware``, only a single notify message is sent. 


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
