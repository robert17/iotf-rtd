
Examples
---------

These examples illustrate the API and the behaviour of the device management agent. 

Device Location
~~~~~~~~~~~~~~~~

An administrator wants to update the location for a device in the Internet of Things Foundation, perhaps using information from a mobile device. A device would use an equivalent mechanismbased on MQTT.

Example Request:

.. code::

  PATCH org_id.internetofthings.ibmcloud.com/api/v0002/devices/types/{typeId}/devices/{deviceid}/location
  
Request Body

.. code::
  
  {
    "latitude": 27.9156,
    "longitude": 86.5640,
    "elevation": 8850,
    "measuredDateTime": "2014-08-21T18:25:43-05:00"
  }

Device Reboot
~~~~~~~~~~~~~~

An administrator wants to reboot a device from the device dashboard. This is a long-running asyncronous process.

Example Request:

.. code::

  POST org_id.internetofthings.ibmcloud.com/api/v0002/mgmt/requests
  
Request body

.. code::
  {
    "action": "device/reboot"
    "devices": [{"typeId": "raspberry-pi", "deviceId": "andrewpi"}]
  }

Sequence:

1. REST API is issued to the Internet of Things device management server.
2. The Internet of Things Foundation published a command to reboot the device.
3. REST API returns. A management request document is created which can be queried to keep track of the progress of the request.
4. When the device is connectd, it receives the command and reboots.
5. When the device restarts, it updates its device management registration.

Firmware update
~~~~~~~~~~~~~~~~

An administrator wants to initiate a firmware update on a device from the device dashboard. This is a long-running, asynchronous process. There are two separate steps here, downloading and updating. 

Request 1:

.. code::

  POST org_id.internetofthings.ibmcloud.com/api/v0002/mgmt/requests
  
Request Body:

.. code::

  {
    "action": "firmware/download"
    "parameters": [
      {"name": "version", "value": "20"},
      {"name": "name", "value": "Twisty swirls"},
      {"name": "uri", "value": "https://firmware.smartcop.com/flyingcarpet/1001.zip"}
      ]
    "devices": [{"typeId": "raspberry-pi", "deviceId": "andrewpi"}]
  }

Sequence:

1. REST API is issued to the Internet of Things Foundation.
2. The Internet of Things Foundation published an update to the mgmt.firmware section of the device's metadata containing the package URL. An observation request is scheduled for the status of the firmware update.
3. A command is published to the device to download the firmware package.
4. The Internet of Things Foundation updates the firmware section of the device's metadata, replacing the existing data.
5. REST API returns. A management request document is created which can be queried to keep track of the progress of the request.
6. When the device is connected, it receives the update to the mgmt.firmware section of its metadata containing the package URL, the observation request and the command.
7. The device sets its firmware status to 1 (Downloading) and initiates the download.
8. When the firmware is downloaded, the device changes the firmware status to 2 (Downloaded) and sends a notification to the Internet of Things Foundation.
9. The Internet of Things Foundation updates the firmware section of the device's metadata.

Request 2:

.. code::

    POST org_id.internetofthings.ibmcloud.com/pai/v0002/mgmt/requests

Request Body:

.. code:: 

  {
    "action": "firmware/update",
    "devices": [{"typeId": "raspberry-pi", "deviceId": "andrewpi"}]
  }

Sequence:

1. REST API is issued to the Internet of Things Foundation.
2. The command is published to update the device firmware to the downloaded package.
3. The firmware section of the device's metadata is updated.
4. The REST API returns and a management request document is created which can be queried to keep track of the progress of the request.
5. When the device is connected, it receives the command and begins the firmware update.
6. Assuming the firmware update was successful, the device changes the firmware update status to 0 (Success) and sends a notification to the Internet of Things Foundation.
