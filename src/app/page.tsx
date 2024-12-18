"use client"
import { useEffect, useState } from 'react';
import styles from "./page.module.css";
import Image from 'next/image';
import Row from "./components/team/app"
import { addTeamServer, getTeamsServer } from './utils/scores';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState<any | "">("");

  const getTeams = async() =>{
    let teams = await getTeamsServer();
    setTeams(teams);
  }

  const addTeam = async() =>{
    await addTeamServer(name);
    await getTeams();
  }

  useEffect(() => {
    setIsClient(true); 
    setInterval(() => window.location.reload(), 15000);
    getTeams();
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <main className={styles.page}>
      <Image
      height={40}
      width={40}
      alt='confetti'
      src="/confetti.svg"
      className={styles.confettione}
      />
      <Image
      height={40}
      width={40}
      alt='confetti'
      src="/confetti.svg"
      className={styles.confettitwo}
      />
      <h1 className={styles.title}>SumoBot Competition</h1>
      <section className={styles.tables}>
      <div className={styles.table}>
        <header className={styles.header}>Teams</header>
        {
          teams.sort((a: any,b: any)=> (b.score - a.score)).map((item: any, index) =>{
            return <Row reload={getTeams} id={item.id} key={index} rank={index + 1} name={item.name} score={item.score} />            
          })
        }
        <form action="">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
          <button onClick={() => addTeam()}>Add</button>
        </form>
      </div>
      </section>
      <section className={styles.bots}>
      <Image
       width={50}
       height={50}
       src="/bots/bot1.png"
       alt="bots"
       />
              <Image
       width={50}
       height={50}
       src="/bots/bot2.png"
       alt="bots"
       />
              <Image
       width={50}
       height={50}
       src="/bots/bot3.png"
       alt="bots"
       />
      </section>
    </main>
  );
}
