/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 8. Poker. OOP
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 09/04/2020
 *  @desc Implementación del código que realizará las pruebas unitarias del código.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101132020
 *
 *  @file Fichero de tests unitarios del código.
 *
 *  @version  09/04/2020 - Creación (primera versión) del código.
 */

'use strict';

describe('Ranks and suits', () => {
  const rank = new Ranks('8');
  const suit = new Suits('Spades');
  it ('should return rank 8 of the rank', () => {
    expect(rank.toString()).to.equal('8');
  });
  it ('should return value of the rank', () => {
    expect(rank.value).to.equal(7);
  });
  it ('should return suit spades of the rank', () => {
    expect(suit.toString()).to.equal('Spades');
  });
  it ('should return value of the suit', () => {
    expect(suit.value).to.equal(3);
  });
  it ('should return undefined suit', () => {
    expect((new Suits('picas'))._suit).to.equal('UNDEFINED SUIT');
  });
  it ('should return undefined rank', () => {
    expect((new Ranks('L'))._rank).to.equal('UNDEFINED RANK');
  });
});

describe('Cards', () => {
  const myCard = new Card;
  describe('consctructing a card', () => {
    it('should create a card with default rank of 2', () => {
      expect(myCard.rank).to.equal('2');
    });
    it('should create a card with default suit of clubs', () => {
      expect(myCard.suit).to.equal('Clubs');
    });
  });
  describe('printing a card', () => {
    it('should print properly a card as \'2 of Clubs\'', () => {
      expect(myCard.toString()).to.equal('2 of Clubs');
    });
  });

  const aceOfSpades = new Card('Spades', 'Ace');
  const twoOfDiamonds = new Card('diamonds', '2');
  describe('comparing cards', () => {
    it('should say that both cards are not the same', () => {
      expect(aceOfSpades !== twoOfDiamonds).to.equal(true);
    });
    it('should say that the first one is higher value than the second', () => {
      expect(aceOfSpades > twoOfDiamonds).to.equal(true);
    });
  });
});

describe('Deck', () => {
  const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
  const RANKS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
  it('building our SetOfCards. Expecting it to have 52 elements.', () => {
    const mySetOfCards = new Deck(SUITS, RANKS).getSetOfCards();
    expect(mySetOfCards.length).to.equal(52);
  });
  it('printing our SetOfCards', () => {
    const mySetOfCards = new Deck(SUITS, RANKS);
    expect(console.log(mySetOfCards.getSetOfCards())).to.equal(mySetOfCards.printSetOfCards());
  });
  it('extracting a card. Should leave 51 elements.', () => {
    let mySetOfCards = new Deck(SUITS, RANKS);
    mySetOfCards.popCard();
    expect(mySetOfCards.getSetOfCards().length).to.equal(51);
  });
  it('extracting a card and then adding it. Should leave 52 elements.', () => {
    let mySetOfCards = new Deck(SUITS, RANKS);
    mySetOfCards.popCard();
    mySetOfCards.addCard(new Card('Spades', 'Ace'));
    expect(mySetOfCards.getSetOfCards().length).to.equal(52);
  });
  it('shuffling the SetOfCards', () => {
    let mySetOfCards = new Deck(SUITS, RANKS);
    mySetOfCards.shuffle();
    expect(mySetOfCards.getSetOfCards()[0]).to.not.equal('Ace of clubs');
  });
  it('ordering function', () => {
    const aceOfSpades = new Card('Spades', 'Ace');
    const twoOfDiamonds = new Card('diamonds', '2');
    let mySetOfCards = new Deck([], []);
    expect(mySetOfCards.sortFunction(aceOfSpades, twoOfDiamonds)).to.equal(1);
    expect(mySetOfCards.sortFunction(1, 1)).to.equal(0);
  });
  it('ordering the SetOfCards', () => {
    let mySetOfCards = new Deck(SUITS, RANKS);
    let comparingSetOfCards = new Deck(SUITS, RANKS);
    mySetOfCards.shuffle();
    mySetOfCards.sort();
    expect(mySetOfCards.printSetOfCards()).to.equal(comparingSetOfCards.printSetOfCards());
  });
  it('ordering the SetOfCards by ranks', () => {
    let mySetOfCards = new Deck(SUITS, RANKS);
    mySetOfCards.addCard(new Card('Spades', 'Ace'));
    mySetOfCards.shuffle();
    mySetOfCards.sortByRank();
    mySetOfCards.printSetOfCards();
  });
});

