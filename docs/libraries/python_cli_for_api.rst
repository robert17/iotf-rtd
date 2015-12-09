==========================================================================
Python Client Library - Internet of Things Foundation API Support
==========================================================================

Introduction
-------------------------------------------------------------------------------

This client library describes how to use the Internet of Things Foundation Python client library with the Internet of Things Foundation API. For help with getting started with this module, see `Python Client Library - Introduction <https://github.com/ibm-messaging/iot-python>`__. 

This documentation contains information on how applications can use the `Python ibmiotf Client Library <https://pypi.python.org/pypi/ibmiotf>`__ to interact with your organization in the IBM Internet of Things Foundation Connect through ReST APIs.

The `Python for Devices documentation </python_cli_for_devices.html>`__ contains information on how devices can publish events and handle commands using the Python ibmiotf Client Library. 

The `Python for Applications documentation </python_cli_for_apps.html>`__ contains information on how applications can use the Python ibmiotf Client Library to interact with devices.


Constructor
-------------------------------------------------------------------------------

The Internet of Things Python module client is built for device, application, or API use by the constructor. The constructor requires a properties object containing the following definitions:

* org - Your organization ID.
* auth-method - This defines the authentication method be used, and should always be set to "apikey".
* auth-key - The authentication key should be your API key.
* auth-token - The authentication token is your API key token.

These definitions are used to interact with the Internet of Things Foundation module. 

After installing the client library, as described in the Python for the Internet of Things Foundation Introduction, the APIClient instance can be construced by running the following code snippet:

.. code:: python
    
	import ibmiotf
	import ibmiotf.application

	apiOptions = {"org": "uguhsp", "id": "myapp", "auth-method": "apikey", "auth-key": "SOME KEY", "auth-token": "SOME TOKEN"}
	apiCli = ibmiotf.api.ApiClient(apiOptions)
        

----

Response and Exception
----------------------

Each method in the APIClient responds with either a valid response (JSON or boolean) in the case of success or IoTFCReSTException in the case of failure. The IoTFCReSTException contains the following properties that application can parse to get more information about the failure.

* httpcode - HTTP Status Code
* message - Exception message containing the reason for the failure
* response - JsonElement containing the partial response if any otherwise null

So in the case of failure, application needs to parse the response to see if the action is partially successful or not.

----

Organization details
----------------------------------------------------

Applications can use the *getOrganizationDetails()* method to retrieve the Organization details. Add the following code to a .py file, beneath the constructor code shown above.

.. code:: Python

    orgDetail = apiCli.getOrganizationDetails();

Refer to the Organization Configuration section of the `IBM IoT Foundation API <https://docs.internetofthings.ibmcloud.com/swagger/v0002.html>`__ for information about the request & response model and http status code.

Sample
~~~~~~~

Your final code should follow this format:

.. code:: python
    
	import ibmiotf
	import ibmiotf.application

	apiOptions = {"org": "uguhsp", "id": "myapp", "auth-method": "apikey", "auth-key": "SOME KEY", "auth-token": "SOME TOKEN"}
	apiCli = ibmiotf.api.ApiClient(apiOptions)
	
	orgDetail = apiCli.getOrganizationDetails();

	
This code will run the constructor, and then retrieve organization details for the specified organization.
	
----

Bulk device operations
----------------------------------------------------

Applications can use bulk operations to get, add or remove devices in bulk from Internet of Things Foundation Connect.

Refer to the Bulk Operations section of the `IBM IoT Foundation API https://docs.internetofthings.ibmcloud.com/swagger/v0002.html#!/Bulk_Operations/>`__ for information about the list of query parameters, the request & response model and http status code.

Retrieve device information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Bulk device information can be retrieved using the *getAllDevices()* method. This method retrieves information on all registered devices in the organization, each request can contain a maximum of 512KB.

.. code:: python

    apiClient.getAllDevices();
    

Response and Bookmarks
~~~~~~~~~~~~~~~~~~~~~~~

