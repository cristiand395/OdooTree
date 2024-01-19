import * as xml2js from 'xml2js';

export default function ParseXML(xmlString: string) {
  xml2js.parseString(xmlString, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      // Accede a la estructura resultante para obtener los valores de 'id'
      const records = result.odoo.data[0].record;
      const ids: string[] = [];
      if (records && Array.isArray(records)) {
        records.forEach(record => {
          const id = record.$.id; // Obtiene el valor del atributo 'id'
          console.log(typeof (id));
          ids.push(id);
          console.log(`ID del record: ${id}`);
        });
      }
      console.log(`${typeof (ids)} - IDs encontrados: ${ids}`);
      return ids;
    }
  });
}