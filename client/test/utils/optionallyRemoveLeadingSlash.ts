import { optionallyRemoveLeadingSlash } from '@/utils/optionallyRemoveLeadingSlash';

describe('optionallyRemoveLeadingSlash', () => {
  test('only removes one leading slash', () => {
    expect(optionallyRemoveLeadingSlash('///')).equals('//');
  });

  test('ignores other characters', () => {
    expect(optionallyRemoveLeadingSlash('abc///')).equals('abc///');
  });
});
