# App Features

## Dispatcher/Driver Task Scheduling App

1. As a dispatcher, you can create new tasks for a specified driver over a 24
   hour / 7 day / 52 week period.

2. A task’s time-interval can be between 1-24 hours, but it cannot extend across
   multiple days.

3. If a new task conflicts with existing task times, you can overwrite the existing conflicting task(s).

### Assumptions: There are only 3 drivers and the timetable will be different for each driver. The dispatcher should be able to select a driver via a dropdown to view their timetable.

## Driver Task Spreadsheet Report

1. As a dispatcher, you can download a .csv file outlining a specific driver’s
   tasks for a given division of time. The valid divisions for which you can generate a driver
   report are 2,4,7,14, and 28 days.

2. If you were to generate a .csv for a certain driver with a selected time-range of 2 days, you
   would expect to see something like the following table if you were to open the .csv in a
   spreadsheet program.

```
Time-Frame Pickup Drop-off Other
Day 1 - Day 3 2 2 1
Day 3 - Day 5 1 3 0
Day 5 - Day 7 2 5 4
```

This report would show that for the first 2 days of the “year”, the specified driver had 2 pickups, 2 drop-offs and
1 other task.

# Bonus Features

## Today button

- I implemented a Today button feature which let's the dispatcher view the current week tasks with ease no matter where they are in the Calendar view.

## Custom svg Calendar

- I have implemented custom svg gradients for tasks and built the Calendar component from scratch.

## Accessibility

- All background colours implemented meet WCAG minimum contrast ratio's for accessibility.

- Usage of Semantic elements over div's whenever possible.

- Limited keyboard support. Couldn't make it 100% keyboard accessible due to time constraints.

## Deployment

- The app has been deployed using Netlify at [https://rose-rocket-code-challenge-summer-2020.netlify.app/](https://rose-rocket-code-challenge-summer-2020.netlify.app/)
