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












