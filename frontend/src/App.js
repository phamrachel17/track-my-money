import React, {useState, useMemo} from 'react';   // useState is a hook that allows us to use state in a functional component
import styled from 'styled-components';
import bg from './Images/bg.jpg'
import { MainLayout } from './Styles/Layout';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import { useGlobalContext } from './Context/globalContext';
import { useAuthContext } from './Hooks/useAuthContext.js'

function App() {
  const user = useAuthContext();
  
  // active state for navigation
  const [active, setActive] = useState(1)  // starts at 1 becuase first menu item is 1

  const global = useGlobalContext()
  console.log(global)

  // Display data based on active state of navigation selection
  const displayData = () => {
    switch(active) {
      case 0:
        return <Dashboard />
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4:
        return <Expenses />
      default: <Dashboard />
    }
  }
  
  const orbMemo = useMemo(() => {     // so that the background does not reset each time the active state changes
    return <Orb />
  }, [])
  
  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        {user ? (
          <>
            <Navigation active={active} setActive={setActive} />
            <main>{displayData()}</main>
          </>
        ) : (
          <Login />
        )}
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
