import React from 'react'
import ReactDOM from 'react-dom'
import find from 'lodash.find'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Authentification from './components/Authentification'
import NavBar from './components/NavBar'
import SecondaryNavBar from './components/SecondaryNavBar'
import DashboardNavBar from './components/DashboardNavBar'
import DashboardButton from './components/DashboardButton'
import NewCourseButton from './components/NewCourseButton'
import FilterGroupList from './components/FilterGroupList'
import FilterCourseList from './components/FilterCourseList'
import FilterNoteList from './components/FilterNoteList'
import Heading from './components/Heading'
import Info from './components/Info'
import Assessment from './components/assessment'
import RegisterForm from './components/RegisterForm'
import LogInForm from './components/LogInForm'
import LogOff from './components/LogOff'
import Payroc from './components/Payroc'
import CreateGroup from './components/CreateGroup'
import CreateCourse from './components/CreateCourse'
import Group from './components/GroupPage'
import Course from './components/CoursePage'
import ResetPassword from './components/ResetPassword'
import Search from './components/Search'
import SearchSubject from './components/SearchSubject'
import Note from './components/NotePage'
import CreateNote from './components/UploadNote'
import FilterSubjectList from './components/FilterSubjectList'
import ProfileSettings from './components/ProfileSettings'
import Logo from './components/Logo'
import Notifications from './components/Notifications'
import 'bootstrap/dist/css/bootstrap.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
	   primary: {
       light: '#757575',
       main: '#616161',
       dark: '#424242',
       contrastText: '#fff',
	   },
	   secondary: {
	     light: '#00796B',
	     main: '#FF6F00',
	     dark: '#E65100',
	     contrastText: '#fff',
	   }
  }
});

const PayrocPage = ({ match }) => (
  <div>
    <Payroc/>
  </div>
)

const RegisterPage = ({ match }) => (
  <div>
    <NavBar pathname='register'/>
    <SecondaryNavBar subpath='register'/>
    <RegisterForm/>
  </div>
)

const RegisterPageWithID = ({ match }) => (
  <div>
    <NavBar pathname='register'/>
    <SecondaryNavBar subpath='register'/>
    <RegisterForm id={match.params.id} />
  </div>
)

const LogInPage = ({ match }) => (
  <div>
    <NavBar pathname='login'/>
    <SecondaryNavBar subpath='login'/>
    <LogInForm/>
  </div>
)

const ResetPage = ({ match }) => (
  <div>
    <NavBar pathname='login'/>
    <SecondaryNavBar subpath='reset'/>
    <ResetPassword />
  </div>
)

const DashboardNotesPage = ({ match }) => (
  <div>
    <NavBar pathname='dashboard'/>
    <Authentification>
      <DashboardNavBar subpath='notes'/>
      <Heading>Notes</Heading>
      <Info>Here is where you will find all the Notes that you've Uploaded or Bookmarked</Info>
      <DashboardButton color='primary' linkTo='/create/note' label='Upload New Note'/>
      <FilterNoteList/>
    </Authentification>
  </div>
)

const DashboardGroupsPage = ({ match }) => (
  <div>
    <NavBar pathname='dashboard'/>
    <Authentification>
    <DashboardNavBar subpath='groups'/>
    <Heading>Groups</Heading>
    <Info>Here is where you will find the Groups that you've Created or Followed</Info>
    <MuiThemeProvider theme={theme}>
    <DashboardButton color='secondary' linkTo='/create/group' label='Create New Group'/>
      <FilterGroupList/>
    </MuiThemeProvider>
  </Authentification>
  </div>
)

const DashboardCoursesPage = ({ match }) => (
  <div>
    <NavBar pathname='dashboard'/>
    <Authentification>
    <DashboardNavBar subpath='courses'/>
    <Heading>Courses</Heading>
    <MuiThemeProvider theme={theme}>
      <NewCourseButton color='primary' linkTo='/create/course' label='Create New Course'/>
      <FilterCourseList/>
    </MuiThemeProvider>
  </Authentification>
  </div>
)

const DashboardSettingsPage = ({ match }) => (
  <div>
    <NavBar pathname='dashboard'/>
    <Authentification>
    <DashboardNavBar subpath='settings'/>
    <Heading>Settings</Heading>
    <MuiThemeProvider theme={theme}>
    <DashboardButton color='primary' linkTo='/faq' label='Frequently Asked Questions'/>
    </MuiThemeProvider>
    <ProfileSettings />
  </Authentification>
  </div>
)

const DashboardLogOffPage = ({ match }) => (
  <div>
    <NavBar pathname='dashboard'/>
    <Authentification>
    <DashboardNavBar subpath='exit'/>
    <Heading>Are You Sure You Want To Log Off?</Heading>
    <LogOff />
  </Authentification>
  </div>
)

