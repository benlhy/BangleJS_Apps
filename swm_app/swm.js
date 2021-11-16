var gatt;

NRF.requestDevice({ timeout: 3000, filters: [{ services: ["ffe0", "fee7"] }] })
  .then(function (device) {
    console.log("found device");
    return device.gatt.connect();
  })
  .then(function (g) {
    gatt = g;
    console.log("connected");
    return g.getPrimaryService("0000ffe0-0000-1000-8000-00805f9b34fb");
  })
  .then(function (s) {
    console.log("service found");
    return s.getCharacteristic("0000ffe1-0000-1000-8000-00805f9b34fb");
  })
  .then(function (c) {
    c.on("characteristicvaluechanged", function (event) {
      console.log(
        "->" + String.fromCharCode.apply(null, event.target.value.buffer)
      );
    });
    return c.startNotifications();
  });
