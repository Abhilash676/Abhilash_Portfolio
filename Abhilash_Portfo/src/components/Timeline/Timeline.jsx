import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import {
  HiAcademicCap, HiComputerDesktop, HiCodeBracket,
  HiCheckBadge, HiBookOpen, HiArrowTopRightOnSquare,
  HiClock, HiLightBulb,
} from 'react-icons/hi2';
import './Timeline.css';

/* ─────────────────────────────────────────────────────────────
   EDUCATION DATA
   `course`  → shown always (duration + focus chips)
   `points`  → shown on expand
   `extra`   → shown on expand (italic note)
   `link`    → shown on expand
───────────────────────────────────────────────────────────── */
const TIMELINE = [
  {
    id: 1,
    era: '2008 – 2020',
    phase: 'School',
    title: 'Harsha Kalpatharu School',
    sub: 'Halebeedu, Hassan',
    label: '1st – 10th Grade',
    icon: HiBookOpen,
    color: '#A8B2C4',
    tag: 'Foundation',
    summary: 'Completed primary and secondary education with a strong academic foundation.',
    points: [
      'Completed SSLC (10th Standard)',
      'Built strong fundamentals in Mathematics and Science',
      'Developed communication and teamwork skills',
    ],
  },
  {
    id: 2,
    era: '2020 – 2022',
    phase: 'Pre-University',
    title: 'Sujala PU College',
    sub: 'Hassan, Karnataka',
    label: 'PUC – Science',
    icon: HiComputerDesktop,
    color: '#E8C87A',
    tag: 'PUC',
    summary: 'Completed Pre-University education with Science stream.',
    course: {
      duration: '2 Years',
      name: 'Science',
      focus: ['Computer Science', 'Physics', 'Chemistry', 'Mathematics'],
    },
    points: [
      'Completed 1st & 2nd PUC',
      'Studied Computer Science',
      'Strengthened logical thinking and problem-solving',
    ],
  },
  {
    id: 3,
    era: '2022 – 2026',
    phase: 'Engineering',
    title: 'Government Engineering College',
    sub: 'Hassan, Karnataka',
    label: 'B.E. Computer Science Engineering',
    icon: HiAcademicCap,
    color: '#C9A84C',
    tag: 'CSE',
    summary: 'Pursuing Computer Science Engineering with focus on software development and AI.',
    course: {
      duration: '4 Years',
      name: 'B.E. Computer Science Engineering',
      focus: ['DSA', 'DBMS', 'Operating Systems', 'Web Development'],
    },
    points: [
      'Bachelor of Engineering in Computer Science',
      'Built MERN Stack projects',
      'Learned Data Structures and Algorithms',
      'Worked on AI-based applications',
      'Completed Final Year Project',
    ],
    current: true,
  },
  {
    id: 4,
    era: '2025 – Present',
    phase: 'Professional Learning',
    title: 'NxtWave CCBP 4.0',
    sub: 'Full Stack Development',
    label: 'MERN Stack',
    icon: HiCodeBracket,
    color: '#61DAFB',
    tag: 'Full Stack',
    summary: 'Learning industry-ready Full Stack Development and building real-world projects.',
    course: {
      duration: 'Ongoing',
      name: 'MERN Stack Development',
      focus: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    },
    points: [
      'Built AI Mock Interview Platform',
      'Developed Portfolio Website',
      'Practicing DSA regularly',
      'Preparing for Software Engineer interviews',
    ],
    link: 'https://github.com/Abhilash676',
    current: true,
  },
];

