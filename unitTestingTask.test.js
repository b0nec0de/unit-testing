const unitTestingTask = require('./unitTestingTask');

describe('unitTestingTask', () => {
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
        const formattedDate = unitTestingTask('YYYY-MM-dd HH:mm:ss Z', date);
        const regexPattern = /^2023-05-17 00:00:00 ([+-]\d{2}):(\d{2})$/;
        const match = formattedDate.match(regexPattern);

        expect(match).not.toBeNull();

        const offsetHours = parseInt(match[1], 10);
        const offsetMinutes = parseInt(match[2], 10);

        expect(offsetHours).toBeGreaterThanOrEqual(-12);
        expect(offsetHours).toBeLessThanOrEqual(12);

        expect(offsetMinutes).toBeGreaterThanOrEqual(0);
        expect(offsetMinutes).toBeLessThanOrEqual(59);
    });

    //an example of parameterized test case
    const date = new Date(2023, 4, 17);
    it.each([
        [['YYYY', date], '2023'],
        [['YY', date], '23'],
        [['MMMM', date], 'May'],
        [['MMM', date], 'May'],
        [['MM', date], '05'],
        [['M', date], '5'],
        [['dd', date], '17'],
        [['d', date], '17'],
    ])(
        'should format date with two-digit %p expecting %p',
        (period, result) => {
            const format = period[0];
            expect(unitTestingTask(format, date)).toBe(result);
        }
    );

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

    test('should format date with two-digit hour', () => {
        const date = new Date(2023, 4, 17, 15);
        expect(unitTestingTask('HH', date)).toBe('15');
    });

    test('should format date with two-digit minute', () => {
        const date = new Date(2023, 4, 17, 15, 15);
        expect(unitTestingTask('mm', date)).toBe('15');
    });

    test('should format date with two-digit second', () => {
        const date = new Date(2023, 4, 17, 15, 30, 15);
        expect(unitTestingTask('ss', date)).toBe('15');
    });

    test('should format date with single-digit hour', () => {
        const date = new Date(2023, 4, 17, 5);
        expect(unitTestingTask('H', date)).toBe('5');
    });

    test('should format date with single-digit minute', () => {
        const date = new Date(2023, 4, 17, 15, 5);
        expect(unitTestingTask('m', date)).toBe('5');
    });

    test('should format date with single-digit second', () => {
        const date = new Date(2023, 4, 17, 15, 30, 5);
        expect(unitTestingTask('s', date)).toBe('5');
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
