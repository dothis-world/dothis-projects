import RelatedWord from './RelatedWord';
import { RelatedWordList } from './style';

const RELATED_WORD_LIST = [
  {
    id: '1',
    rank: 1,
    word: '물냉면물냉면물냉면물냉면물냉면물냉면물냉면',
    views: 10,
    gap: 'UP',
  },
  {
    id: '2',
    rank: 2,
    word: '냉장고',
    views: 1,
    gap: 'DOWN',
  },
  {
    id: '3',
    rank: 3,
    word: '불닭볶음면',
    views: 1,
    gap: 'UP',
  },
  {
    id: '4',
    rank: 4,
    word: '물냉면물냉면물냉면물냉면물냉면물냉면물냉면',
    views: 10,
    gap: 'UP',
  },
  {
    id: '5',
    rank: 5,
    word: '냉장고',
    views: 1,
    gap: 'DOWN',
  },
  {
    id: '6',
    rank: 6,
    word: '불닭볶음면',
    views: 1,
    gap: 'UP',
  },
  {
    id: '7',
    rank: 7,
    word: '물냉면물냉면물냉면물냉면물냉면물냉면물냉면',
    views: 10,
    gap: 'UP',
  },
  {
    id: '8',
    rank: 8,
    word: '냉장고',
    views: 1,
    gap: 'DOWN',
  },
  {
    id: '9',
    rank: 9,
    word: '불닭볶음면',
    views: 1,
    gap: 'UP',
  },
  {
    id: '10',
    rank: 10,
    word: '불닭볶음면',
    views: 1,
    gap: 'UP',
  },
];

function ChartSidebar() {
  return (
    <RelatedWordList>
      {RELATED_WORD_LIST.map((relatedWord) => (
        <RelatedWord key={relatedWord.id} relatedWord={relatedWord} />
      ))}
    </RelatedWordList>
  );
}

export default ChartSidebar;
