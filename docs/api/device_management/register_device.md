#Register a New Device

Register a new device to an organization.

##Request
POST https://internetofthings.ibmcloud.com/api/v0001/organizations/**org_id**/devices

##Request Body
You must specify the type and identifer of the device being registered.

* type - String
* id - String
* metadata - Complex data (optional)

##Example Request
```json
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
```

##Response Headers
The response header will contain the location (resource URI) for the registered device.
 * Location - URI

##Response Body
The response body will contain a uuid and password for the registered device.
 * uuid - String
 * type - String
 * id - String
 * metadata - Complex data (if available)
 * password - String

**Important Note:** The response body will contain the automatically generated password for your device. You must 
make a note of this as, for your security, the password cannot be retrieved at a later date.

```json
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
```

##Common Response Codes
 * 201 (Created) - The device was successfully registered (Location header set to the URL of the new device)
