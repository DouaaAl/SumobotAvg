"use  client"
import React from 'react'
import styles from "./team.module.css"
import Image from 'next/image'
import { useState } from 'react'
import { deleteTeamServer, updateScoreServer } from '@/app/utils/scores'


const app = ({rank, score, name, id, reload}) => {
  const [scoreVar, setScore] = useState(score);

  const deleteTeam = async() =>{
    await deleteTeamServer(id);
    await reload();
  }

  const addScore = async() => {
    await updateScoreServer(id, scoreVar + 1);
    setScore(scoreVar + 1)
  }

  const minusScore = async() => {
    await updateScoreServer(id, scoreVar - 1);
    scoreVar > 0 && setScore(scoreVar - 1);
  }

  return (
    <article className={styles.article}>
      
      {rank == 1? <Image
      className={styles.medal}
      src="/first.svg"
      height={50}
      width={150}
      alt="first place"
      />: rank == 2? <Image
      className={styles.medal}
      src="/second.svg"
      height={50}
      width={150}
      alt="first place"
      />: rank == 3 ? <Image
      className={styles.medal}
      src="/third.svg"
      height={50}
      width={150}
      alt="first place"
      />: <Image className={styles.medal}
      src="/other.svg" height={50} width={150} alt='other options' />}
      
      
    <h3>{rank}</h3>
    <h3>
      {name}
    </h3>
    <h1>
      <Image
      onClick={() => addScore()}
        height={20}
        width={20}
        src="/add.png"
        alt="add"
      />
      {scoreVar}
      <Image
      onClick={() => minusScore()}
        height={20}
        width={20}
        src="/minus.png"
        alt="minus"
      />
      </h1>
      <h1><Image
      width={20}
      height={20}
      onClick={() => deleteTeam()}
      src="/delete.png"
      alt="delete"
       /></h1>
  </article>
  )
}

export default app