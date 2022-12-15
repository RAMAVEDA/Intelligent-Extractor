import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import ReportsView from 'src/views/reports/ReportsView';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import ModelListView from 'src/views/model/ModelListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import CreateModelView from 'src/views/createmodel/CreateModelView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import BotView from 'src/views/bot/BotView';
import CreateModelField from 'src/views/createmodel/CreateModelView/CreateModelField';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'reports', element: <ReportsView /> },
      { path: 'model', element: <ModelListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'createmodel', element: <CreateModelView /> },
      { path: 'createmodel/createfield', element: <CreateModelField /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'bot', element: <BotView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
