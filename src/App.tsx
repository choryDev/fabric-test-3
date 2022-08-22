import { useState } from 'react'
import electron from '/electron.png'
import react from '/react.svg'
import vite from '/vite.svg'
import styles from 'styles/app.module.scss'
import Fabric from './fabric'

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.app}>
      <Fabric/>
    </div>
  )
}

export default App