The response contains parameters required by the application to retrieve the dictionary *results* from the response to get the array of devices returned. Other parameters in the response are required to make further calls, for example, the *_bookmark* element can be used to page through results. Issue the first request without specifying a bookmark, then take the bookmark returned in the response and provide it on the request for the next page. Repeat until the end of the result set indicated by the absence of a bookmark. Each request must use exactly the same values for the other parameters, or the results are undefined.

In order to pass the *_bookmark* or any other condition, the overloaded method must be used. The overloaded method takes the parameters in the form of org.apache.http.message.BasicNameValuePair as shown below,

.. code:: python

	import ibmiotf
	import ibmiotf.application
    
        ...
    
    apiOptions = {"org": "uguhsp", "id": "myapp", "auth-method": "apikey", "auth-key": "SOME KEY", "auth-token": "SOME TOKEN"}
	apiCli = ibmiotf.api.ApiClient(apiOptions)
    
	apiCli.getAllDevices({'typeId' : deviceTypeId})		


Add Devices in bulk
~~~~~~~~~~~~~~~~~~~~~~~~~

The *addMultipleDevices()* method can be used to add one or more devices to your Internet of Things Foundation organization. The maximum size of a request is set to 512KB. In each request, you must first define the devices to be added using the *listOfDevices* variable, as shown in the following code snippet:

.. code:: python

	listOfDevices = [{'typeId' : deviceTypeId, 'deviceId' : '200020002004'}, {'typeId' : deviceTypeId, 'deviceId' : '200020002005'}]
    apiCli.addMultipleDevices(listOfDevices)
	
This above code snippet should be inserted after the constructor code in a .py file. 
	
Sample
~~~~~~~

The following sample shows an example of the format your final code, and is an example of using the *addMultipleDevices()* method to add two devices.

.. code:: python

	import ibmiotf
	import ibmiotf.application
    
    apiOptions = {"org": "uguhsp", "id": "myapp", "auth-method": "apikey", "auth-key": "SOME KEY", "auth-token": "SOME TOKEN"}
	apiCli = ibmiotf.api.ApiClient(apiOptions)
    
    listOfDevices = [{'typeId' : deviceTypeId, 'deviceId' : '200020002004'}, {'typeId' : deviceTypeId, 'deviceId' : '200020002005'}]
    apiCli.addMultipleDevices(listOfDevices)


The response will contain the generated authentication tokens for each added device. These authentication tokens must be recorded when processing the response, as lost authentication tokens cannot be retrieved.


Delete Devices in bulk
~~~~~~~~~~~~~~~~~~~~~~~~

The *deleteMultipleDevices()* method can be used to delete multiple devices from an Internet of Things Foundation organization, each request can contain a maximum of 512KB. In each request, you must first define the devices to be deleted using the *listOfDevices* variable, as shown in the following code snippet:

.. code:: python

	listOfDevices = [ {'typeId' : deviceTypeId, 'deviceId' : '200020002004'}, {'typeId' : deviceTypeId, 'deviceId' : '200020002005'} ]
	deleted = apiCli.deleteMultipleDevices(listOfDevices)


This above code snippet should be inserted after the constructor code in a .py file. 


Sample
~~~~~~~

The following sample shows an example of the format your final code, and is an example of using the *deleteMultipleDevices()* method to delete two devices.

.. code:: python

	import ibmiotf
	import ibmiotf.application
    
	apiOptions = {"org": "uguhsp", "id": "myapp", "auth-method": "apikey", "auth-key": "SOME KEY", "auth-token": "SOME TOKEN"}
	apiCli = ibmiotf.api.ApiClient(apiOptions)
    
    listOfDevices = [ {'typeId' : deviceTypeId, 'deviceId' : '200020002004'}, {'typeId' : deviceTypeId, 'deviceId' : '200020002005'} ]
	deleted = apiCli.deleteMultipleDevices(listOfDevices)

----


Device Type Operations
----------------------------------------------------

Device types can be used as templates for adding device information to devices as they are added to your organization. Applications can use the Internet of Things Foundation API to list, create, delete, view, or update device types in your organization.

