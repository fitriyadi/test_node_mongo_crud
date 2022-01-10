/**
 * Direction:
 * Find all fields that have different value & must can detect all field dynamically
 *
 * Expected Result:
 * ['firstName', 'lastName']
 *
 */
 const data = [
    { firstName: 'Adi', lastName: 'Nugroho', age: 25},
    { firstName: 'Deddy', lastName: 'Dores', age: 25},
  ];
  
  function result(data) {
    let hasil=[];
    dataawal=data;
    //Loop to search object name
    data.forEach(element => {
        //Save to variabel
        keydata=Object.keys(element);
        //Loop every object name element
        keydata.forEach(newelement => {
            databaru= [...new Map(dataawal.map(item => [item[newelement], item])).values()]
            //Cek date value
            if(databaru.length==dataawal.length){
                if (hasil.includes(newelement)==false){
                    //Save Object name without duplicat
                    hasil.push(newelement);
                }   
            }
        });      
    });
    return hasil;
  }
  
  console.log(result(data));
