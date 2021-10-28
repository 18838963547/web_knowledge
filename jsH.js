function deal() {
    const cards = [];
    for(let i = 0; i < 52; i++) {
      cards.push(i);
    }
    var i = 53
    while(i){
        let j = Math.floor(Math.random()*i--)
        console.log(cards[j])
        [cards[j],cards[i]] = [cards[i],cards[j]]
    }
    // cards.sort((a, b) => (Math.ceil(Math.random() * 52) - 1) - b);
    return [cards.slice(0, 13), cards.slice(13, 26), cards.slice(26, 39), cards.slice(39, 52)];
  }
  console.log(deal());

// var numbers = [4, 2, 5, 1, 3];
// numbers.sort(function(a, b) {
//     console.log(a,b);
//     debugger;
//   return a - b;
// });