import React, {useState, useMemo} from 'react';   // useState is a hook that allows us to use state in a functional component
import styled from 'styled-components';
import bg from './Images/bg.jpeg'
import { MainLayout } from './Styles/Layout';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Dashboard from './Components/Dashboard/Dashboard';
// import firebase from "firebase/app"
// import "firebase/auth"
import { useGlobalContext } from './Context/globalContext';

function App() {
  
  // const [auth, setAuth] = useState(
	// 	false || window.localStorage.getItem('auth') === 'true'
	// );
	// const [token, setToken] = useState('');

	// useEffect(() => {
	// 	firebase.auth().onAuthStateChanged((userCred) => {
	// 		if (userCred) {
	// 			setAuth(true);
	// 			window.localStorage.setItem('auth', 'true');
  //       setActive(0);
	// 			userCred.getIdToken().then((token) => {
	// 				setToken(token);
	// 			});
	// 		}
	// 	});
	// }, []);

	// const loginWithGoogle = () => {
	// 	firebase
	// 		.auth()
	// 		.signInWithPopup(new firebase.auth.GoogleAuthProvider())
	// 		.then((userCred) => {
	// 			if (userCred) {
	// 				setAuth(true);
	// 				window.localStorage.setItem('auth', 'true');
  //         setActive(1);
	// 			}
	// 		});
	// };
  
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
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
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