describe('Hand', () => {
  const handExample = new Hand('new Hand');
  it ('getting label of a card', () => {
    expect(handExample.label).to.equal('new Hand');
  });
  it('the cards array should not have elements', () => {
    expect(handExample.cards.length).to.equal([].length);
  })
});

describe('moveCards', () => {
  it('move cards with no errors', () => {
    const aceOfSpades = new Card('Spades', 'Ace');
    const twoOfDiamonds = new Card('diamonds', '2');
    const handOne = new Hand('new Hand');
    const handTwo = new Hand('new Hand');
    handOne.addCard(aceOfSpades);
    handOne.addCard(twoOfDiamonds);
    handOne.printSetOfCards;
    handOne.moveCards(handTwo, 2);

    expect(handTwo.cards.length).to.equal(2);
  });
  it('trying to move more cards than possible', () => {
    const aceOfSpades = new Card('Spades', 'Ace');
    const twoOfDiamonds = new Card('diamonds', '2');
    const handOne = new Hand('new Hand');
    const handTwo = new Hand('new Hand');
    handOne.addCard(aceOfSpades);
    handOne.addCard(twoOfDiamonds);
    handOne.printSetOfCards;
    handOne.moveCards(handTwo, 3);

    expect(handTwo.cards.length).to.equal(0);
  });
  it('moving from deck to a hand', () => {
    const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
    const RANKS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    const mySetOfCards = new Deck(SUITS, RANKS);
    const handOne = new Hand('new Hand');
    mySetOfCards.moveCards(handOne, 10);
    expect(handOne.cards.length).to.equal(10);
  });
});

describe('dealHands', () => {
  it('should return an array of 2 hands.', () => {
    const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
    const RANKS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    const mySetOfCards = new Deck(SUITS, RANKS);
    expect(mySetOfCards.dealHands(2, 7).length).to.equal(2);
  });
  it('should leave 38 cards remaining on the deck.', () => {
    const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
    const RANKS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    const mySetOfCards = new Deck(SUITS, RANKS);
    mySetOfCards.dealHands(2, 7);
    expect(mySetOfCards.cards.length).to.equal(38);
  });
});

