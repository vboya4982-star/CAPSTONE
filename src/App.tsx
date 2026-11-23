import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import SkillsManagement from './pages/dashboard/SkillsManagement';
import ProjectsManagement from './pages/dashboard/ProjectsManagement';
import SkillGapAnalysis from './pages/dashboard/SkillGapAnalysis';
import ProfileManagement from './pages/dashboard/ProfileManagement';
import CertificationsManagement from './pages/dashboard/CertificationsManagement';
import InternshipsManagement from './pages/dashboard/InternshipsManagement';
import AIRecommendations from './pages/dashboard/AIRecommendations';
import CareerPaths from './pages/dashboard/CareerPaths';
import ResumeBuilder from './pages/dashboard/ResumeBuilder';
import FacultyDashboard from './pages/dashboard/FacultyDashboard';
import FacultyStudents from './pages/dashboard/FacultyStudents';
import FacultyAnalytics from './pages/dashboard/FacultyAnalytics';
import FacultyDepartments from './pages/dashboard/FacultyDepartments';
import RecruiterDashboard from './pages/dashboard/RecruiterDashboard';
import RecruiterJobs from './pages/dashboard/RecruiterJobs';
import RecruiterSearch from './pages/dashboard/RecruiterSearch';
import RecruiterCompare from './pages/dashboard/RecruiterCompare';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Student Routes */}
        <Route path="/student" element={<DashboardLayout role="student" />}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<ProfileManagement />} />
          <Route path="skills" element={<SkillsManagement />} />
          <Route path="projects" element={<ProjectsManagement />} />
          <Route path="certifications" element={<CertificationsManagement />} />
          <Route path="internships" element={<InternshipsManagement />} />
          
          {/* Intelligence Routes */}
          <Route path="gap-analysis" element={<SkillGapAnalysis />} />
          <Route path="recommendations" element={<AIRecommendations />} />
          <Route path="career" element={<CareerPaths />} />
          <Route path="resume" element={<ResumeBuilder />} />
        </Route>

        {/* Faculty Routes */}
        <Route path="/faculty" element={<DashboardLayout role="faculty" />}>
          <Route index element={<FacultyDashboard />} />
          <Route path="students" element={<FacultyStudents />} />
          <Route path="analytics" element={<FacultyAnalytics />} />
          <Route path="departments" element={<FacultyDepartments />} />
          <Route path="*" element={<FacultyDashboard />} />
        </Route>

        {/* Recruiter Routes */}
        <Route path="/recruiter" element={<DashboardLayout role="recruiter" />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="jobs" element={<RecruiterJobs />} />
          <Route path="search" element={<RecruiterSearch />} />
          <Route path="compare" element={<RecruiterCompare />} />
          <Route path="*" element={<RecruiterDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
