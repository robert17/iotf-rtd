=====================
Updating Firmware
=====================

Updating Firmware and the Device Model
---------------------------------------

The firmware level currently known to be on a given device is stored in the deviceInfo.fwVersion attribute. The mgmt.firmware attributes are used to perform a firmware update and observe its status.

The firmware update process is separated into two distinct actions, Downloading Firmware, and Updating Firmware. The status of each of these actions is stored in a separate attribute on the device. The mgmt.firmware.state attribute describes the status of the firmware download. The possible values for mgmt.firmware.state are:

- 0: The zero state is Idle, and signifies that the device is currently not in the process of downloading firmware.
- 1: The one state is Downloading, it signifies that the device is currently downloading firmware.
- 2: The two state is Downloaded, it signifies that the device has successfully downloaded a firmware update and it is ready to install.

The mgmt.firmware.updateStatus attribute describes the status of firmware update. The possible values for mgmt.firmware.status are:

- 0: The zero state is Success, it signifies that the firmware has been successfully updated.
- 1: The one state is In Progress, it signifies that the firmware update has been initiated but is not yet complete.
- 2: The two state is Out of Memory, it signifies that the out of memory condition has been detected during the operation.
- 3: The three state is Connection Lost, it signifies that the connection was lost during the firmware download.
- 4: The four state is Verification Failed, it signifies that the firmware did not pass verification. 
- 5: The five state is Unsupported Image, it signifies that the downloaded firmware image is not supported by the device.
- 6: The six state is Invalid URL, it signifies that the device could not download the firmware from the provided URL.






Firmware Downloaded
--------------------

The Download Firmware action can be initiated by using either the Internet of Things Foundation dashboard, or the REST API.

To initiate a firmware download using the REST API, issue a POST request to /mgmt/requests. The information provided is:

- The action "firmware/download"
- The URL for the firmware image
- A list of devices to receive the image, with a maximum of 5000 devices
- Optional verifier string to validate the image
- Optional firmware name
- Optional firmware version

The device management server in the Internet of Things Foundation uses the Device Management Protocol to send a request to the devices, initiating the firmware download. There are two steps. 

1. Set the firmware details using the topic *iotdm-1/device/update*.
2. Initiate the download using the topic *iotdm-1/mgmt/initiate/firmware/download*

If the mgmt.firmware.state is not 0 ("Idle"), an error should be reported with response code 400, and an optional message text.

When an excecute request is reveived by the device, mgmt.firmware.state should change from 0 (Idle) to 1 (Downloading). When the download has been completed successfully, mgmt.firmware.state should be set to 2 (Downloaded).

If an error occurrs during download mgmt.firmware.state should be set to 0 (Idle) and mgmt.firmware.updateStatus should be set to one of the error status values: 

- 2 (Out of Memory)
- 3 (Connection Lost)
- 6 (Invalid URL)

If a firmware verifier has been set, the device should attempt to verify the firmware image. If the image verification fails, mgmt.firmware.state should be set to 0 (Idle) and mgmt.firmware.updateStatus should be set to the error status value 4 (Verification Failed).

If download and verification were successful, mgmt.firmware.state should be set to 2 (Downloaded) and mgmt.firmware.updateStatus should be set to 0 (Success). The downloaded firmware is now ready to be installed.


Installing Firmware Updates
----------------------------

The installation of the downloaded firmware is initiated using the REST API by issuing a POST request to /mgmt/requests. The information which should be provided is:

- The action "firmware/update"
- The list of devices to receive the image, all of the same device type

The device management server in the Internet of Things Foundation uses the device management protocol to request that the devices specified initiate the firmware installation by publishing using the topic iotdm-1/mgmt/initiate/firmware/update.

If mgmt.firmware.state is not 2 (Downloaded), an error should be reported with "rc" set to 400 and an optional message text. Otherwise, mgmt.firmware.updateStatus should be set to 1 (In Progress) and firmware installation should start. If firmware installation fails, mgmt.firmware.updateStatus should be set to one of:

- 2 (Out of Memory)
- 5 (Unsupported Image)

Once firmware update is complete, mgmt.firmware.updateStatus should be set to 0 (Success), mgmt.firmware.state should be set to 0 (Idle), downloaded firmware image can be deleted from the device and deviceInfo.fwVersion should be set to the value of mgmt.firmware.version.

All fields under mgmt.firmware have to be set at the same time, so that if there is a current observation for mgmt.firmware, only a single notify message is sent. 

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
      {"name": "url", "value": "https://firmware.smartcop.com/flyingcarpet/1001.zip"}
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