describe('Poker-hand', () => {
  describe('hasPair', () => {
    it('should return true.', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const acefDiamonds = new Card('diamonds', 'Ace');
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(acefDiamonds);
      expect(myPokerHand.hasPair()).to.equal(true);
    });
    it('should return false.', () => {
      const myPokerHand = new PokerHand('example');
      const twoOfSpades = new Card('Spades', '2');
      const acefDiamonds = new Card('diamonds', 'Ace');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(acefDiamonds);
      expect(myPokerHand.hasPair()).to.equal(false);
    });
  });
  describe('hasTwoPair', () => {
    it('should return true.', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const acefDiamonds = new Card('diamonds', 'Ace');
      const twoOfSpades = new Card('Spades', '2');
      const twoOfDiamonds = new Card('diamonds', '2');
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(acefDiamonds);
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(twoOfDiamonds);
      expect(myPokerHand.hasTwoPair()).to.equal(true);
    });
    it('should return false because of not second pair.', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const acefDiamonds = new Card('diamonds', 'Ace');
      const twoOfSpades = new Card('Clubs', 'Ace');
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(acefDiamonds);
      myPokerHand.addCard(twoOfSpades);
      expect(myPokerHand.hasTwoPair()).to.equal(false);
    });
    it('should return false because of not first pair.', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twofDiamonds = new Card('diamonds', '2');
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(twofDiamonds);
      expect(myPokerHand.hasTwoPair()).to.equal(false);
    });
  });
  describe('hasThreeOfAKind', () => {
    it('should return true.', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const acefDiamonds = new Card('diamonds', 'Ace');
      const aceOfClubs = new Card('Clubs', 'Ace');
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(acefDiamonds);
      myPokerHand.addCard(aceOfClubs);
      expect(myPokerHand.hasThreeOfAKind()).to.equal(true);
    });
    it('should return false.', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twoOfDiamonds = new Card('diamonds', '2');
      const AceOfSpades = new Card('Clubs', 'Ace');
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(twoOfDiamonds);
      myPokerHand.addCard(AceOfSpades);
      expect(myPokerHand.hasThreeOfAKind()).to.equal(false);
    });
  });
  describe('hasStraight',  () => {
    it('should return true', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twoOfDiamonds = new Card('diamonds', '2');
      const threeOfClubs = new Card('Clubs', '3');
      const fourOfSpades = new Card('spades', '4');
      const fiveOfHearts = new Card('hearts', '5');
      myPokerHand.addCard(fourOfSpades);
      myPokerHand.addCard(fiveOfHearts);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(twoOfDiamonds);
      myPokerHand.addCard(threeOfClubs);
      expect(myPokerHand.hasStraight()).to.equal(true);
    });
    it('should return false', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const threeOfClubs = new Card('Clubs', '3');
      const fourOfSpades = new Card('spades', '4');
      const fiveOfHearts = new Card('hearts', '5');
      myPokerHand.addCard(fourOfSpades);
      myPokerHand.addCard(fiveOfHearts);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(threeOfClubs);
      expect(myPokerHand.hasStraight()).to.equal(false);
    });
    it('should return true', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const kingOfClubs = new Card('Clubs', 'King');
      const jokerOfSpades = new Card('spades', 'Jack');
      const queenOfHearts = new Card('hearts', 'Queen');
      const tenOfHearts = new Card('hearts', '10');
      myPokerHand.addCard(kingOfClubs);
      myPokerHand.addCard(jokerOfSpades);
      myPokerHand.addCard(queenOfHearts);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(tenOfHearts);
      expect(myPokerHand.hasStraight()).to.equal(true);
    });
  });
  describe('hasFlush',  () => {
    it('should return true', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twoOfSpades = new Card('Spades', '2');
      const threeOfSpades = new Card('Spades', '3');
      const fourOfSpades = new Card('Spades', '4');
      const fiveOfSpades = new Card('Spades', '5');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(fiveOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(threeOfSpades);
      myPokerHand.addCard(fourOfSpades);
      expect(myPokerHand.hasFlush()).to.equal(true);
    });
    it('should return false', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twoOfSpades = new Card('Spades', '2');
      const fourOfSpades = new Card('Spades', '4');
      const fiveOfSpades = new Card('Spades', '5');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(fiveOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(fourOfSpades);
      expect(myPokerHand.hasFlush()).to.equal(false);
    });
    it('should return true', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfClubs = new Card('Clubs', 'Ace');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twoOfSpades = new Card('Spades', '2');
      const threeOfSpades = new Card('Spades', '3');
      const fourOfSpades = new Card('Spades', '4');
      const fiveOfSpades = new Card('Spades', '5');
      myPokerHand.addCard(aceOfClubs);
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(fiveOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(threeOfSpades);
      myPokerHand.addCard(fourOfSpades);
      expect(myPokerHand.hasFlush()).to.equal(true);
    });
  });
  describe('hasFullHouse',  () => {
    it('should return true', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twoOfSpades = new Card('Spades', 'Ace');
      const threeOfSpades = new Card('Spades', '3');
      const fourOfSpades = new Card('Spades', '3');
      const fiveOfSpades = new Card('Spades', '3');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(fiveOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(threeOfSpades);
      myPokerHand.addCard(fourOfSpades);
      expect(myPokerHand.hasFullHouse()).to.equal(true);
    });
    it('should return false', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const threeOfSpades = new Card('Spades', '3');
      const fourOfSpades = new Card('Spades', '3');
      const fiveOfSpades = new Card('Spades', '3');
      myPokerHand.addCard(fiveOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(threeOfSpades);
      myPokerHand.addCard(fourOfSpades);
      expect(myPokerHand.hasFullHouse()).to.equal(false);
    });
    it('should return false', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const fourOfSpades = new Card('Spades', '3');
      const fiveOfSpades = new Card('Spades', '3');
      myPokerHand.addCard(fiveOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(fourOfSpades);
      expect(myPokerHand.hasFullHouse()).to.equal(false);
    });
  });
  describe('hasFourOfAKind',  () => {
    it('should return true', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twoOfSpades = new Card('Spades', '3');
      const threeOfSpades = new Card('Spades', '3');
      const fourOfSpades = new Card('Spades', '3');
      const fiveOfSpades = new Card('Spades', '3');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(fiveOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(threeOfSpades);
      myPokerHand.addCard(fourOfSpades);
      expect(myPokerHand.hasFourOfAKind()).to.equal(true);
    });
    it('should return false', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twoOfSpades = new Card('Spades', '4');
      const threeOfSpades = new Card('Spades', '3');
      const fourOfSpades = new Card('Spades', '3');
      const fiveOfSpades = new Card('Spades', '3');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(fiveOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(threeOfSpades);
      myPokerHand.addCard(fourOfSpades);
      expect(myPokerHand.hasFourOfAKind()).to.equal(false);
    });
  });
  describe('hasStraightFlush',  () => {
    it('should return true', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twoOfSpades = new Card('Spades', '2');
      const threeOfSpades = new Card('Spades', '3');
      const fourOfSpades = new Card('Spades', '4');
      const fiveOfSpades = new Card('Spades', '5');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(fiveOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(threeOfSpades);
      myPokerHand.addCard(fourOfSpades);
      expect(myPokerHand.hasStraightFlush()).to.equal(true);
    });
    it('should return false', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twoOfSpades = new Card('Spades', '2');
      const threeOfSpades = new Card('Clubs', '3');
      const fourOfSpades = new Card('Spades', '4');
      const fiveOfSpades = new Card('Spades', '5');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(fiveOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(threeOfSpades);
      myPokerHand.addCard(fourOfSpades);
      expect(myPokerHand.hasStraightFlush()).to.equal(false);
    });
    it('should return true', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const tenOfSpades = new Card('Spades', '10');
      const jackOfSpades = new Card('Spades', 'Jack');
      const queenOfSpades = new Card('Spades', 'Queen');
      const kingOfSpades = new Card('Spades', 'King');
      myPokerHand.addCard(tenOfSpades);
      myPokerHand.addCard(kingOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(jackOfSpades);
      myPokerHand.addCard(queenOfSpades);
      expect(myPokerHand.hasStraightFlush()).to.equal(true);
    });
  });
  describe('classify', () => {
    it('classify Straight Flush', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const tenOfSpades = new Card('Spades', '10');
      const jackOfSpades = new Card('Spades', 'Jack');
      const queenOfSpades = new Card('Spades', 'Queen');
      const kingOfSpades = new Card('Spades', 'King');
      myPokerHand.addCard(tenOfSpades);
      myPokerHand.addCard(kingOfSpades);
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(jackOfSpades);
      myPokerHand.addCard(queenOfSpades);
      myPokerHand.classify();
      expect(myPokerHand._label).to.equal('Straight Flush');
    });
    it('classify Four Of A Kind', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const aceOfHearts = new Card('Hearts', 'Ace');
      const aceOfDiamonds = new Card('Diamonds', 'Ace');
      const aceOfClubs = new Card('Clubs', 'Ace');
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(aceOfDiamonds);
      myPokerHand.addCard(aceOfHearts);
      myPokerHand.addCard(aceOfClubs);
      myPokerHand.classify();
      expect(myPokerHand._label).to.equal('Four Of A Kind');
    });
    it('classify Full House', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const aceOfHearts = new Card('Hearts', 'Ace');
      const twoOfDiamonds = new Card('Diamonds', '2');
      const twoOfClubs = new Card('Clubs', '2');
      const twoOfHearts = new Card('Hearts', '2');
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(twoOfDiamonds);
      myPokerHand.addCard(aceOfHearts);
      myPokerHand.addCard(twoOfClubs);
      myPokerHand.addCard(twoOfHearts);
      myPokerHand.classify();
      expect(myPokerHand._label).to.equal('Full House');
    });
    it('classify Flush', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const sevenOfSpades = new Card('Spades', '7');
      const nineOfSpades = new Card('Spades', '9');
      const tenOfSpades = new Card('Spades', '10');
      const kingOfSpades = new Card('Spades', 'King');
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(sevenOfSpades);
      myPokerHand.addCard(nineOfSpades);
      myPokerHand.addCard(tenOfSpades);
      myPokerHand.addCard(kingOfSpades);
      myPokerHand.classify();
      expect(myPokerHand._label).to.equal('Flush');
    });
    it('classify Straight', () => {
      const myPokerHand = new PokerHand('example');
      const aceOfSpades = new Card('Spades', 'Ace');
      const twoOfHearts = new Card('Hearts', '2');
      const threeOfDiamonds = new Card('Diamonds', '3');
      const fourOfClubs = new Card('Clubs', '4');
      const fiveOfDiamons = new Card('Diamonds', '5');
      myPokerHand.addCard(aceOfSpades);
      myPokerHand.addCard(twoOfHearts);
      myPokerHand.addCard(threeOfDiamonds);
      myPokerHand.addCard(fourOfClubs);
      myPokerHand.addCard(fiveOfDiamons);
      myPokerHand.classify();
      expect(myPokerHand._label).to.equal('Straight');
    });
    it('classify Three Of A Kind', () => {
      const myPokerHand = new PokerHand('example');
      const twoOfSpades = new Card('Spades', '2');
      const twoOfHearts = new Card('Hearts', '2');
      const twoOfDiamonds = new Card('Diamonds', '2');
      const fourOfClubs = new Card('Clubs', '4');
      const fiveOfDiamons = new Card('Diamonds', '5');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(twoOfHearts);
      myPokerHand.addCard(twoOfDiamonds);
      myPokerHand.addCard(fourOfClubs);
      myPokerHand.addCard(fiveOfDiamons);
      myPokerHand.classify();
      expect(myPokerHand._label).to.equal('Three Of A Kind');
    });
    it('classify Two Pairs', () => {
      const myPokerHand = new PokerHand('example');
      const twoOfSpades = new Card('Spades', '2');
      const twoOfHearts = new Card('Hearts', '2');
      const fourOfDiamonds = new Card('Diamonds', '4');
      const fourOfClubs = new Card('Clubs', '4');
      const fiveOfDiamons = new Card('Diamonds', '5');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(twoOfHearts);
      myPokerHand.addCard(fourOfDiamonds);
      myPokerHand.addCard(fourOfClubs);
      myPokerHand.addCard(fiveOfDiamons);
      myPokerHand.classify();
      expect(myPokerHand._label).to.equal('Two Pair');
    });
    it('classify Pair', () => {
      const myPokerHand = new PokerHand('example');
      const twoOfSpades = new Card('Spades', '2');
      const twoOfHearts = new Card('Hearts', '2');
      const threeOfDiamonds = new Card('Diamonds', '3');
      const fourOfClubs = new Card('Clubs', '4');
      const fiveOfDiamons = new Card('Diamonds', '5');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(twoOfHearts);
      myPokerHand.addCard(threeOfDiamonds);
      myPokerHand.addCard(fourOfClubs);
      myPokerHand.addCard(fiveOfDiamons);
      myPokerHand.classify();
      expect(myPokerHand._label).to.equal('Pair');
    });
    it('classify High Card', () => {
      const myPokerHand = new PokerHand('example');
      const twoOfSpades = new Card('Spades', '2');
      const threeOfDiamonds = new Card('Diamonds', '3');
      const fourOfClubs = new Card('Clubs', '4');
      const fiveOfDiamons = new Card('Diamonds', '5');
      myPokerHand.addCard(twoOfSpades);
      myPokerHand.addCard(threeOfDiamonds);
      myPokerHand.addCard(fourOfClubs);
      myPokerHand.addCard(fiveOfDiamons);
      myPokerHand.classify();
      expect(myPokerHand._label).to.equal('High Card');
    });
  });
});

