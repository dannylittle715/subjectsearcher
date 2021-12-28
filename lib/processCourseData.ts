import { Course } from '@/interfaces/courses';

export const formatTime = (course: Course) => {
  if (typeof course.meetings.classes[0] === 'undefined')
    return 'Unknown meeting time';
  const timeStr = course.meetings.classes[0].time;
  if (timeStr.includes('TBA')) return 'meetings TBA';

  let formatted = '';
  const timeStrSplit = timeStr.split(' ');
  const [days, start, _, end] = timeStrSplit;
  formatted += days
    .split('')
    .map(l => l.replace('R', 'TH'))
    .join('/');
  formatted += ', ';

  const startNon24Hour = String(
    ((Number(start.substring(0, 2)) + 11) % 12) + 1
  );
  const startMinute =
    start.substring(2) == '00' ? '' : ':' + start.substring(2);
  formatted += startNon24Hour + startMinute + '-';

  const endHour = Number(end.substring(0, 2));
  const endNon24Hour = ((endHour + 11) % 12) + 1;
  const endMinute = end.substring(2) == '00' ? '' : ':' + end.substring(2);
  let suffix = endHour < 12 || end == '2400' ? 'AM' : 'PM';
  formatted += endNon24Hour + endMinute + suffix;
  return formatted;
};

export const trimCourse = (course: Course) => {
  delete course.comment;
  delete course.dept;
  delete course.dept_desc;
  delete course.originnum;
  delete course.originsubj;
  delete course.crosslisting;
  delete course.rules.equivalent;
  delete course.rules.mmrest;
  delete course.rules.coreq;
  delete course.prefmajors;
  delete course.prefminors;
  delete course.addlmajmin;
  const profNames = new Set();
  course.meetings.classes.forEach(class_ => {
    class_.instructors.forEach(instructor => {
      profNames.add(instructor.firstname + ' ' + instructor.lastname);
    });
  });
  course.allprofs = Array.from(profNames).join(', ');
  return course;
};