Refer to the Device Types section of the `IBM IoT Foundation API <https://docs.internetofthings.ibmcloud.com/swagger/v0002.html>`__ documentation for information about the list of query parameters, the request & response model, and http status codes.

Get all Device Types
~~~~~~~~~~~~~~~~~~~~~~~~

The *getAllDeviceTypes()* method can be used to retrieve all device types in your Internet of Things Foundation organization. For example,

.. code:: python

    response = apiCli.getAllDeviceTypes();


The response contains parameters and application needs to retrieve the dictionary *results* from the response to get the array of devices returned. Other parameters in the response are required to make further call, for example, the *_bookmark* element can be used to page through results. Issue the first request without specifying a bookmark, then take the bookmark returned in the response and provide it on the request for the next page. Repeat until the end of the result set indicated by the absence of a bookmark. Each request must use exactly the same values for the other parameters, or the results are undefined.
    
In order to pass the *_bookmark* or any other condition, the overloaded method must be used. The overloaded method takes the parameters in the form of a dictionary as shown below,

.. code:: python

     parameter = {'_limit' : 2}	
     print("All Retrieved Device = ", apiCli.getAllDeviceTypes(parameter))
		

Add a Device Type
~~~~~~~~~~~~~~~~~~~~~~~~

The *addDeviceType()* method can be used to register a device type to Internet of Things Foundation Connect. In each request, you must first define the device information, and device metadata elements which you want to be applied to all devices of this type. The device information element is comprised of several variables, including, serial number, manufacturer, model, class, description, firmware and hardware versions, and descriptive location. The metadata element is comprised of custom variables and values which can be defined by the user.

After defining the *deviceInfo* and *metadata* elements, use the following code snippet to register a new device type.

.. code:: python

	apiCli.addDeviceType(deviceType = "myDeviceType5", description = "My first device type", deviceInfo = deviceInfo1, metadata = metadata1)
	

	
Sample
~~~~~~

The following sample will define the API connection settings, define the DeviceInfo and Metadata elements, and then register a device type.

.. code:: python

     apiOptions = {"org": "uguhsp", "id": "myapp", "auth-method": "apikey", "auth-key": "SOME KEY", "auth-token": "SOME TOKEN"}
     apiCli = ibmiotf.api.ApiClient(apiOptions)
     deviceInfo1 = {"serialNumber": "100087", "manufacturer": "ACME Co.", "model": "7865", "deviceClass": "A", "description": "My shiny device", "fwVersion": "1.0.0", "hwVersion": "1.0", "descriptiveLocation": "Office 5, D Block"}
     metadata1 = {"customField1": "customValue1", "customField2": "customValue2"}

     print("Registering a device type")
     print("Registered Device = ", apiCli.addDeviceType(deviceType = "myDeviceType5", description = "My first device type", deviceInfo = deviceInfo1, metadata = metadata1))
    

Delete a Device Type
~~~~~~~~~~~~~~~~~~~~~~~~

The *deleteDeviceType()* method can be used to delete a device type from your Internet of Things Foundation organization. The following code snippet can be added to a .py file to delete a device type "myDeviceType5".

.. code:: python

     deletion = apiCli.deleteDeviceType("myDeviceType5")


Get a Device Type
~~~~~~~~~~~~~~~~~~~~~~~~

The *getDeviceType()* method retrieves information on a given device type. The *deviceTypeID* of the device type you wish to retrieve information on must be used as a parameter, as shown in the following code snippet for the device type "myDeviceType5". This method will return all available information for the device type, including all variables in the deviceInfo and metadata element.

.. code:: python

	apiCli.getDeviceType("myDeviceType5")

	
Update a Device Type
~~~~~~~~~~~~~~~~~~~~~~~~

The *updateDeviceType()* method can be used to modify the properties of a device type. When using this method, several parameters must be defined. Firstly, the *deviceTypeID* of the device type to be updated must be specified, then the *description*, *deviceInfo*, and *metadata* elements, as shown in the code snippet below.

.. code:: python

	apiCli.updateDeviceType("myDeviceType5", description, deviceInfo, metadata)


