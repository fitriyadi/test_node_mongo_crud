// Question
// Given a object data, return the data multiple by 3 and sort the data.
// Expected output : { j: 0, k: 9, i: 18, l: 36 }

const data = { i: 6, j: null, k: 3, l: 12 };

function result(data) {
  const sortable = Object.entries(data)
    //Sort
    .sort(([,a],[,b]) => a-b)
    //Multiply..
    .reduce((r, [k, v]) => ({ ...r, [k]: v*3 }), {});
    
   return sortable;
}

console.log(result(data));