/* ─────────────────────────────────────────────────────────────
   FLOW PATH — animated SVG connector between cards (desktop)
───────────────────────────────────────────────────────────── */
const FlowPath = () => (
  <div className="tl-flow-wrap" aria-hidden>
    <svg className="tl-flow-svg" viewBox="0 0 900 40" preserveAspectRatio="none">
      {/* Base track */}
      <path d="M 20 20 Q 225 20 450 20 Q 675 20 880 20"
        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
      {/* Animated gold line */}
      <motion.path
        d="M 20 20 Q 225 20 450 20 Q 675 20 880 20"
        fill="none"
        stroke="url(#flow-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Dot markers */}
      {[10, 235, 462, 688].map((cx, i) => (
        <motion.circle
          key={i}
          cx={cx} cy="20" r="5"
          fill={TIMELINE[i].color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 + i * 0.18, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 5px ${TIMELINE[i].color}90)` }}
        />
      ))}
      <defs>
        <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#A8B2C4" stopOpacity="0.6"/>
          <stop offset="33%"  stopColor="#E8C87A" stopOpacity="0.7"/>
          <stop offset="66%"  stopColor="#C9A84C" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#61DAFB" stopOpacity="0.7"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   SINGLE CARD
───────────────────────────────────────────────────────────── */
const TLCard = ({ item, index, active, onSelect }) => {
  const isActive = active === item.id;
  const Icon     = item.icon;

  return (
    <motion.div
      className={`tl-card ${isActive ? 'tl-card--active' : ''}`}
      style={{ '--cc': item.color }}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(isActive ? null : item.id)}
      whileHover={{ y: isActive ? -4 : -5 }}
    >
      {/* Left accent bar */}
      <div className="tl-accent" style={{ background: item.color }} />

      {/* Header row */}
      <div className="tl-head">
        <div className="tl-icon" style={{ background: `${item.color}18`, border: `1px solid ${item.color}35` }}>
          <Icon style={{ color: item.color, width: 20, height: 20 }} />
        </div>
        <div className="tl-head-right">
          <span className="tl-era">{item.era}</span>
          {item.current && (
            <span className="tl-live">
              <span className="tl-live-dot" />
              Active
            </span>
          )}
        </div>
      </div>

      {/* Phase + title */}
      <div className="tl-phase" style={{ color: item.color }}>{item.phase}</div>
      <div className="tl-title">{item.title}</div>
      <div className="tl-sub">{item.sub}</div>

      {/* Tag pill */}
      <div className="tl-tag" style={{ color: item.color, borderColor: `${item.color}30`, background: `${item.color}0d` }}>
        {item.tag}
      </div>

      {/* Summary — always visible */}
      <p className="tl-summary">{item.summary}</p>

      {/* Course block — always visible if present */}
      {item.course && (
        <div className="tl-course" style={{ borderColor: `${item.color}22` }}>
          <div className="tl-course-row">
            <HiClock style={{ color: item.color, width: 11, height: 11, flexShrink: 0 }} />
            <span className="tl-course-dur" style={{ color: item.color }}>{item.course.duration}</span>
            <span className="tl-course-name">{item.course.name}</span>
          </div>
          <div className="tl-focus-chips">
            {item.course.focus.map(f => (
              <span key={f} className="tl-focus-chip" style={{ borderColor: `${item.color}28`, color: `${item.color}cc` }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Expand indicator */}
      <div className="tl-expand-hint">
        <motion.span
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.28 }}
          style={{ color: item.color, fontSize: 10, lineHeight: 1 }}
        >
          ▼
        </motion.span>
        <span style={{ color: 'rgba(168,178,196,0.35)' }}>
          {isActive ? 'Less' : 'More details'}
        </span>
      </div>

      {/* Expandable detail */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="tl-detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="tl-points">
              {item.points.map((p, i) => (
                <motion.li
                  key={p}
                  className="tl-point"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <HiCheckBadge style={{ color: item.color, width: 12, height: 12, flexShrink: 0, marginTop: 1 }} />
                  <span>{p}</span>
                </motion.li>
              ))}
            </ul>

            {item.extra && (
              <motion.div
                className="tl-extra"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              >
                <HiLightBulb style={{ color: item.color, width: 12, height: 12, flexShrink: 0, marginTop: 1 }} />
                <span>{item.extra}</span>
              </motion.div>
            )}

            {item.link && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tl-link"
                  onClick={e => e.stopPropagation()}
                >
                  <span>View NxtWave Profile</span>
                  <HiArrowTopRightOnSquare style={{ width: 11, height: 11 }} />
                </a>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────── */
const Timeline = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="timeline" className="tl-section">
      <div className="tl-glow-a" />
      <div className="tl-glow-b" />
      <div className="tl-watermark" aria-hidden>JOURNEY</div>

      <div className="tl-wrap">
        <SectionTitle subtitle="[ Roadmap ]" title="The Evolution" align="center" />

        {/* Animated flow connector */}
        <FlowPath />

        {/* Cards */}
        <div className="tl-cards">
          {TIMELINE.map((item, i) => (
            <TLCard
              key={item.id}
              item={item}
              index={i}
              active={active}
              onSelect={setActive}
            />
          ))}
        </div>

        {/* Active label */}
        <AnimatePresence>
          {active && (() => {
            const item = TIMELINE.find(t => t.id === active);
            return item ? (
              <motion.div
                className="tl-sel-bar"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.28 }}
              >
                <span style={{ color: item.color }}>● {item.phase}</span>
                <span className="tl-sel-divider">·</span>
                <span>{item.label}</span>
              </motion.div>
            ) : null;
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Timeline;