import {MouseEvent, useState} from 'react';
import { Course } from '@/interfaces/courses';
import styles from '@/styles/coursesSplitView.module.css';
import { formatProfName, formatTime } from '@/lib/processCourseData';

interface Props {
  course: Course;
  handleListClick: (course: Course) => void;
}


export const CourseListItem = ({ course, handleListClick }: Props) => {
  const [starred, setStarred] = useState(false)

  const handleStarClick = (e: MouseEvent<HTMLElement>) => {
    setStarred(!starred)
  }

  return (
    <li className='course-listitem' >
      <p className='course-title'>
        <span className={`star ${starred? 'starred' : ''}`} onClick={handleStarClick}>{`★ `}</span>
        <span onClick={() => handleListClick(course)} className='underlineable'>
        {course.title} {course.sect !== "0" ? ` (${course.sect})` : ''}
        <br />
        {course.subj_desc + ' ' + course.num + ', ' + formatProfName(course) + '. '}
        {formatTime(course)}
        </span>
      </p>
    </li>
  );
};
