import React from 'react'
import { IonReactRouter } from '@ionic/react-router'
import { IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { Route, Redirect } from 'react-router-dom'
import { SideMenu } from './components/menu/SideMenu'
import VetDashboard from './pages/Veterinarian/VetDashboard'
import MapPage from './pages/Map/MapPage'
import RankingPage from './pages/Ranking/RankingPage'
import BiometricsPage from './pages/Biometrics/BiometricsPage'
import ProfilePage from './pages/Profile/ProfilePage'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import './index.css'

const App: React.FC = () => (
  <IonReactRouter>
    <IonSplitPane contentId="main-content">
      <SideMenu />
      <IonRouterOutlet id="main-content">
        <Route exact path="/home">
          <VetDashboard />
        </Route>
        <Route exact path="/map">
          <MapPage />
        </Route>
        <Route exact path="/ranking">
          <RankingPage />
        </Route>
        <Route exact path="/biometrics">
          <BiometricsPage />
        </Route>
        <Route exact path="/profile">
          <ProfilePage />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonSplitPane>
  </IonReactRouter>
)

export default App
