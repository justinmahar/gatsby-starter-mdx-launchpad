import { AdminOnly, NonAdminOnly } from 'react-authless-admin';
import Dashboard from './admin/Dashboard';
import LoginForm from './admin/LoginForm';
import ConfiguredBootswatchOverride from './configured/ConfiguredBootswatchOverride';
import SiteBuildStatusBadge from './configured/SiteBuildStatusBadge';
import SiteName from './configured/SiteName';
import ContactForm from './ContactForm';
import CurrentYear from './CurrentYear';
import ToggleAdminButton from './ToggleAdminButton';

const CoreComponents = {
  CurrentYear,
  SiteBuildStatusBadge,
  ContactForm,
  SiteName,
  ConfiguredBootswatchOverride,
  ToggleAdminButton,
  LoginForm,
  AdminOnly,
  NonAdminOnly,
  Dashboard,
};

export default CoreComponents;
