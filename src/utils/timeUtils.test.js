import { formatRelativeTime } from './timeUtils';

describe('timeUtils', () => {
  describe('formatRelativeTime', () => {
    const mockNow = new Date('2023-12-15T12:00:00Z').getTime();

    beforeEach(() => {
      // Mock Date.now() to have a consistent reference point
      jest.spyOn(Date, 'now').mockReturnValue(mockNow);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('should return "Today" for timestamps from today', () => {
      const todayMorning = mockNow - (4 * 60 * 60 * 1000); // 4 hours ago
      const todayEvening = mockNow + (8 * 60 * 60 * 1000); // 8 hours in the future
      
      expect(formatRelativeTime(todayMorning)).toBe('Today');
      expect(formatRelativeTime(todayEvening)).toBe('Today');
    });

    test('should return "a day ago" for timestamps from yesterday', () => {
      const yesterday = mockNow - (24 * 60 * 60 * 1000); // 24 hours ago
      
      expect(formatRelativeTime(yesterday)).toBe('a day ago');
    });

    test('should return "X days ago" for timestamps from 2-6 days ago', () => {
      const twoDaysAgo = mockNow - (2 * 24 * 60 * 60 * 1000);
      const threeDaysAgo = mockNow - (3 * 24 * 60 * 60 * 1000);
      const sixDaysAgo = mockNow - (6 * 24 * 60 * 60 * 1000);
      
      expect(formatRelativeTime(twoDaysAgo)).toBe('2 days ago');
      expect(formatRelativeTime(threeDaysAgo)).toBe('3 days ago');
      expect(formatRelativeTime(sixDaysAgo)).toBe('6 days ago');
    });

    test('should return "a week ago" for timestamps from exactly 7 days ago', () => {
      const oneWeekAgo = mockNow - (7 * 24 * 60 * 60 * 1000);
      
      expect(formatRelativeTime(oneWeekAgo)).toBe('a week ago');
    });

    test('should return "X weeks ago" for timestamps from 2-4 weeks ago', () => {
      const twoWeeksAgo = mockNow - (14 * 24 * 60 * 60 * 1000);
      const threeWeeksAgo = mockNow - (21 * 24 * 60 * 60 * 1000);
      
      expect(formatRelativeTime(twoWeeksAgo)).toBe('2 weeks ago');
      expect(formatRelativeTime(threeWeeksAgo)).toBe('3 weeks ago');
    });

    test('should return "a month ago" for timestamps from approximately 30 days ago', () => {
      const oneMonthAgo = mockNow - (30 * 24 * 60 * 60 * 1000);
      
      expect(formatRelativeTime(oneMonthAgo)).toBe('a month ago');
    });

    test('should return "X months ago" for timestamps from 2-11 months ago', () => {
      const twoMonthsAgo = mockNow - (60 * 24 * 60 * 60 * 1000);
      const sixMonthsAgo = mockNow - (180 * 24 * 60 * 60 * 1000);
      
      expect(formatRelativeTime(twoMonthsAgo)).toBe('2 months ago');
      expect(formatRelativeTime(sixMonthsAgo)).toBe('6 months ago');
    });

    test('should return "a year ago" for timestamps from approximately 365 days ago', () => {
      const oneYearAgo = mockNow - (365 * 24 * 60 * 60 * 1000);
      
      expect(formatRelativeTime(oneYearAgo)).toBe('a year ago');
    });

    test('should return "X years ago" for timestamps from multiple years ago', () => {
      const twoYearsAgo = mockNow - (2 * 365 * 24 * 60 * 60 * 1000);
      const fiveYearsAgo = mockNow - (5 * 365 * 24 * 60 * 60 * 1000);
      
      expect(formatRelativeTime(twoYearsAgo)).toBe('2 years ago');
      expect(formatRelativeTime(fiveYearsAgo)).toBe('5 years ago');
    });

    test('should handle edge cases correctly', () => {
      // Test with current timestamp (should be "Today")
      expect(formatRelativeTime(mockNow)).toBe('Today');
      
      // Test with timestamp slightly in the future (should still be "Today")
      const slightlyFuture = mockNow + 1000; // 1 second in the future
      expect(formatRelativeTime(slightlyFuture)).toBe('Today');
    });

    test('should handle boundary conditions', () => {
      // Test exactly at the boundary between days and weeks
      const sevenDaysAgo = mockNow - (7 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(sevenDaysAgo)).toBe('a week ago');
      
      // Test exactly at the boundary between weeks and months
      const thirtyDaysAgo = mockNow - (30 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(thirtyDaysAgo)).toBe('a month ago');
      
      // Test exactly at the boundary between months and years
      const threeHundredSixtyFiveDaysAgo = mockNow - (365 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(threeHundredSixtyFiveDaysAgo)).toBe('a year ago');
    });
  });
});
