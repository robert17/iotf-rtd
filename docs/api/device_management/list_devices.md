#List Devices
Get a list of all devices in an organization.

##Request
GET https://internetofthings.ibmcloud.com/api/v0001/organizations/**org_id**/devices

##Request Body
None

##Response Body
The response body will contain a list of devices, as below:

* uuid - String
* type - String
* id - String
* metadata - Complex data (if available)
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
```

##Common Response Codes
* 200 (Success)