The properties to be modified should be defined within the, *description*, *deviceInfo*, and *metadata* elements. The variables contained in *deviceInfo* and *metadata* which are to be updated must be defined before the method is called. The code sample below is an example of the full method being called.

Sample
~~~~~~~~

.. code:: python
    
    description = "mydescription"
    metadata = {"customField1": "customValue3", "customField2": "customValue4"}
    deviceInfo = {"serialNumber": "string", "manufacturer": "string", "model": "string", "deviceClass": "string", "fwVersion": "string", "hwVersion": "string","descriptiveLocation": "string"}
    apiCli.updateDeviceType("myDeviceType5", description, deviceInfo, metadata)

----

Device operations
----------------------------------------------------

Device operations made available through the API include listing, adding, removing, viewing, updating, viewing location and viewing  device management information of devices in an Internet of Things Foundation organization.

Refer to the Device section of the `IBM IoT Foundation API <https://docs.internetofthings.ibmcloud.com/swagger/v0002.html>`__ for information about the list of query parameters, the request & response model and http status code.

Get Devices of a particular Device Type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *retrieveDevices()* method can be used to retrieve all the devices of a particular device type in an organization from Internet of Things Foundation. For example,

.. code:: python

     print("\nRetrieving All existing devices")	
     print("Retrieved Devices = ", apiCli.retrieveDevices(deviceTypeId))
    
The response contains parameters and application needs to retrieve the dictionary *results* from the response to get the array of devices returned. Other parameters in the response are required to make further call, for example, the *_bookmark* element can be used to page through results. Issue the first request without specifying a bookmark, then take the bookmark returned in the response and provide it on the request for the next page. Repeat until the end of the result set indicated by the absence of a bookmark. Each request must use exactly the same values for the other parameters, or the results are undefined.

In order to pass the *_bookmark* or any other condition, the overloaded method must be used. The overloaded method takes the parameters in the form of dictionary as shown below,

.. code:: python

    response = apiClient.retrieveDevices("iotsample-ardunio", parameters);
		
The above snippet sorts the response based on device id and uses the bookmark to page through the results.

Add a Device
~~~~~~~~~~~~~~~~~~~~~~~

The *registerDevice()* method is used to add a device to an Internet of Things Foundation organization. The *registerDevice()* method adds a single device to your Internet of Things Foundation organization. The parameters which can be set when adding a device are:

- deviceTypeId: *Optional*. Assigns a device type to the device. Where there is a clash between variables defined by the device type and variables defined by under deviceInfo, the device specific variables will take precedence.
- deviceId: *Mandatory*. 
- authToken: *Optional*. If no authentication token is supplied, one will be generated and included in the response.
- deviceInfo: *Optional*. This parameter is optional, and can contain a number of variables, including: serialNumber, manufacturer, model, deviceClass, description, firmware and hardware versions, and descriptiveLocation.
- metadata: *Optional*. Metadata can optionally be added in the form of custom field:value string pairs. An example is given in the code sample below.
- location: *Optional*. This parameter contains the longitude, latitude, elevation, accuracy, and mesauredDateTime variables.

For more information on the parameters presented here, and the response format and codes, please see the relevant section of `API documentation <https://docs.internetofthings.ibmcloud.com/swagger/v0002.html#!/Devices/post_device_types_typeId_devices>`__. 

When using the *registerDevice()* method, you must define the mandatory deviceID parameter, and any of the optional parameters you require for your device, then call the method using the parameters you've selected.

Sample
~~~~~~~

The following code sample should be inserted after the constructor code in a .py file. This code demonstrates defining the deviceId, authToken, metadata, deviceInfo parameters, and location parameters and then using the method with those parameters and adding a device type.

.. code:: python

    deviceId = "200020002000"
    authToken = "password"
    metadata = {"customField1": "customValue1", "customField2": "customValue2"}
    deviceInfo = {"serialNumber": "001", "manufacturer": "Blueberry", "model": "abc1", "deviceClass": "A", "descriptiveLocation" : "Bangalore", "fwVersion" : "1.0.1", "hwVersion" : "12.01"}
    location = {"longitude" : "12.78", "latitude" : "45.90", "elevation" : "2000", "accuracy" : "0", "measuredDateTime" : "2015-10-28T08:45:11.662Z"}
	
    apiCli.registerDevice(deviceTypeId, deviceId, metadata, deviceInfo, location)


