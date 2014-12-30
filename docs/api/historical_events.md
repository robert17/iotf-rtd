IBM IoT Foundation HTTP API
Contents
View an organization
Working with an organization's devices
List all devices in an organization
List all devices of a specific type in an organization
List all device types in an organization
Working with a device
Register a new device
Unregister a device
Update an existing device
View a registered device
Working with historical data
Historical data for an organization
Historical data for a device type
Historical data for a device
Introduction
This API gives an application access to information about the devices registered to your IoT Foundation organization, and lets it register or unregister devices. It also lets an application retrieve historical data that has been sent into the IoT Foundation by those devices.

Before you can use the API you will need:
The identifier of your IoT Foundation organization. This is a short character string (for example "fxjlma") which you can find by logging into the IBM IoT Foundation Dashboard at https://internetofthings.ibmcloud.com/dashboard.
An API Key for your application. You can create an API Key by logging into the IBM IoT Foundation Dashboard and clicking on the API Keys Link. If you have more than one application using the API, we suggest you create distinct API Keys for each application.
The Auth Token that was issued when you created your API Key.

The API is REST-like and you will see the HTTP Methods to use listed below. When reading the following material, please note the following:
Access to the API is secured using Basic Authentication in combination with HTTPS. In particular you must:
Use HTTPS (port 443) rather than HTTP (port 80)
Use your application's API Key as the username
Use the corresponding Auth Token as the password
When constructing your endpoint URL you substitute the organization identifier wherever the string ${org} appears. For example to view information about the organization with identifier fxjlma you would send a GET request to https://internetofthings.ibmcloud.com/api/v0001/organizations/fxjlma
When you register a device you have to specify its Device Type and provide a Device Identifier for that device. Some subsequent operations require you to provide the Device Type or Device Identifier in the URL. Where they are needed they are indicated by the string ${type} and ${id} respectively.
Some of the operations use PUT or POST and include data in the request. You should set the Content-Type HTTP header to application/json and supply the data as a JSON object.
Return to Contents
View an organization
Get details about an organization.
Request Method and Endpoint
GET
https://internetofthings.ibmcloud.com/api/v0001/organizations/${org}

Request Body
None

Response Body
id - String
name - String
created - ISO8601 date string
updated - ISO8601 date string

Example Response
{
  "id": "ey67sp",
  "name": "My Organization",
  "created":"2014-07-04T21:36:05Z",
  "updated":"2014-07-04T21:36:05Z"
}

Common Response Codes
200 (Success)
Return to Contents
List all devices
Get a list of all devices in an organization.
Request Method and Endpoint
GET
https://internetofthings.ibmcloud.com/api/v0001/organizations/${org}/devices

Request Body
None

Response Body
The response body will contain a list of devices, as below:
uuid - String
type - String
id - String
metadata - Complex data (if available)
registration
auth
id - String
type - String
date - ISO8601 date string

Example Response
[
  {
    "uuid": "d:ey67sp:raspberrypi-sample:1958138a4dfe",
    "type": "raspberrypi-sample", 
    "id": "1958138a4dfe",
    "metadata": {
      "address": {
        "number": 29,
        "street": "Acacia Road"
      }
    },
    "registration": {
      "auth": {
        "id": "joebloggs@uk.ibm.com",
        "type": "person"
      },
      "date": "2014-08-21T18:25:43-05:00"
    }
  },
  {
    "uuid": "d:ey67sp:mbed-sample:1253138b4dcd",
    "type": "mbed-sample", 
    "id": "1253138b4dcd",
    "metadata": {
      "address": {
        "number": 13,
        "street": "Elm Street"
      }
    },
    "registration": {
      "auth": {
        "id": "joebloggs@uk.ibm.com",
        "type": "person"
      },
      "date": "2014-08-21T18:25:43-05:00"
    }
  }
]

Common Response Codes
200 (Success)
Return to Contents
List all devices of a specific type
Get a list of all devices of a specific type in an organization.
Request Method and Endpoint
GET
https://internetofthings.ibmcloud.com/api/v0001/organizations/${org}/devices/${type}

Request Body
None

Response Body
The response body will contain a list of devices, as below:
uuid - String
type - String
id - String
metadata - Complex data
registration
auth
id - String
type - String
date - ISO8601 date string

Example Response
[
  {
    "uuid": "d:ey67sp:raspberrypi-sample:1958138a4dfe",
    "type": "raspberrypi-sample", 
    "id": "1958138a4dfe",
    "metadata": {
      "address": {
        "number": 29,
        "street": "Acacia Road"
      }
    },
    "registration": {
      "auth": {
        "id": "joebloggs@uk.ibm.com",
        "type": "person"
      },
      "date": "2014-08-21T18:25:43-05:00"
    }
  }
]

Common Response Codes
200 (Success)
Return to Contents
List device types
Get a list of all devices' types in an organization.
Request Method and Endpoint
GET
https://internetofthings.ibmcloud.com/api/v0001/organizations/${org}/device-types

Request Body
None

Response Body
The response body will contain a list of device types:
deviceType - String
count - Integer

