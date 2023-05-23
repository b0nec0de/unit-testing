const unitTestingTask = require('./unitTestingTask');

describe('unitTestingTask', () => {
    describe('leadingZeroes', () => {
        test('should pad single-digit number with leading zero', () => {
            expect(unitTestingTask.leadingZeroes(5)).toBe('05');
        });

        test('should not pad double-digit number', () => {
            expect(unitTestingTask.leadingZeroes(15)).toBe('15');
        });

        test('should pad number with specified length', () => {
            expect(unitTestingTask.leadingZeroes(5, 4)).toBe('0005');
        });

        test('should return string as is if longer than specified length', () => {
            expect(unitTestingTask.leadingZeroes('12345', 3)).toBe('12345');
        });
    });

    describe('format', () => {
        test('should format date in default format', () => {
            const date = new Date(2023, 4, 17, 15, 30, 0);
            expect(unitTestingTask('YYYY-MM-dd HH:mm:ss', date)).toBe(
                '2023-05-17 15:30:00'
            );
        });

        test('should format date with week-based year', () => {
            const date = new Date(2023, 4, 17);
            expect(unitTestingTask('YYYY-MM-dd', date)).toBe('2023-05-17');
        });

        test('should format date with custom format', () => {
            const date = new Date(2023, 4, 17, 15, 30, 0);
            expect(unitTestingTask('MMMM dd, YYYY', date)).toBe('May 17, 2023');
        });

        test('should format date with language support', () => {
            unitTestingTask.lang('en');
            const date = new Date(2023, 4, 17);
            expect(unitTestingTask('MMMM', date)).toBe('May');
        });
    });

    test('should format date with timezone offset', () => {
        const date = new Date(2023, 4, 17);
        expect(unitTestingTask('YYYY-MM-dd HH:mm:ss Z', date)).toMatch(
            /^2023-05-17 00:00:00 [+-]\d{2}:\d{2}$/
        );
    });

    test('should format date with day of the week', () => {
        const date = new Date(2023, 4, 17);
        expect(unitTestingTask('DDD', date)).toBe('Wednesday');
    });

    test('should format year as a full year', () => {
        const date = new Date('2023-05-19');
        expect(unitTestingTask('YYYY', date)).toBe('2023');
    });

    test('should format month as a month name', () => {
        const date = new Date('2023-05-19');
        expect(unitTestingTask('MMMM', date)).toBe('May');
    });

    test('should format date with hour in 12-hour clock format', () => {
        const date = new Date(2023, 4, 17, 15);
        expect(unitTestingTask('hh', date)).toBe('03');
    });

    test('should format date with abbreviated month', () => {
        const date = new Date(2023, 4, 17);
        expect(unitTestingTask('MMM', date)).toBe('May');
    });

    test('should format date with two-digit year', () => {
        const date = new Date(2023, 4, 17);
        expect(unitTestingTask('YY', date)).toBe('23');
    });

    test('should format date with two-digit month', () => {
        const date = new Date(2023, 4, 17);
        expect(unitTestingTask('MM', date)).toBe('05');
    });

    test('should format date with two-digit day', () => {
        const date = new Date(2023, 4, 17);
        expect(unitTestingTask('dd', date)).toBe('17');
    });

    test('should format date with single-digit hour', () => {
        const date = new Date(2023, 4, 17, 5);
        expect(unitTestingTask('H', date)).toBe('5');
    });

    test('should format date with two-digit hour', () => {
        const date = new Date(2023, 4, 17, 15);
        expect(unitTestingTask('HH', date)).toBe('15');
    });

    test('should format date with single-digit minute', () => {
        const date = new Date(2023, 4, 17, 15, 5);
        expect(unitTestingTask('m', date)).toBe('5');
    });

    test('should format date with two-digit minute', () => {
        const date = new Date(2023, 4, 17, 15, 15);
        expect(unitTestingTask('mm', date)).toBe('15');
    });

    test('should format date with single-digit second', () => {
        const date = new Date(2023, 4, 17, 15, 30, 5);
        expect(unitTestingTask('s', date)).toBe('5');
    });

    test('should format date with two-digit second', () => {
        const date = new Date(2023, 4, 17, 15, 30, 15);
        expect(unitTestingTask('ss', date)).toBe('15');
    });

    test('should format date with lowercase meridiem (am/pm)', () => {
        const date = new Date(2023, 4, 17, 8, 30, 0);
        expect(unitTestingTask('YYYY-MM-dd hh:mm:ss a', date)).toBe(
            '2023-05-17 08:30:00 am'
        );
    });

    test('should format date with milliseconds and no leading zeroes', () => {
        const date = new Date(2023, 4, 17, 15, 30, 0, 123);
        expect(unitTestingTask('YYYY-M-d H:m:s.f', date)).toBe(
            '2023-5-17 15:30:0.123'
        );
    });

    test('should format date with timezone offset and colon-separated', () => {
        const date = new Date(2023, 4, 17);
        expect(unitTestingTask('YYYY-MM-dd HH:mm:ss Z', date)).toMatch(
            /^2023-05-17 00:00:00 [+-]\d{2}:\d{2}$/
        );
    });

    test('should format date with a custom separator', () => {
        const date = new Date(2023, 4, 17);
        expect(unitTestingTask('YYYY/MM/dd', date)).toBe('2023/05/17');
    });

    test('should format date with single-digit month and day', () => {
        const date = new Date(2023, 0, 5);
        expect(unitTestingTask('YYYY-M-d', date)).toBe('2023-1-5');
    });

    test('should format date with abbreviated month and day of the week', () => {
        const date = new Date(2023, 4, 17);
        expect(unitTestingTask('MMM, DD', date)).toBe('May, Wed');
    });
});