Delete a Device
~~~~~~~~~~~~~~~~~~~~~~~~

The *deleteDevice()* method is used to remove a device from an Internet of Things Foundation organization. When deleting a device using this method, the parameters which must be specified in the method are the deviceTypeId, and the deviceId.

The following code snippet provides an example of the format required for this method.

.. code:: java

    apiCli.deleteDevice(deviceTypeId, deviceId)

    
Get a Device
~~~~~~~~~~~~~~~~~~~~~~~~

The *getDevice()* method can be used to retrieve a device from an Internet of Things Foundation organization. When retrieving device details using this method, the parameters which must be specified in the method are the deviceTypeId, and the deviceId.

The following code snippet provides an example of the format required for this method.

.. code:: python

	apiCli.getDevice(deviceTypeId, deviceId)
    

Get all Devices
~~~~~~~~~~~~~~~~~~~~~~~~

The *getAllDevices()* method can be used to retrieve all devices within an Internet of Things Foundation organization.

.. code:: python

	apiCli.getAllDevices({'typeId' : deviceTypeId})


Update a Device
~~~~~~~~~~~~~~~~~~~~~~~~

The *updateDevice()* method is used to modify one or more properties of a device. Any property in the deviceInfo or metadata parameters can be updated. In order to update a device property, it must be defined above the method. The status parameter should contain "alert": True. The Alert property controls whether a device will display error codes in the Internet of Things Foundation user interface, and should be set by default to 'True'.

.. code:: python
    
    
    status = { "alert": { "enabled": True }  }
    apiCli.updateDevice(deviceTypeId, deviceId, metadata2, deviceInfo, status)

Sample
~~~~~~~

In this sample, the following code identifies a specific device, and updates several properties under the deviceInfo parameter.

.. code:: python

	status = { "alert": { "enabled": True } }
	deviceInfo = {descriptiveLocation: "London", hwVersion: "2.0.1", fwVersion: "2.5.1"}
    apiCli.updateDevice("MyDeviceType", "200020002000", deviceInfo, status)	
	
Get Location Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *getDeviceLocation()* method can be used to retrieve the location information of a device. The parameters required for retrieving the location data are deviceTypeId and deviceId. 

.. code:: python
    
	apiClient.getDeviceLocation("iotsample-ardunio", "ardunio01")

The response to this method contains the longitude, latitude, elevation, accuracy, measuredTimeStamp, and updatedTimeStamp properties.	
	
	
Update Location Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *updateDeviceLocation()* method is used to modify the location information for a device. Simlarly to updating device properties, the deviceLocation parameter must be defined with the changes you wish to apply. The code sample below demonstrates changing the location data for a given device.

.. code:: python
    
    deviceLocation = { "longitude": 0, "latitude": 0, "elevation": 0, "accuracy": 0, "measuredDateTime": "2015-10-28T08:45:11.673Z"}
    apiCli.updateDeviceLocation(deviceTypeId, deviceId, deviceLocation)

If no date is supplied, the entry is added with the current date and time. 


Get Device Management Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *getDeviceManagementInformation()* method is used to get the device management information for a device. The response contains the last activity date-time, the device's dormant status (true/false), support for device and firmware actions, and firmware data. For a comprehensive list of response content, please see the relevant API documentation.

The following code sample will return the device management information for a device with the deviceId "00aabbccde03", with deviceTypeId "iotsample-arduino".

Sample
~~~~~~~~~

.. code:: python
    
    apiCli.getDeviceManagementInformation("iotsample-arduino", "00aabbccde03")
    

----

Device diagnostic operations
----------------------------------------------------

Applications can use device diagnostic operations to clear logs, retrieve all or specific logs for a device, add log information, delete logs, clear error codes, get device error codes, and add an error codes.

For more detailed information on query and response models, response codes, and query paramters, please see the relevant API documentation.

Get Diagnostic logs
~~~~~~~~~~~~~~~~~~~~~~

