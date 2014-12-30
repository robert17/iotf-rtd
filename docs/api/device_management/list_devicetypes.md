#List Device Types
Get a list of all devices types in an organization.

##Request
GET https://internetofthings.ibmcloud.com/api/v0001/organizations/**org_id**/device-types

##Request Body
None

##Response Body
The response body will contain a list of device types:

* deviceType - String
* count - Integer

##Example Response
```json
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
```

##Common Response Codes
 * 200 (Success)