const CreateGroupPage = ({ match }) => (
  <div>
    <NavBar pathname='dashboard'/>
    <Authentification>
    <DashboardNavBar subpath='groups'/>
    <Heading>Create Group</Heading>
    <MuiThemeProvider theme={theme}>
    <DashboardButton color='secondary' linkTo='/dashboard/groups' label='Go Back'/>
    <br/><CreateGroup />
    </MuiThemeProvider>
  </Authentification>
  </div>
)

const CreateCoursePage = ({ match }) => (
  <div>
    <NavBar pathname='dashboard'/>
  <Authentification>
    <DashboardNavBar subpath='courses'/>
    <Heading>Create Course</Heading>
    <MuiThemeProvider theme={theme}>
    <DashboardButton color='primary' linkTo='/dashboard/courses' label='Go Back'/>
    <br/><CreateCourse />
    </MuiThemeProvider>
  </Authentification>
  </div>
)

const CreateNotePage = ({ match }) => (
  <div>
    <NavBar pathname='dashboard'/>
  <Authentification>
    <DashboardNavBar subpath='notes'/>
    <CreateNote />
  </Authentification>
  </div>
)

const EditPage = ({ match }) => (
  <div>
    <NavBar pathname='dashboard'/>
  <Authentification>
    <DashboardNavBar subpath='notes'/>
    <CreateNote id={match.params.id}/>
  </Authentification>
  </div>
)

const AddCourseContentPage = ({ match }) => (
  <div>
    <NavBar pathname='dashboard'/>
  <Authentification>
    <DashboardNavBar subpath='notes'/>
    <CreateNote course={match.params.id}/>
  </Authentification>
  </div>
)

const GroupPage = ({ match }) => (
    <div>
      <NavBar pathname='group'/>
      <br/><Group id={match.params.id}/>
    </div>
)

const CoursePage = ({ match }) => (
    <div>
      <NavBar pathname='course'/>
    <Authentification>
      <br/><Course id={match.params.id}/>
    </Authentification>
    </div>
)

const NotePage = ({ match }) => (
    <div>
      <NavBar pathname='note'/>
      <br/><Note id={match.params.id}/>
    </div>
)

const NotificationsPage = ({ match }) => (
  <div>
    <NavBar pathname='notifications'/>
    <Authentification>
    <Heading>Notifications</Heading>
    <Notifications />
      </Authentification>
  </div>
)

const AssessmentsPage = ({ match }) => (
  <div>
    <NavBar pathname='assessments'/>
    <Authentification>

    </Authentification>

  </div>
)

const SearchPage = ({ match }) => (
  <div>
    <NavBar pathname='search'/>
    <Logo />
    <Search />
  </div>
)

const SubjectPage = ({ match }) => (
  <div>
    <NavBar pathname='search'/>
    <Logo />
    <SearchSubject id={match.params.id}/>
  </div>
)

const SubjectListPage = ({ match }) => (
  <div>
    <NavBar pathname='search'/>
    <Logo />
    <Heading>All Subjects</Heading>
    <FilterSubjectList/>
  </div>
)

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route path='/register' component={RegisterPage} />
        <Route path='/quickreg/:id' component={RegisterPageWithID} />
        <Route path='/login' component={LogInPage} />
        <Route path='/resetpassword' component={ResetPage} />
        <Route path='/passwordreset' component={ResetPage} />
        <Route path='/dashboard/notes' component={DashboardNotesPage}/>
        <Route path='/dashboard/notes?' component={DashboardNotesPage}/>
        <Route path='/dashboard/groups' component={DashboardGroupsPage} />
        <Route path='/dashboard/groups?' component={DashboardGroupsPage} />
        <Route path='/dashboard/courses' component={DashboardCoursesPage} />
        <Route path='/dashboard/settings' component={DashboardSettingsPage} />
        <Route path='/dashboard/exit' component={DashboardLogOffPage} />
        <Route path='/create/group' component={CreateGroupPage} />
        <Route path='/create/note' component={CreateNotePage} />
        <Route path='/create/course' component={CreateCoursePage} />
        <Route path='/course/:id' component={CoursePage} />
        <Route path='/group/:id' component={GroupPage} />
        <Route path='/note/:id' component={NotePage} />
        <Route path='/edit/:id' component={EditPage} />
        <Route path='/newcontent/:id' component={AddCourseContentPage} />
        <Route path='/notifications' component={NotificationsPage} />
        <Route path='/assessments' component={AssessmentsPage} />
        <Route path='/search' component={SearchPage} />
        <Route path='/subjectlist' component={SubjectListPage} />
        <Route path='/subject/:id' component={SubjectPage} />
        <Route path='/payroc' component={PayrocPage} />
        <Route component={SearchPage} />
      </Switch>
    </div>
  </Router>
)

var render = () => {
  ReactDOM.render(
      <App />,
    document.getElementById('root')
  )
}

render()
