#List Devices by Type
Get a list of all devices of a specific type in an organization.

##Request
GET https://internetofthings.ibmcloud.com/api/v0001/organizations/**org_id**/devices/**device_type**

##Request Body
None

##Response Body
The response body will contain a list of devices, as below:

* uuid - String
* type - String
* id - String
* metadata - Complex data
* registration
    * auth
        * id - String
        * type - String
    * date - ISO8601 date string

##Example Response
```json
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
```

##Common Response Codes
 * 200 (Success)