Example Response
[
  {
    "deviceType": "raspberrypi-sample", 
    "count": 1
  },
  {
    "deviceType": "mbed-sample", 
    "count": 1
  }
]

Common Response Codes
200 (Success)
Return to Contents
Register a new device
Register a new device to an organization.
Request Method and Endpoint
POST
https://internetofthings.ibmcloud.com/api/v0001/organizations/${org}/devices

Request Body
You must specify the type and identifer of the device being registered.
type - String
id - String
metadata - Complex data (optional)

Example Request
{
  "type": "raspberrypi-sample", 
  "id": "1958138a4dfe",
  "metadata": {
    "address": {
      "number": 29,
      "street": "Acacia Road"
    }
  }
}

Response Headers
The response header will contain the location (resource URI) for the registered device.
Location - URI

Response Body
The response body will contain a uuid and password for the registered device.
uuid - String
type - String
id - String
metadata - Complex data (if available)
password - String

Important Note:
The response body will contain the automatically generated password for your device. You must make a note of this as, for your security, the password cannot be retrieved at a later date.

Example Response
{
  "uuid": "d:ey67sp:raspberrypi-sample:1958138a4dfe",
  "type": "raspberrypi-sample", 
  "id": "1958138a4dfe", 
  "metadata": {
    "address": {
      "number": 29,
      "street": "Acacia Road"
    }
  },
  "password": "A?j8y_ueh*d(je34",
  "registration": {
    "auth": {
      "id": "joebloggs@uk.ibm.com",
      "type": "person"
    },
    "date": "2014-08-21T18:25:43-05:00"
  }
}

Common Response Codes
201 (Created) - The device was successfully registered (Location header set to the URL of the new device)
Return to Contents
Unregister a device
Unregister a device from an organization.
Request Method and Endpoint
DELETE
https://internetofthings.ibmcloud.com/api/v0001/organizations/${org}/devices/${type}/${id}

Request Body
None

Response Body
None

Common Response Codes
204 (No Content) - The device was successfully deleted
Return to Contents
Update an existing device
Update an existing device in an organization.
Request Method and Endpoint
PUT
https://internetofthings.ibmcloud.com/api/v0001/organizations/${org}/devices/${type}/${id}

Request Body
Currently, the only property of a device that can be changed after initial registration is its metadata.
metadata - Complex data

Example Request
{
  "metadata": {
    "address": {
      "number": 21,
      "street": "Acacia Avenue"
    }
  }
}

Response Body
The response body will contain the updated properties of the registered device.
uuid - String
type - String
id - String
metadata - Complex data
registration
auth
id - String
type - String
date - ISO8601 date string

Example Response
{
  "uuid": "d:ey67sp:raspberrypi-sample:1958138a4dfe",
  "type": "raspberrypi-sample", 
  "id": "1958138a4dfe", 
  "metadata": {
    "address": {
      "number": 21,
      "street": "Acacia Avenue"
    }
  },
  "registration": {
    "auth": {
      "id": "joebloggs@uk.ibm.com",
      "type": "person"
    },
    "date": "2014-08-21T18:25:43-05:00"
  }
}

Common Response Codes
200 (Success)
Return to Contents
View registered device
Get summary information about a registered device in an organization.
Request Method and Endpoint
GET
https://internetofthings.ibmcloud.com/api/v0001/organizations/${org}/devices/${type}/${id}

Request Body
None

Response Body
The response body will contain the known properties of the device.
uuid - String
type - String
id - String
metadata - Complex data
registration
auth
id - String
type - String
date - ISO8601 date string

Example Response
{
  "uuid": "d:ey67sp:raspberrypi-sample:1958138a4dfe",
  "type": "raspberrypi-sample", 
  "id": "1958138a4dfe", 
  "metadata": {
    "address": {
      "number": 21,
      "street": "Acacia Avenue"
    }
  },
  "registration": {
    "auth": {
      "id": "joebloggs@uk.ibm.com",
      "type": "person"
    },
    "date": "2014-08-21T18:25:43-05:00"
  }
}

Common Response Codes
200 (Success)
Return to Contents
Historical data for an organization
View the historical data for the specified organization
Request Method and Endpoint
GET
https://internetofthings.ibmcloud.com/api/v0001/historian/${org}?filter

Request Headers
cursorId: use the cursorId response header returned by the initial request to iterate through the list of historical records
Cookie: required when setting the cursorId header. Use the iotHistorianSessionId cookie returned by the initial request

Request Body
None

Querystring Parameters
Filter(s) for historical data
evt_type	String	The type of event (corresponds to the component of the MQTT topic string on which the data was published from the device)
start	Number	The start date for historical data set in number of milliseconds since January 1, 1970, 00:00:00 GMT
end	Number	The end date for historical data set in number of milliseconds since January 1, 1970, 00:00:00 GMT

Response Headers
cursorId: use the cursorId response header returned by the initial request to iterate through the list of historical records
Set-Cookie: iotHistorianSessionId

Response Body
Returns a list of historical data records sorted by timestamp in descending order
device_id - String
device_type - String
evt_type - String
timestamp - Date
evt - JSON Object