The *getAllDiagnosticLogs()* method is used to retrieve all diagnostic logs for a specific device. The *getAllDiagnosticLogs()* method requires the deviceTypeId and deviceId parameters.

.. code:: python

    apiCli.getAllDiagnosticLogs(deviceTypeId, deviceId)
    
The response model for this method contains the logId, message, severity, data, and timestamp.

Clear Diagnostic logs for a Device 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *clearAllDiagnosticLogs()* method is used to delete all diagnostic logs for a specific device. The required parameters are deviceTypeId and deviceId. Care should be taken when deleting logs, as logs cannot be recovered once deleted.

.. code:: python

    apiCli.clearAllDiagnosticLogs(deviceTypeId, deviceId)
    

Add a Diagnostic log
~~~~~~~~~~~~~~~~~~~~~~

The *addDiagnosticLog()* method is used to add an entry in the diagnostic log of the device. The log may be pruned as the new entry is added. If no date is supplied, the entry is added with the current date and time. To use this method, first define a 'logs' parameter with the following variables:

- message: This variable is mandatory, and contains the new diagnostic message.
- severity: This variable is optional. If used it corresponds to the severity of the diagnostic log, and should be 0, 1, or 2, corresponding to the informational, warning, and error categories.
- data: This variable is optional, and should contain diagnostic data.
- timestamp: This variable is optional, and contains the date and time of the log entry in ISO8601 format. If this variable is not included, it is automatically added with the current date and time. 

The other necessary paramteres required in the method are the deviceTypeId and deviceId for the specific device.

The code sample below contains an example of the method.

.. code:: python

    logs = { "message": "MessageContent", "severity": 0, "data": "LogData"}
    apiCli.addDiagnosticLog(deviceTypeId, deviceId, logs)

	
Retrieve a specific Diagnostic log
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *getDiagnosticLog()* method is used to retrieve a specific diagnostic log for a specified device based on the log id. The required parameters for this method are the deviceTypeId, deviceId, and logId.

.. code:: python

    apiCli.getDiagnosticLog(deviceTypeId, deviceId, logId)
    
	
Delete a Diagnostic log
~~~~~~~~~~~~~~~~~~~~~~~~~~

The *deleteDiagnosticLog()* can be used to delete a specific diagnostic log. In order to specify a diagnostic log, the deviceTypeId, deviceId, and logId parameters should be supplied.

.. code:: python

	apiCli.deleteDiagnosticLog(deviceTypeId, deviceId, logId)
    

Retrieve Device Error Codes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *getAllDiagnosticErrorCodes()* method is used to retrieve all diagnostic error codes associated with a specific device.

.. code:: python

	apiCli.getAllDiagnosticErrorCodes(deviceTypeId, deviceId)
	
		
Clear Diagnostic Error Codes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *clearAllErrorCodes()* method is used to clear the list of error codes associated with the device. The list is replaced with a single error code of zero.

.. code:: python

    apiCli.clearAllErrorCodes(deviceTypeId, deviceId)
	

Add single Diagnostic ErrorCode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *addErrorCode()* method is used to add an error code to the list of error codes associated with the device. The list may be pruned as the new entry is added. The parameters required in the method are deviceTypeId, deviceId, and errorCode. The errorCode parameter contains the following variables:

- errorCode: This variable is mandatory and should be set as an integer. This sets the number of the error code to be created.
- timestamp: This variable is optional, and contains the date and time of the log entry in ISO8601 format. If this variable is not included, it is automatically added with the current date and time. 

.. code:: python

    errorCode = { "errorCode": 1234, "timestamp": "2015-10-29T05:43:57.112Z" }
    apiCli.addErrorCode(deviceTypeId, deviceId, errorCode)

----

Connection problem determination
----------------------------------

The *getDeviceConnectionLogs()* method is used to list connection log events for a device. This information can be used to help diagnose connectivity problems between the device and the Internet of Things Foundation service. The entries record successful connection, unsuccessful connection attempts, intentional disconnection and server-initiated disconnection events.

