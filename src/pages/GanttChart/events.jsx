const now = new Date();

export default [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2024, 2, 0),
    end: new Date(2024, 2, 1),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2024, 2, 15),
    end: new Date(2024, 2, 19),
  },

  {
    id: 3,
    title: "Social meetup",
    start: new Date(2024, 2, 22),
    end: new Date(2024, 2, 28),
    desc: "Big conference for important people",
  },
];
