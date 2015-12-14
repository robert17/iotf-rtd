Jasper Integration in the IBM Internet of Things Foundation platform
========================================================================

What is Jasper?
------------------------

Jasper is an administration and management platform for SIM devices. Jasper has been integrated into the IBM IoT Foundation platform dashboard, making it possible to administer Jasper devices through your IoTF platform organization dashboard.

What Operations can I perform with Jasper through IoTF?
---------------------------------------------------------

By using the built-in Jasper functions in the Internet of Things Foundation platform dashboard, you can perform the following Jasper operations:

- View SIM usage
- Change SIM activation state.
- Send SMS to SIM
- Change rate plan

These operations can be accessed in the device drilldown of a Jasper connected device after the configuration steps below are completed.


Integrating my Jasper dashboard into my IoT Foundation Dashboard
-------------------------------------------------------------------

In order to connect your Internet of Things Foundation platform organization with your Jasper account, there are two stages of configuration which must first be performed. The first stage of configuration is Organization Configuration.

Organization Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

To connect your Jasper account to your Internet of Things Foundation platform organization, follow these steps:

1. When in your Internet of Things Foundation platform dashboard, click the wrench icon on the right to open the Configuration Settings.
2. Scroll down the to the Extensions section, and set Jasper to 'On'.
3. Enter your Jasper username, password, license key, and API endpoint.

Device Configuration
~~~~~~~~~~~~~~~~~~~~~

Devices which are connected to both your Internet of Things Foundation platform organization and your Jasper account can be configured to display data from Jasper in the IoT Foundation platform dashboard. Jasper configuration cannot be applied as part of the Add Device process, only already connected devices can be configured with Jasper. To configure your Jasper-connected devices, follow these steps:

1. In the devices tab of your Internet of Things Foundation platform dashboard, find the Jasper-connected device to be configured.
2. Select the device to open the Device Drilldown view.
3. Scroll down to the 'Extension Configuration section. The extension configuration must be entered as JSON in the following format:

.. code:: JSON

  {
  	"jasper": {
  		"iccid": "string"
  	}
  }

4. When this has been entered, click 'Confirm changes' to save the configuration.

If the Organization configuration has been completed correctly, the Extensions section should now appear below the Extensions Configuration section in the Device Drilldown.

Operations
~~~~~~~~~~~~

Jaspers operations can be viewed or updated in the device drilldown menu for any devices which are connected to both your Internet of Things Foundation platform organization and Jasper, and have been configured as explained above. The supported Jasper operations are:

- View overall Jasper data
  - Shows: Status, Rate Plan, month-to-date data usage, month-to-date SMS usage, month-to-date voice usage, overage limits, date added, and date modified.
- Change SIM activation state.
  - Select from: Inventory, Activation Ready, Activated, Deactivated, and Retired.
- View SIM Usage
  - Shows: Cycle start date, billable and total data, billable and total SMS, billable and total voice.
  - The cycle start date can be set using a YYYY-MM-DD format.
- Send SMS to SIM
- Change rate plan
