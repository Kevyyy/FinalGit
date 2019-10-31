var data = [{ id: 0, name: 'A' }, { id: 1, name: 'A' }, { id: 2, name: 'C' }, { id: 3, name: 'B' }, { id: 4, name: 'B' }];

var countList = data.reduce(function(p, c){
    console.log((p[c.name] || 0) + 1)
  p[c.name] = (p[c.name] || 0) + 1;
  return p;
}, {});

var result = data.filter(function(obj){
    console.log("what is obj",obj)
  return countList[obj.name] > 1;
});

console.log(result);