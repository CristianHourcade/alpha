var js = {};

js.activatePaypal = function (pack) {

  paypal.Buttons({
    style: {
      size: 'small',
      color: 'blue',
      shape: 'pill',
      label: 'pay',
      layout: 'horizontal'
    },
    createOrder: function (data, actions) {
      // Set up the transaction
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: pack.precio
          }
        }]
      });
    },
    onApprove: function (data, actions) {
      // Capture the funds from the transaction
      return actions.order.capture().then(function (details) {
        console.log(data.orderID);
        var config = {
          apiKey: "AIzaSyA3e2Yjbi1RcHhWntZKtsAe8xFuQC-84uA",
          authDomain: "phalphagolfs.firebaseapp.com",
          databaseURL: "https://phalphagolfs.firebaseio.com",
          projectId: "phalphagolfs",
          storageBucket: "phalphagolfs.appspot.com",
          messagingSenderId: "829520334779"
        };
        firebase.initializeApp(config);
        var database = firebase.database();
        console.log(pack);
        firebase.database().ref('packs/'+pack.$key ).set({
          cantidadFotos:pack.cantidadFotos,
          descripcion:pack.descripcion,
          fecha:pack.fecha,
          fotografo:pack.fotografo,
          fotos:pack.fotos,
          likes:pack.likes,
          modelo:pack.modelo,
          nombrePack:pack.nombrePack,
          portada:pack.portada,
          precio:pack.precio,
          tag:pack.tag,
          usuario:pack.usuario
        });
        // Show a success message to your buyer
        alert('Transaction completed by ' + details.payer.name.given_name);
      });
    }
  }).render('#paypal-button-container')
}

exports.js = js;
