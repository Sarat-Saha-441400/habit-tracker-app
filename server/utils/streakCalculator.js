// server/utils/streakCalculator.js

/**
 * Calculates the current consecutive streak (in days) for a habit.
 * * @param {Date[]} completedDates - An array of Date objects representing completion days.
 * @returns {number} The length of the current consecutive streak.
 */
const calculateStreak = (completedDates) => {
    if (!completedDates || completedDates.length === 0) {
        return 0;
    }

    // 1. Clean and Prepare Dates
    // Convert Dates to YYYY-MM-DD strings to ignore time for accurate day comparison.
    const uniqueCompletionDays = [
        ...new Set(completedDates.map(date => date.toISOString().slice(0, 10)))
    ].sort(); // Sort chronologically (important for iteration)

    let currentStreak = 0;
    
    // Get today's date and yesterday's date in YYYY-MM-DD format
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todayString = today.toISOString().slice(0, 10);
    const yesterdayString = yesterday.toISOString().slice(0, 10);

    // 2. Check Starting Point: Streak must include today or yesterday (or both).
    // If the habit wasn't done today or yesterday, the streak is broken.
    const isCompletedToday = uniqueCompletionDays.includes(todayString);
    const isCompletedYesterday = uniqueCompletionDays.includes(yesterdayString);

    if (!isCompletedToday && !isCompletedYesterday) {
        return 0;
    }

    // If completed today, the streak starts at 1
    if (isCompletedToday) {
        currentStreak = 1;
    }
    // If completed yesterday but NOT today, the streak starts at 1 (but we must check the day before)
    else if (isCompletedYesterday) {
        currentStreak = 1;
    }


    // 3. Iterate Backwards from the most recent completed day
    // We check against the last date in the uniqueCompletionDays array.
    for (let i = uniqueCompletionDays.length - 1; i >= 0; i--) {
        const currentDateStr = uniqueCompletionDays[i];
        
        // Skip the very last one as it was handled in step 2 (start of streak check)
        // If we are checking the day before the last recorded day, 
        // we start checking for the consecutive sequence.

        if (i === uniqueCompletionDays.length - 1) {
            continue; // Skip the most recent day if it's today/yesterday
        }


        const previousDateStr = uniqueCompletionDays[i + 1];

        // Create Date objects from strings for comparison
        const currentDate = new Date(currentDateStr);
        const previousDate = new Date(previousDateStr);
        
        // Calculate the difference in days between the two consecutive completions
        const timeDifference = previousDate.getTime() - currentDate.getTime();
        const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
        
        // If the days are consecutive (difference is exactly 1 day)
        if (dayDifference === 1) {
            currentStreak++;
        } else if (dayDifference > 1) {
            // Gap found, streak is broken
            break;
        }
        // If dayDifference is 0, it means the sorting created a duplicate (should be handled by Set) or an issue, so we continue.
    }
    
    // A more robust check might involve iterating backward from today/yesterday 
    // and querying the array to see if the day before exists, ensuring perfect concurrency.
    
    return currentStreak;
};

module.exports = { calculateStreak };