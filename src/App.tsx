import { Routes, Route, Link} from "react-router-dom"
import RequiredAuth from "./components/routes/RequiredAuth";
import RequiredNotAuth from "./components/routes/RequiredNotAuth";
import Register from "./screens/Register"
import Login from "./screens/Login"
import Search from "./screens/Search"
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import ScreenContainer from "./components/public/ScreenContainer";
import NotificationsSnackbar from "./components/public/NotificationsSnackbar";
import Chat from "./screens/Chat";
import PostScreen from "./screens/PostScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AuthError from "./components/public/AuthError";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
          <Routes>
            <Route path="/" element={<RequiredAuth>
              <ScreenContainer>
                <Home />
              </ScreenContainer>
            </RequiredAuth>} />
            <Route path="register" element={<RequiredNotAuth><Register /></RequiredNotAuth>} />
            <Route path="login" element={<RequiredNotAuth><Login /></RequiredNotAuth>} />
            <Route path="profile/:userId" element={<RequiredAuth>
              <ScreenContainer>
                <Profile />
              </ScreenContainer>
            </RequiredAuth>} />
            <Route 
              path="messages" 
              element={
                <RequiredAuth>
                  <ScreenContainer hidePostCreator>
                    <Chat />
                </ScreenContainer>
              </RequiredAuth>} 
            />
            
            <Route path="posts/:postId" element={
              <RequiredAuth>
                  <PostScreen />
              </RequiredAuth>
            } />
            <Route 
              path="notifications"
              element={
                <RequiredAuth>
                  <ScreenContainer hideNotificationBar hidePostCreator>
                    <NotificationsScreen />
                  </ScreenContainer>
                </RequiredAuth>
              }
            />
            <Route 
              path="search"
              element={
                <RequiredAuth>
                  <ScreenContainer hideSearchbar hidePostCreator>
                    <Search />
                  </ScreenContainer>
                </RequiredAuth>
              }
            />
            <Route 
              path="settings"
              element={
                <RequiredAuth>
                  <ScreenContainer hideSearchbar hidePostCreator>
                    <SettingsScreen />
                  </ScreenContainer>
                </RequiredAuth>
              }
            />
            <Route 
              path="*"
              element={
                <div>
                    Page not found <Link to="/">Go to home page</Link>
                </div>
              }
            />
          </Routes>
          <NotificationsSnackbar />
          <AuthError /> 
      </div>
    </ThemeProvider>
  );
}

export default App;
