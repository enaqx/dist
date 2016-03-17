/**
  * Distributed Data Holder Worker Instance
  */

let dataHolder = {};

process.on('message', msg => {
  if ( msg.type === 'createInt' ) dataHolder[msg.name] = msg.value;
  if ( msg.type === 'getValue' ) {
    process.send({
      type: 'responseGetData',
      name: msg.name,
      uuid: msg.uuid,
      value: dataHolder[msg.name],
    })
  }
  if ( msg.type === 'setValue' ) {
    dataHolder[msg.name] = msg.newValue;
  }
})

setTimeout(null, 100000);
