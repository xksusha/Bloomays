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
  mission: Mission;
  isLeaving?: boolean;
  isLast: boolean;
}

const Bloomer: React.FC<BloomerProps> = ({ mission, isLeaving, isLast }) => {
  const formatDate = (date: string) => {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  return (
    <TimelineListItem leaving={!!isLeaving}>
      <DateGroup>{formatDate(isLeaving ? mission.endDate : mission.beginDate)}</DateGroup>
      <Name isLast={isLast}>{mission.freelance.firstname} {mission.freelance.lastname}</Name>
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
        setMissions(data.sort((a: Mission, b: Mission) => new Date(a.beginDate).getTime() - new Date(b.beginDate).getTime()));
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
  
  const leavingBloomers = missions.filter((mission) => {
    const endDate = new Date(mission.endDate);
    return endDate >= now && endDate <= endOfNextMonth;
  });
  
  const arrivingBloomers = missions.filter((mission) => {
    const beginDate = new Date(mission.beginDate);
    return beginDate >= now && beginDate <= endOfNextMonth;
  });

  return (
    <>
      {isOpen && (
        <Modal>
          <ModalContent>
            <Close onClick={handleClose}>&times;</Close>
            <Timeline>
            <TimelineTitle>
              <TitleCount leaving={false}>{arrivingBloomers.length}</TitleCount>
              Bloomers entrants
            </TimelineTitle>
              <TimelineList>
                {arrivingBloomers.map((mission, i) => (
                  <Bloomer key={mission.id} mission={mission} isLast={ i === arrivingBloomers.length - 1 }/>
                ))}
              </TimelineList>
            </Timeline>
            <Timeline>
            <TimelineTitle>
            <TitleCount leaving={true}>{leavingBloomers.length}</TitleCount>
              Bloomers sortants
            </TimelineTitle>
              <TimelineList>
                {leavingBloomers.map((mission, i) => (
                  <Bloomer key={mission.id} mission={mission} isLeaving={true} isLast={ i === leavingBloomers.length - 1 }/>
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