.. code:: python

	apiCli.getDeviceConnectionLogs(deviceTypeId, deviceId)

The response includes a list of log entries, containing log messages and timestamps. 

----

Historical Event Retrieval
----------------------------------

These operations can be used to view events from all devices, view events from a device type or to view events for a specific device.

Refer to the Historical Event Retrieval section of the `IBM IoT Foundation Connect API <https://docs.internetofthings.ibmcloud.com/swagger/v0002.html>`__ for information about the list of query parameters, the request & response model and http status code.

View events from all devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Method getHistoricalEvents() can be used to view events across all devices registered to the organization.

.. code:: python

     print("Historical Events = ", apiCli.getHistoricalEvents())

The response will contain some parameters and the application needs to retrieve the JSON element *events* from the response to get the array of events returned. Other parameters in the response are required to make further call, for example, the *_bookmark* element can be used to page through results. Issue the first request without specifying a bookmark, then take the bookmark returned in the response and provide it on the request for the next page. Repeat until the end of the result set indicated by the absence of a bookmark. Each request must use exactly the same values for the other parameters, or the results are undefined.

In order to pass the *_bookmark* or any other condition, the overloaded method must be used. The overloaded method takes the parameters in the form of dictionary as shown below,

.. code:: python

     startTime = math.floor(time.mktime((2013, 10, 10, 17, 3, 38, 0, 0, 0)) * 1000)
     endTime =  math.floor(time.mktime((2015, 10, 29, 17, 3, 38, 0, 0, 0)) * 1000)
     duration = {'start' : startTime, 'end' : endTime }
    apiCli.getHistoricalEvents(options = duration))

The above snippet returns the events between the start and end time.

View events from a device type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *getHistoricalEvents()* method is used to view events from all the devices of a particular device type. 

.. code:: python

	apiCli.getHistoricalEvents(deviceType = 'iotsample-arduino', options = duration)

The response will contain some parameters and the application needs to retrieve the JSON element *events* from the response to get the array of events returned. As mentioned in the *view events from all devices* section, the overloaded method can be used to control the output.


View events from a device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *getHistoricalEvents()* method is used to view events from a specific device. DeviceTypeId and deviceId parameters are required in order to use this method.

.. code:: python
			
    apiCli.getHistoricalEvents(deviceType, deviceId, options = duration)

The response will contain more parameters and application needs to retrieve the JSON element *events* from the response to get the array of events returned. 

----


Examples
-------------
* `bulkOperations.py <https://github.com/ibm-messaging/iot-python/blob/master/samples/apiExamples/bulkOperations.py>`__ - Sample that showcases how to get, add or remove devices in bulk from Internet of Things Foundation.
* `deviceDiagnostics.py <https://github.com/ibm-messaging/iot-python/blob/master/samples/apiExamples/deviceDiagnostics.py>`__ - A sample that showcases various Device Diagnostic operations like clear logs, retrieve logs, add log information, delete logs, get specific log, clear error codes, get device error codes and add an error code to Internet of Things Foundation.
* `deviceTypes.py <https://github.com/ibm-messaging/iot-python/blob/master/samples/apiExamples/deviceTypes.py>`__ - Sample that showcases various Device Type API operations like list all, create, delete, view and update device types in Internet of Things Foundation.
* `devices.py <https://github.com/ibm-messaging/iot-python/blob/master/samples/apiExamples/devices.py>`__ - A sample that showcases various Device operations like list, add, remove, view, update, view location and view management information of a device in Internet of Things Foundation.
* `historian.py <https://github.com/ibm-messaging/iot-python/blob/master/samples/apiExamples/historian.py>`__ - A sample that showcases how to retrieve historical events from Internet of Things Foundation.
* `logConnection.py <https://github.com/ibm-messaging/iot-python/blob/master/samples/apiExamples/logConnection.py>`__ - A sample that showcases device connectivity log operations that can be performed on Internet of Things Foundation.
* `organization.py <https://github.com/ibm-messaging/iot-python/blob/master/samples/apiExamples/organization.py>`__ - A sample that showcases organization operations that can be performed on Internet of Things Foundation.