Example Response
[
  {
    "device_id":"d:ey67sp:my-device-type:device0001",
    "device_type":"my-device-type",
    "evt_type":"sensor-event",
    "timestamp":{"$date":1407103315000},
    "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
  },
  {
    "device_id":"d:ey67sp:my-device-type:device0002",
    "device_type":"my-device-type",
    "evt_type":"sensor-event",
    "timestamp":{"$date":1407103315000},
    "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
  }
]

Common Response Codes
200 (success)
Return to Contents
Historical data for a device type
View the historical data for devices of the specified type
Request Method and Endpoint
GET
https://internetofthings.ibmcloud.com/api/v0001/historian/${org}/${type}?filter

Request Headers
cursorId: use the cursorId response header returned by the initial request to iterate through the list of historical records
Cookie: required when setting the cursorId header. Use the iotHistorianSessionId cookie returned by the initial request

Request Body
None

Querystring Parameters
Filter(s) for historical data
evt_type	String	The type of event (corresponds to the component of the MQTT topic string on which the data was published from the device)
start	Number	The start date for historical data set in number of milliseconds since January 1, 1970, 00:00:00 GMT
end	Number	The end date for historical data set in number of milliseconds since January 1, 1970, 00:00:00 GMT
top	Number	The maximum number of records to return. The valid range for this parameter is 1-100(default)
summarize	Array	A list of fields from the JSON event payload on which to perform the aggregate function specified by the summarize_type parameter. The format for the parameter is {field1,field2,...,fieldN}
summarize_type	String	The aggregation to perform on the fields specified by the summarize parameter. Valid values are avg(default), count, min, max, sum, range, stdev, variance.

Response Headers
cursorId: use the cursorId response header returned by the initial request to iterate through the list of historical records
Set-Cookie: iotHistorianSessionId

Response Body
Returns a list of historical data records sorted by timestamp in descending order
device_id - String
evt_type - String
timestamp - Date
evt - JSON Object

Example Response
[
  {
    "device_id":"d:ey67sp:my-device-type:device0001",
    "evt_type":"sensor-event",
    "timestamp":{"$date":1407103315000},
    "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
  },
  {
    "device_id":"d:ey67sp:my-device-type:device0002",
    "evt_type":"sensor-event",
    "timestamp":{"$date":1407103315000},
    "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
  }
]

Common Response Codes
200 (success)
Return to Contents
Historical data for a device
View the historical data for the specified device
Request Method and Endpoint
GET
https://internetofthings.ibmcloud.com/api/v0001/historian/${org}/${type}/${id}?filter

Request Headers
cursorId: use the cursorId response header returned by the initial request to iterate through the list of historical records
Cookie: required when setting the cursorId header. Use the iotHistorianSessionId cookie returned by the initial request

Request Body
None

Querystring Parameters
Filter(s) for historical data
evt_type	String	The type of event (corresponds to the component of the MQTT topic string on which the data was published from the device)
start	Number	The start date for historical data set in number of milliseconds since January 1, 1970, 00:00:00 GMT
end	Number	The end date for historical data set in number of milliseconds since January 1, 1970, 00:00:00 GMT
top	Number	The maximum number of records to return. The valid range for this parameter is 1-100(default)
summarize	Array	A list of fields from the JSON event payload on which to perform the aggregate function specified by the summarize_type parameter. The format for the parameter is {field1,field2,...,fieldN}
summarize_type	String	The aggregation to perform on the fields specified by the summarize parameter. Valid values are avg(default), count, min, max, sum, range, stdev, variance.

Response Headers
cursorId: use the cursorId response header returned by the initial request to iterate through the list of historical records
Set-Cookie: iotHistorianSessionId

Response Body
Returns a list of historical data records sorted by timestamp in descending order
evt_type - String
timestamp - Date
evt - JSON Object

Example Response
[
  {
    "evt_type":"sensor-event",
    "timestamp":{"$date":1407103315000},
    "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
  },
  {
    "evt_type":"sensor-event",
    "timestamp":{"$date":1407103315000},
    "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
  }
]
	

Common Response Codes
200 (success)
Return to Contents
Terms in this API
Definitions for request and response attributes that might not be obvious!
uuid
(In the Response for List all devices, List all devices of a specific type, Update an existing device and View device) 
An identifier that is generated by the IoT Foundation and is unique across device types and organizations. It can be used by applications that need a unique key to refer to the device.

id
(In the Response for List all devices, List all devices of a specific type, Register a new device, Update an existing device and View device)
An identifier that is supplied when the device is first registered. It corresponds to the component of the MQTT clientId used by the device. It is also the {id} component that you use to address the device in the endpoint URLs in these APIs

metadata
(In the Response for List All Devices) 
A JSON object associated with a device. It can contain arbitrary metadata that might be of use to applications that access the device. The examples in each section of this API documentation show sample metadata for each request and response. 
password
(In the Response for Register a new device) 
The authentication token that the device needs to provide (as the MQTT password) when connecting via MQTT.