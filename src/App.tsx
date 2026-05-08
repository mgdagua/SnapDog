import React from 'react'
import { IonReactRouter } from '@ionic/react-router'
import { IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { Route } from 'react-router-dom'
import { SideMenu } from './components/menu/SideMenu'
import VetDashboard from './pages/Veterinarian/VetDashboard'
import MapPage from './pages/Map/MapPage'
import RankingPage from './pages/Ranking/RankingPage'
import BiometricsPage from './pages/Biometrics/BiometricsPage'
import ProfilePage from './pages/Profile/ProfilePage'
import ClinicalRecordsPage from './pages/Profile/ClinicalRecordsPage'
import LoginPage from './pages/Login/LoginPage'
import VolunteerDashboard from './pages/Volunteer/VolunteerDashboard'
import ReportPage from './pages/Report/ReportPage'

/* Core CSS */
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
        <Route exact path="/">
          <LoginPage />
        </Route>
        
        <Route exact path="/home" render={() => {
          const role = localStorage.getItem('userRole')
          return role === 'veterinarian' ? <VetDashboard /> : <VolunteerDashboard />
        }} />
        
        <Route exact path="/report">
          <ReportPage />
        </Route>

        <Route exact path="/map" component={MapPage} />
        <Route exact path="/ranking" component={RankingPage} />
        <Route exact path="/biometrics" component={BiometricsPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/clinical-records" component={ClinicalRecordsPage} />
        <Route exact path="/network" component={ClinicalRecordsPage} />
        <Route exact path="/active-patients" component={ClinicalRecordsPage} />
      </IonRouterOutlet>
    </IonSplitPane>
  </IonReactRouter>
)

export default App