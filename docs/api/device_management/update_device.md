#Update a Registered Device

Update an existing device in an organization.

##Request
PUT https://internetofthings.ibmcloud.com/api/v0001/organizations/**org_id**/devices/**device_type**/**device_id**

##Request Body
Currently, the only property of a device that can be changed after initial registration is its metadata.
 * metadata - Complex data

 
##Example Request
```json
{
  "metadata": {
    "address": {
      "number": 21,
      "street": "Acacia Avenue"
    }
  }
}
```

##Response Body
The response body will contain the updated properties of the registered device.

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
```

##Common Response Codes
* 200 (Success)
