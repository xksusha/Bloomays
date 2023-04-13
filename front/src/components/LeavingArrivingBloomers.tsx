import React, { useState, useEffect } from 'react';
import { DateGroup, TitleCount, Modal, ModalContent, Name, Close, Timeline, TimelineTitle, TimelineList, TimelineListItem } from './LeavingArrivingBloomersStyles';

interface Mission {
  id: string;
  label: string;
  beginDate: string;
  endDate: string;
  missionType: string;
  freelance: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}

interface BloomerProps {
  missions?: Mission[];
  date: string;
  isLeaving?: boolean;
  isLast: boolean;
}

const formatDate = (date: string) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const Bloomer: React.FC<BloomerProps> = ({ date, missions = [], isLeaving, isLast }) => {
  return (
    <TimelineListItem leaving={!!isLeaving}>
      <DateGroup>{date}</DateGroup>
      { 
        missions.map((mission) => (
          <Name key={`${isLeaving ? 'leaving' : 'arriving'}-${mission.freelance.firstname}-${mission.freelance.lastname}`} isLast={isLast}>{mission.freelance.firstname} {mission.freelance.lastname}</Name>
        ))
      }
    </TimelineListItem>
  );
}

const LeavingArrivingBloomers: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    // Fetch data from API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/missions');
        if (!response.ok) {
          throw new Error('Failed to fetch missions data');
        }
        const data = await response.json();
        setMissions(data);
      } catch (error) {
        console.error(error);
        // Provide a default dummy array with sample data in case of fetch failure
      }
    };
  
    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const now = new Date(); // Current date

  // Create a new date object for the end of next month
  const year = now.getFullYear();
  const month = now.getMonth();
  const endOfMonth = (month + 1) % 12;
  const endOfYear = endOfMonth === 0 ? year + 1 : year;
  const endOfNextMonth = new Date(endOfYear, endOfMonth + 1, 0); // Setting the day to 0 gets the last day of the previous month
  
  const groupByDate = (key: 'endDate' | 'beginDate') => missions.filter((mission) => {
    const date = new Date(mission[key]);
    return date >= now && date <= endOfNextMonth;
  }).sort((a: Mission, b: Mission) => new Date(a[key]).getTime() - new Date(b[key]).getTime())
  .reduce((acc: { [key: string]: Mission[] }, mission: Mission) => {
    const date = formatDate(mission[key]);
    acc[date] = acc[date] ? acc[date].concat(mission) : [mission];
    return acc;
  }, {});
  
  const countBloomers = (bloomers: { [key: string]: Mission[] }): number => {
    return Object.values(bloomers).flat().length;
  }

  const leavingBloomers = groupByDate('endDate');
  const leavingDates = Object.keys(leavingBloomers);

  const arrivingBloomers = groupByDate('beginDate');
  const arrivingDates = Object.keys(arrivingBloomers);

  return (
    <>
      {isOpen && (
        <Modal>
          <ModalContent>
            <Close onClick={handleClose}>&times;</Close>
            <Timeline>
            <TimelineTitle>
              <TitleCount leaving={false}>{countBloomers(arrivingBloomers)}</TitleCount>
              Bloomers entrants
            </TimelineTitle>
              <TimelineList>
                {arrivingDates.map((date: string, i) => (
                  <Bloomer key={`arriving-${date}`} date={date} missions={arrivingBloomers[date]} isLast={ i === arrivingDates.length - 1 }/>
                ))}
              </TimelineList>
            </Timeline>
            <Timeline>
            <TimelineTitle>
            <TitleCount leaving={true}>{countBloomers(leavingBloomers)}</TitleCount>
              Bloomers sortants
            </TimelineTitle>
            <TimelineList>
                {leavingDates.map((date: string, i) => (
                  <Bloomer key={`leaving-${date}`} isLeaving={true} date={date} missions={leavingBloomers[date]} isLast={ i === leavingDates.length - 1 }/>
                ))}
              </TimelineList>
            </Timeline>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default LeavingArrivingBloomers;
